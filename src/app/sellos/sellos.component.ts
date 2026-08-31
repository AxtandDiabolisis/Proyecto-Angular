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
    product.image = undefined;
    this.changeDetectorRef.detectChanges();
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
