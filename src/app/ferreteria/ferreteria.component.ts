import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ProductsService, Product, Category } from '../services/products.service';
import { MetricsService } from '../services/metrics.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-ferreteria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ferreteria.component.html',
  styleUrl: './ferreteria.component.css'
})
export class FerreteriaComponent implements OnInit {
  selectedCategory = 'Todos';
  sortOption = 'latest';
  currentPage = 1;

  categories: Category[] = [];
  products: Product[] = [];

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
    this.productsService.getProducts('Ferreteria', this.selectedCategory).subscribe({
      next: (response) => {
        this.products = response;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando productos', error);
      }
    });
  }

  get filteredProducts(): Product[] {
    return this.products;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.loadProducts();
  }

  openWhatsApp(productName: string): void {
    const text = `Hola, estoy interesado en productos de ferreteria: ${productName}`;
    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(text)}`, '_blank', 'noopener');

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

  cartQuantity(product: Product): number {
    return this.cartService.getQuantity(`${product.line}-${product.id}`);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
