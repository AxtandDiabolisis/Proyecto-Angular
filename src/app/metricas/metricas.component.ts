import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartItem, CartService } from '../services/cart.service';
import { MetricRecord, MetricsService, MetricSummary } from '../services/metrics.service';

interface PageMetric {
  name: string;
  route: string;
  interactions: number;
  cartItems: number;
  clicks: number;
  whatsapp: number;
  conversion: number;
  color: string;
}

interface ProductMetric {
  name: string;
  line: string;
  clicks: number;
  whatsapp: number;
  cartQuantity: number;
  cartValue: number;
}

interface TrendMetric {
  day: string;
  visits: number;
}

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.css'
})
export class MetricasComponent implements OnInit, OnDestroy {
  pageMetrics: PageMetric[] = [
    { name: 'Principal', route: '/principal', interactions: 0, cartItems: 0, clicks: 0, whatsapp: 0, conversion: 0, color: '#2563eb' },
    { name: 'Sellos', route: '/sellos', interactions: 0, cartItems: 0, clicks: 0, whatsapp: 0, conversion: 0, color: '#e31e24' },
    { name: 'Lenceria', route: '/lenceria', interactions: 0, cartItems: 0, clicks: 0, whatsapp: 0, conversion: 0, color: '#d96f9a' },
    { name: 'Ferreteria', route: '/ferreteria', interactions: 0, cartItems: 0, clicks: 0, whatsapp: 0, conversion: 0, color: '#ffb000' },
    { name: 'Tufting', route: '/tufting', interactions: 0, cartItems: 0, clicks: 0, whatsapp: 0, conversion: 0, color: '#ff4fb8' }
  ];

  productMetrics: ProductMetric[] = [];
  cartItems: CartItem[] = [];
  metricRecords: MetricRecord[] = [];
  metricsLoadError = false;

  visitTrend: TrendMetric[] = [
    { day: 'Lun', visits: 0 },
    { day: 'Mar', visits: 0 },
    { day: 'Mie', visits: 0 },
    { day: 'Jue', visits: 0 },
    { day: 'Vie', visits: 0 },
    { day: 'Sab', visits: 0 },
    { day: 'Dom', visits: 0 }
  ];

  private cartSubscription?: Subscription;

