
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ProductsService, Product, Category } from '../services/products.service';
import { MetricsService } from '../services/metrics.service';
import { CartService } from '../services/cart.service';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

@Component({
  selector: 'app-ferreteria',
  standalone: true,
  imports: [FormsModule, RouterLink, ProductReviewsComponent],
  templateUrl: './ferreteria.component.html',
  styleUrl: './ferreteria.component.css'
})
export class FerreteriaComponent implements OnInit {
  selectedCategory = 'Todos';
  sortOption = 'name-asc';
  currentPage = 1;
  readonly pageSize = 9;
  searchTerm = '';
  productsLoading = false;
  productsError = false;

  categories: Category[] = [];
  products: Product[] = [];
  readonly failedProductImages = new Set<number>();
  activeReviewProduct: Product | null = null;

  constructor(
    private productsService: ProductsService,
    private metricsService: MetricsService,
    private cartService: CartService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productsService.getCategories('Ferreteria').subscribe({
      next: (response) => {
        this.categories = response;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando categorías', error);
      }
    });
  }

  loadProducts(): void {
    this.productsLoading = true;
    this.productsError = false;
    this.productsService.getProducts('Ferreteria', this.selectedCategory).subscribe({
      next: (response) => {
        this.products = response;
        this.failedProductImages.clear();
        this.productsLoading = false;
        this.productsError = false;
        this.currentPage = Math.min(this.currentPage, Math.max(1, this.totalPages));
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando productos', error);
        this.productsLoading = false;
        this.productsError = true;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  get matchingProducts(): Product[] {
    const query = this.normalize(this.searchTerm.trim());
    if (!query) return this.products;

    return this.products.filter((product) =>
      this.normalize([product.name, product.category, product.description].filter(Boolean).join(' ')).includes(query)
    );
  }

  get filteredProducts(): Product[] {
    const sorted = [...this.matchingProducts];
    sorted.sort((left, right) => {
      if (this.sortOption === 'price-low' || this.sortOption === 'price-high') {
        const leftPrice = this.priceValue(left.price);
        const rightPrice = this.priceValue(right.price);
        if (leftPrice === null) return rightPrice === null ? 0 : 1;
        if (rightPrice === null) return -1;
        return this.sortOption === 'price-low' ? leftPrice - rightPrice : rightPrice - leftPrice;
      }

      const order = left.name.localeCompare(right.name, 'es', { sensitivity: 'base' });
      return this.sortOption === 'name-desc' ? -order : order;
    });

    const start = (this.currentPage - 1) * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.matchingProducts.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get startIndex(): number {
    return this.matchingProducts.length ? (this.currentPage - 1) * this.pageSize + 1 : 0;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.matchingProducts.length);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  onSortChange(): void {
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
  }

  private priceValue(price?: string | null): number | null {
    if (!price) return null;
    const digits = price.replace(/[^\d]/g, '');
    return digits ? Number(digits) : null;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.loadProducts();
  }

  openReviews(product: Product): void {
    this.activeReviewProduct = product;
  }

  openWhatsApp(productName: string): void {
    const text = `Hola, estoy interesado en productos de ferreteria: ${productName}`;
    window.open(`https://wa.me/573124986325?text=${encodeURIComponent(text)}`, '_blank', 'noopener');

    // Registrar métrica
    const product = this.products.find(p => p.name === productName);
    if (product) {
      this.metricsService.trackMetric({
        product_id: product.id,
        product_name: product.name,
        line: product.line,
        action: 'whatsapp'
      }).subscribe({
        error: (error) => console.error('Error registrando métrica', error)
      });
    }
  }

  addToCart(product: Product): void {
    this.cartService.addItem({
      id: `${product.line}-${product.id}`,
      name: product.name,
      line: product.line,
      image: product.image,
      price: product.price
    });

    this.metricsService.trackMetric({
      product_id: product.id,
      product_name: product.name,
      line: product.line,
      action: 'cart'
    }).subscribe({
      error: (error) => console.error('Error registrando mÃ©trica', error)
    });
  }

  onProductImageError(product: Product): void {
    this.failedProductImages.add(product.id);
    this.changeDetectorRef.detectChanges();
  }

  cartQuantity(product: Product): number {
    return this.cartService.getQuantity(`${product.line}-${product.id}`);
  }

  goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), Math.max(1, this.totalPages));
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
