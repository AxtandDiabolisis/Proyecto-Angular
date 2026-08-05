import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CartItem, CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.css'
})
export class CartWidgetComponent {
  open = false;

  constructor(public cartService: CartService) {}

  toggleCart(): void {
    this.open = !this.open;
  }

  increase(item: CartItem): void {
    this.cartService.increase(item.id);
  }

  decrease(item: CartItem): void {
    this.cartService.decrease(item.id);
  }

  remove(item: CartItem): void {
    this.cartService.remove(item.id);
  }

  sendOrder(): void {
    const items = this.cartService.items;

    if (!items.length) {
      return;
    }

    const detail = items
      .map((item) => `- ${item.quantity} x ${item.name} (${item.line})${item.price ? ` - ${item.price}` : ''}`)
      .join('\n');
    const message = `Hola, quiero cotizar estos productos:\n${detail}`;

    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  }
}