  constructor(
    private metricsService: MetricsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.items;
    this.cartSubscription = this.cartService.items$.subscribe((items) => {
      this.cartItems = items;
      this.rebuildDashboard();
    });
    this.loadMetrics();
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  loadMetrics(): void {
    this.metricsLoadError = false;

    this.metricsService.getSummary().subscribe({
      next: (summary: MetricSummary) => {
        this.metricRecords = summary.records;
        this.rebuildDashboard();
      },
      error: (error) => {
        this.metricsLoadError = true;
        console.error('Error cargando metricas', error);
        this.rebuildDashboard();
      }
    });
  }

  get totalInteractions(): number {
    return this.pageMetrics.reduce((total, metric) => total + metric.interactions, 0);
  }

  get totalClicks(): number {
    return this.pageMetrics.reduce((total, metric) => total + metric.clicks, 0);
  }

  get totalWhatsapp(): number {
    return this.productMetrics.reduce((total, metric) => total + metric.whatsapp, 0);
  }

  get totalCartItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get totalCartValue(): number {
    return this.cartService.totalPrice;
  }

  get averageConversion(): number {
    return this.totalInteractions ? Math.round(this.totalWhatsapp / this.totalInteractions * 100) : 0;
  }

  get maxInteractions(): number {
    return Math.max(1, ...this.pageMetrics.map((metric) => metric.interactions));
  }

  get maxTrendVisits(): number {
    return Math.max(1, ...this.visitTrend.map((metric) => metric.visits));
  }

  get maxProductClicks(): number {
    return Math.max(1, ...this.productMetrics.map((metric) => metric.clicks + metric.cartQuantity));
  }

  formatCurrency(value: number): string {
    return this.cartService.formatCurrency(value);
  }

  cartSubtotal(item: CartItem): number {
    return this.cartService.getItemSubtotal(item);
  }

  downloadExcel(): void {
    const html = `
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <h1>Metricas UNIALRE</h1>

          <h2>Resumen general</h2>
          <table border="1">
            <tr>
              <th>Interacciones registradas</th>
              <th>Clics carrito</th>
              <th>Productos en carrito</th>
              <th>Valor carrito</th>
              <th>Consultas WhatsApp</th>
              <th>Conversion promedio</th>
            </tr>
            <tr>
              <td>${this.totalInteractions}</td>
              <td>${this.totalClicks}</td>
              <td>${this.totalCartItems}</td>
              <td>${this.formatCurrency(this.totalCartValue)}</td>
              <td>${this.totalWhatsapp}</td>
              <td>${this.averageConversion}%</td>
            </tr>
          </table>

          <h2>Rendimiento por linea</h2>
          <table border="1">
            <tr>
              <th>Pantalla</th>
              <th>Ruta</th>
              <th>Interacciones</th>
              <th>Clics carrito</th>
              <th>Productos en carrito</th>
              <th>WhatsApp</th>
              <th>Conversion</th>
            </tr>
            ${this.pageMetrics.map((metric) => `
              <tr>
                <td>${metric.name}</td>
                <td>${metric.route}</td>
                <td>${metric.interactions}</td>
                <td>${metric.clicks}</td>
                <td>${metric.cartItems}</td>
                <td>${metric.whatsapp}</td>
                <td>${metric.conversion}%</td>
              </tr>
            `).join('')}
          </table>

          <h2>Clics y carrito por producto</h2>
          <table border="1">
            <tr>
              <th>Producto</th>
              <th>Linea</th>
              <th>Clics carrito registrados</th>
              <th>Cantidad en carrito actual</th>
              <th>Valor en carrito actual</th>
              <th>WhatsApp</th>
            </tr>
            ${this.productMetrics.map((product) => `
              <tr>
                <td>${product.name}</td>
                <td>${product.line}</td>
                <td>${product.clicks}</td>
                <td>${product.cartQuantity}</td>
                <td>${this.formatCurrency(product.cartValue)}</td>
                <td>${product.whatsapp}</td>
              </tr>
            `).join('')}
          </table>

          <h2>Carrito actual</h2>
          <table border="1">
            <tr>
              <th>Producto</th>
              <th>Linea</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
            ${this.cartItems.map((item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.line}</td>
                <td>${item.quantity}</td>
                <td>${item.price ?? 'Sin precio'}</td>
                <td>${this.formatCurrency(this.cartService.getItemSubtotal(item))}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `metricas-unialre-${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();

    URL.revokeObjectURL(url);
  }

  private rebuildDashboard(): void {
    this.rebuildPageMetrics();
    this.rebuildProductMetrics();
    this.rebuildTrend();
  }

  private rebuildPageMetrics(): void {
    this.pageMetrics = this.pageMetrics.map((metric) => {
      if (metric.name === 'Principal') {
        return { ...metric, interactions: 0, cartItems: 0, clicks: 0, whatsapp: 0, conversion: 0 };
      }

      const records = this.metricRecords.filter((record) => this.normalizeLine(record.line) === metric.name);
      const cartItems = this.cartItems
        .filter((item) => this.normalizeLine(item.line) === metric.name)
        .reduce((total, item) => total + item.quantity, 0);
      const clicks = records.filter((record) => record.action === 'cart').length;
      const whatsapp = records.filter((record) => record.action === 'whatsapp').length;
      const interactions = records.length + cartItems;
      const conversion = interactions ? Math.round(whatsapp / interactions * 100) : 0;

      return { ...metric, interactions, cartItems, clicks, whatsapp, conversion };
    });
  }

  private rebuildProductMetrics(): void {
    const productMap = new Map<string, ProductMetric>();

    for (const record of this.metricRecords) {
      const line = this.normalizeLine(record.line);
      const key = `${line}-${record.productName}`;
      const entry = productMap.get(key) ?? {
        name: record.productName,
        line,
        clicks: 0,
        whatsapp: 0,
        cartQuantity: 0,
        cartValue: 0
      };

      if (record.action === 'cart') {
        entry.clicks++;
      }

      if (record.action === 'whatsapp') {
        entry.whatsapp++;
      }

      productMap.set(key, entry);
    }

    for (const item of this.cartItems) {
      const line = this.normalizeLine(item.line);
      const key = `${line}-${item.name}`;
      const entry = productMap.get(key) ?? {
        name: item.name,
        line,
        clicks: 0,
        whatsapp: 0,
        cartQuantity: 0,
        cartValue: 0
      };

      entry.cartQuantity += item.quantity;
      entry.cartValue += this.cartService.getItemSubtotal(item);
      productMap.set(key, entry);
    }

    this.productMetrics = Array.from(productMap.values())
      .sort((a, b) => (b.clicks + b.cartQuantity + b.whatsapp) - (a.clicks + a.cartQuantity + a.whatsapp))
      .slice(0, 8);
  }

  private rebuildTrend(): void {
    const dayLabels = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const totals = new Map<string, number>(dayLabels.map((day) => [day, 0]));

    for (const record of this.metricRecords) {
      const day = dayLabels[new Date(record.createdAt).getDay()];
      totals.set(day, (totals.get(day) ?? 0) + 1);
    }

    this.visitTrend = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((day) => ({
      day,
      visits: totals.get(day) ?? 0
    }));
  }

  private normalizeLine(line: string): string {
    const value = line.toLowerCase();

    if (value.includes('lencer')) {
      return 'Lenceria';
    }

    if (value.includes('ferreter')) {
      return 'Ferreteria';
    }

    if (value.includes('tuft')) {
      return 'Tufting';
    }

    return 'Sellos';
  }
}
