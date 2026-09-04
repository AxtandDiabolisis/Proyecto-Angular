import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ProductsService, Product, Category } from '../services/products.service';
import { MetricsService } from '../services/metrics.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-sellos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sellos.component.html',
  styleUrl: './sellos.component.css'
})
export class SellosComponent implements OnInit {
  selectedCategory = 'Todos';
  sortOption = 'latest';
  currentPage = 1;
  readonly pageSize = 20;

  categories: Category[] = [];
  products: Product[] = [];
  selectedImage?: Product;
  private imageRetryByProduct = new Map<number, number>();

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
    this.productsService.getCategories('Sellos').subscribe({
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
    this.productsService.getProducts('Sellos', this.selectedCategory).subscribe({
      next: (response) => {
        this.imageRetryByProduct.clear();
        this.products = response;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando productos', error);
      }
    });
  }

  get filteredProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.products.length / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get firstShownProduct(): number {
    return this.products.length ? (this.currentPage - 1) * this.pageSize + 1 : 0;
  }

  get lastShownProduct(): number {
    return Math.min(this.currentPage * this.pageSize, this.products.length);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.loadProducts();
  }

  openWhatsApp(product: Product): void {
    const text = product.whatsapp_message || `Hola, estoy interesado en el producto de sellos: ${product.name}`;
    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(text)}`, '_blank', 'noopener');

    // Registrar métrica
    this.metricsService.trackMetric({
      product_id: product.id,
      product_name: product.name,
      line: product.line,
      action: 'whatsapp'
    }).subscribe({
      error: (error) => console.error('Error registrando métrica', error)
    });
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

  cartQuantity(product: Product): number {
    return this.cartService.getQuantity(`${product.line}-${product.id}`);
  }

  hideBrokenImage(product: Product): void {
    const nextImage = this.getNextImageFallback(product);

    if (nextImage) {
      product.image = nextImage;
      this.changeDetectorRef.detectChanges();
      return;
    }

    product.image = undefined;
    this.changeDetectorRef.detectChanges();
  }

  openImagePreview(product: Product): void {
    if (!product.image) {
      return;
    }

    this.selectedImage = product;
  }

  closeImagePreview(): void {
    this.selectedImage = undefined;
  }

  goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  private extractDriveFileId(image: string): string | undefined {
    const directImageMatch = image.match(/googleusercontent\.com\/d\/([^=/?&#]+)/);
    const queryIdMatch = image.match(/[?&]id=([^&#]+)/);

    return directImageMatch?.[1] || queryIdMatch?.[1];
  }

  private getNextImageFallback(product: Product): string | undefined {
    if (!product.image) {
      return undefined;
    }

    const fileId = this.extractDriveFileId(product.image);

    if (!fileId) {
      return undefined;
    }

    const candidates = [
      `https://lh3.googleusercontent.com/d/${fileId}=w1000`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    ].filter((candidate) => candidate !== product.image);

    const retryCount = this.imageRetryByProduct.get(product.id) || 0;
    this.imageRetryByProduct.set(product.id, retryCount + 1);

    return candidates[retryCount];
  }
}
