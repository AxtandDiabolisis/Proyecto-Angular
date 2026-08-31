import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MetricsService } from '../services/metrics.service';

interface TuftingCategory {
  name: string;
  description: string;
  icon: string;
}

interface TuftingProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  badge: string;
}

@Component({
  selector: 'app-tufting',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tufting.component.html',
  styleUrls: ['./tufting.component.css']
})
export class TuftingComponent {
  categories: TuftingCategory[] = [
    { name: 'Tapetes custom', description: 'Piezas con logo, personaje o frase.', icon: 'fa-rug' },
    { name: 'Wall art', description: 'Textiles para pared con mucha actitud.', icon: 'fa-image' },
    { name: 'Drops listos', description: 'Diseños disponibles para entrega rápida.', icon: 'fa-bolt' },
    { name: 'Regalos únicos', description: 'Tufting para fechas, marcas y detalles.', icon: 'fa-gift' }
  ];

  products: TuftingProduct[] = [
    { id: 1001, name: 'Tapete logo personalizado', category: 'Custom', price: 'Desde $120.000', image: 'assets/img/tufting/producto-logo.jpg', badge: 'Nuevo drop' },
    { id: 1002, name: 'Wall art smile', category: 'Decoracion', price: 'Desde $95.000', image: 'assets/img/tufting/producto-smile.jpg', badge: 'Favorito' },
    { id: 1003, name: 'Tapete iniciales', category: 'Regalos', price: 'Desde $85.000', image: 'assets/img/tufting/producto-iniciales.jpg', badge: 'Personalizable' },
    { id: 1004, name: 'Mini rug color pop', category: 'Drops', price: 'Desde $70.000', image: 'assets/img/tufting/producto-color-pop.jpg', badge: 'Entrega rapida' }
  ];

  constructor(
    private cartService: CartService,
    private metricsService: MetricsService
  ) {}

  openWhatsApp(productName: string): void {
    const text = `Hola, quiero cotizar tufting personalizado: ${productName}`;
    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(text)}`, '_blank', 'noopener');

    const product = this.products.find((item) => item.name === productName);
    if (product) {
      this.metricsService.trackMetric({
        product_id: product.id,
        product_name: product.name,
        line: 'Tufting',
        action: 'whatsapp'
      }).subscribe({
        error: (error) => console.error('Error registrando metrica', error)
      });
    }
  }

  addToCart(product: TuftingProduct): void {
    this.cartService.addItem({
      id: `Tufting-${product.name}`,
      name: product.name,
      line: 'Tufting',
      image: product.image,
      price: product.price
    });

    this.metricsService.trackMetric({
      product_id: product.id,
      product_name: product.name,
      line: 'Tufting',
      action: 'cart'
    }).subscribe({
      error: (error) => console.error('Error registrando metrica', error)
    });
  }

  cartQuantity(product: TuftingProduct): number {
    return this.cartService.getQuantity(`Tufting-${product.name}`);
  }
}
