import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ProductsService, Product, Category } from '../services/products.service';
import { MetricsService } from '../services/metrics.service';

@Component({
  selector: 'app-lenceria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lenceria.component.html',
  styleUrl: './lenceria.component.css'
})
export class LenceriaComponent implements OnInit {
  selectedCategory = 'Todos';
  sortOption = 'latest';
  currentPage = 1;

  categories: Category[] = [];
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private metricsService: MetricsService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productsService.getCategories('Lenceria').subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Error cargando categorías', error);
      }
    });
  }

  loadProducts(): void {
    this.productsService.getProducts('Lenceria', this.selectedCategory).subscribe({
      next: (response) => {
        this.products = response;
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
    const message = product.whatsapp_message || `Hola, estoy interesado en el producto: ${product.name}`;
    window.open(`https://wa.me/573203109797?text=${encodeURIComponent(message)}`, '_blank', 'noopener');

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

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
