import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PageMetric {
  name: string;
  route: string;
  visits: number;
  clicks: number;
  conversion: number;
  color: string;
}

interface ProductMetric {
  name: string;
  line: string;
  clicks: number;
  whatsapp: number;
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
export class MetricasComponent {
  pageMetrics: PageMetric[] = [
    { name: 'Principal', route: '/', visits: 1840, clicks: 412, conversion: 22, color: '#2563eb' },
    { name: 'Sellos', route: '/sellos', visits: 1285, clicks: 368, conversion: 29, color: '#e31e24' },
    { name: 'Lenceria', route: '/lenceria', visits: 960, clicks: 244, conversion: 25, color: '#d96f9a' },
    { name: 'Ferreteria', route: '/ferreteria', visits: 1120, clicks: 301, conversion: 27, color: '#ffb000' }
  ];

  productMetrics: ProductMetric[] = [
    { name: 'Sello automatico empresarial', line: 'Sellos', clicks: 138, whatsapp: 42 },
    { name: 'Sello fechador', line: 'Sellos', clicks: 101, whatsapp: 31 },
    { name: 'Cobija Estrella', line: 'Lenceria', clicks: 96, whatsapp: 26 },
    { name: 'Sabana Solo Tono-Casa Luna', line: 'Lenceria', clicks: 84, whatsapp: 22 },
    { name: 'Taladros y rotomartillos', line: 'Ferreteria', clicks: 126, whatsapp: 39 },
    { name: 'Llaves y copas', line: 'Ferreteria', clicks: 73, whatsapp: 18 }
  ];

  visitTrend: TrendMetric[] = [
    { day: 'Lun', visits: 520 },
    { day: 'Mar', visits: 690 },
    { day: 'Mie', visits: 740 },
    { day: 'Jue', visits: 860 },
    { day: 'Vie', visits: 930 },
    { day: 'Sab', visits: 780 },
    { day: 'Dom', visits: 610 }
  ];

  get totalVisits(): number {
    return this.pageMetrics.reduce((total, metric) => total + metric.visits, 0);
  }

  get totalClicks(): number {
    return this.pageMetrics.reduce((total, metric) => total + metric.clicks, 0);
  }

  get totalWhatsapp(): number {
    return this.productMetrics.reduce((total, metric) => total + metric.whatsapp, 0);
  }

  get averageConversion(): number {
    const total = this.pageMetrics.reduce((sum, metric) => sum + metric.conversion, 0);
    return Math.round(total / this.pageMetrics.length);
  }

  get maxVisits(): number {
    return Math.max(...this.pageMetrics.map((metric) => metric.visits));
  }

  get maxTrendVisits(): number {
    return Math.max(...this.visitTrend.map((metric) => metric.visits));
  }

  get maxProductClicks(): number {
    return Math.max(...this.productMetrics.map((metric) => metric.clicks));
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
              <th>Visitas totales</th>
              <th>Clics totales</th>
              <th>Consultas WhatsApp</th>
              <th>Conversion promedio</th>
            </tr>
            <tr>
              <td>${this.totalVisits}</td>
              <td>${this.totalClicks}</td>
              <td>${this.totalWhatsapp}</td>
              <td>${this.averageConversion}%</td>
            </tr>
          </table>

          <h2>Rendimiento por pantalla</h2>
          <table border="1">
            <tr>
              <th>Pantalla</th>
              <th>Ruta</th>
              <th>Visitas</th>
              <th>Clics</th>
              <th>Conversion</th>
            </tr>
            ${this.pageMetrics.map((metric) => `
              <tr>
                <td>${metric.name}</td>
                <td>${metric.route}</td>
                <td>${metric.visits}</td>
                <td>${metric.clicks}</td>
                <td>${metric.conversion}%</td>
              </tr>
            `).join('')}
          </table>

          <h2>Clics por producto</h2>
          <table border="1">
            <tr>
              <th>Producto</th>
              <th>Linea</th>
              <th>Clics</th>
              <th>WhatsApp</th>
            </tr>
            ${this.productMetrics.map((product) => `
              <tr>
                <td>${product.name}</td>
                <td>${product.line}</td>
                <td>${product.clicks}</td>
                <td>${product.whatsapp}</td>
              </tr>
            `).join('')}
          </table>

          <h2>Tendencia semanal</h2>
          <table border="1">
            <tr>
              <th>Dia</th>
              <th>Visitas</th>
            </tr>
            ${this.visitTrend.map((metric) => `
              <tr>
                <td>${metric.day}</td>
                <td>${metric.visits}</td>
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
}
