import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  line: string;
  image?: string;
  price?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'unialre-cart';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.loadItems());

  items$ = this.itemsSubject.asObservable();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === this.storageKey) {
        this.itemsSubject.next(this.loadItems());
      }
    });
  }

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  get totalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce((total, item) => total + this.getItemSubtotal(item), 0);
  }

  get hasPricelessItems(): boolean {
    return this.items.some((item) => !this.parsePrice(item.price));
  }

  addItem(item: Omit<CartItem, 'quantity'>): void {
    const items = [...this.items];
    const current = items.find((cartItem) => cartItem.id === item.id);

    if (current) {
      current.quantity += 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }

    this.setItems(items);
  }

  getQuantity(id: string): number {
    return this.items.find((item) => item.id === id)?.quantity ?? 0;
  }

  getItemSubtotal(item: CartItem): number {
    return this.parsePrice(item.price) * item.quantity;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value);
  }

  increase(id: string): void {
    this.setItems(this.items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  }

  decrease(id: string): void {
    this.setItems(
      this.items
        .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter((item) => item.quantity > 0)
    );
  }

  remove(id: string): void {
    this.setItems(this.items.filter((item) => item.id !== id));
  }

  clear(): void {
    this.setItems([]);
  }

  private setItems(items: CartItem[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadItems(): CartItem[] {
    const saved = localStorage.getItem(this.storageKey);

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as CartItem[];
    } catch {
      return [];
    }
  }

  private parsePrice(price?: string): number {
    if (!price) {
      return 0;
    }

    const numeric = price.replace(/[^\d]/g, '');
    return numeric ? Number(numeric) : 0;
  }
}
