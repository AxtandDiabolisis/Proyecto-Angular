import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, retry, timeout } from 'rxjs';
import { Product, ProductsService } from '../services/products.service';
import { SiteContentService } from '../services/site-content.service';

type EditableContent = Record<string, any>;
interface HomepageContent {
  about: { image: string; title: string; text: string };
  slides: Array<{ eyebrow: string; title: string; text: string; image: string; primaryLabel: string; primaryLink: string; secondaryLabel: string; secondaryLink: string }>;
  possibilities: Array<{ title: string; text: string; image: string }>;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  activeTab: 'products' | 'homepage' = 'products';
  selectedLine = 'Sellos';
  lines = ['Sellos', 'Lenceria', 'Ferreteria'];
  products: Product[] = [];
  productsLoading = false;
  productsLoadError = false;
  private productsRequestId = 0;
  tuftingProducts: EditableContent = {
    '1001': { name: 'Tapete logo personalizado', description: 'Personalizado para tu marca.', price: 'Desde $120.000', image: 'assets/img/tufting/producto-logo-madeja.png' },
    '1002': { name: 'Wall art smile', description: 'Arte textil para pared.', price: 'Desde $95.000', image: 'assets/img/tufting/producto-smile.png' },
    '1003': { name: 'Tapete iniciales', description: 'Iniciales y colores a eleccion.', price: 'Desde $85.000', image: 'assets/img/tufting/producto-iniciales.png' },
    '1004': { name: 'Mini rug color pop', description: 'Un acento de color para tu espacio.', price: 'Desde $70.000', image: 'assets/img/tufting/producto-color-pop.png' }
  };
  homepage: HomepageContent = this.defaultHomepage();
  message = '';
  error = '';
  saving = false;

  constructor(
    private readonly productsService: ProductsService,
    private readonly contentService: SiteContentService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.contentService.get<EditableContent>('homepage').subscribe({
      next: (result) => {
        this.homepage = this.mergeHomepage(result.value || {});
        this.changeDetectorRef.detectChanges();
      },
      error: () => undefined
    });
    this.contentService.get<EditableContent>('tufting_products').subscribe({
      next: (result) => {
        this.tuftingProducts = { ...this.tuftingProducts, ...(result.value || {}) };
        this.changeDetectorRef.detectChanges();
      },
      error: () => undefined
    });
  }

  loadProducts(): void {
    const requestId = ++this.productsRequestId;
    if (this.selectedLine === 'Tufting') {
      this.productsLoading = false;
      this.productsLoadError = false;
      this.products = [];
      this.error = '';
      return;
    }

    const requestedLine = this.selectedLine;
    this.productsLoading = true;
    this.productsLoadError = false;
    this.products = [];
    this.error = '';
    this.productsService.getProducts(requestedLine).pipe(
      timeout({ first: 8000 }),
      retry({ count: 1, delay: 300 }),
      finalize(() => {
        if (requestId === this.productsRequestId) {
          this.productsLoading = false;
          this.changeDetectorRef.detectChanges();
        }
      })
    ).subscribe({
      next: (items) => {
        if (requestId !== this.productsRequestId || requestedLine !== this.selectedLine) return;
        this.products = items;
        this.productsLoadError = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        if (requestId !== this.productsRequestId || requestedLine !== this.selectedLine) return;
        this.productsLoadError = true;
        this.error = 'No se pudo completar la carga de productos. Revisa la conexion con la API e intenta nuevamente.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  changeLine(line: string): void {
    if (line === this.selectedLine) return;
    this.selectedLine = line;
    this.loadProducts();
  }

  openProductsTab(): void {
    this.activeTab = 'products';
    this.loadProducts();
  }

  saveProduct(product: Product): void {
    this.saving = true;
    this.message = '';
    this.error = '';
    this.productsService.updateProduct(product.id, {
      name: product.name,
      description: product.description || '',
      image: product.image || '',
      price: product.price?.trim() || null
    }).subscribe({
      next: (updated) => {
        Object.assign(product, updated);
        this.message = 'Producto actualizado.';
        this.saving = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        this.error = err.status === 401 || err.status === 403 ? 'Tu sesion de administrador vencio. Inicia sesion nuevamente.' : 'No se pudo guardar el producto.';
        this.saving = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  saveHomepage(): void {
    this.contentService.save('homepage', this.homepage).subscribe({
      next: (result) => {
        this.homepage = this.mergeHomepage(result.value || {});
        this.message = 'Contenido de portada actualizado.';
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo guardar la portada. Verifica tu sesion de administrador.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  saveTufting(): void {
    this.contentService.save('tufting_products', this.tuftingProducts).subscribe({
      next: () => {
        this.message = 'Contenido de Tufting actualizado.';
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo guardar el contenido de Tufting. Verifica tu sesion.';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  async upload(event: Event, target: EditableContent, field: string): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 4 * 1024 * 1024) {
      this.error = 'Selecciona una imagen JPG, PNG o WebP de maximo 4 MB.';
      return;
    }
    this.error = '';
    try {
      target[field] = await this.contentService.uploadImage(file);
      this.message = 'Imagen cargada. Guarda los cambios para publicarla.';
    } catch {
      this.error = 'No se pudo subir la imagen. Verifica tu sesion y la conexion con la API.';
    }
  }

  async uploadProduct(event: Event, product: Product): Promise<void> {
    const target: EditableContent = { image: product.image || '' };
    await this.upload(event, target, 'image');
    if (target['image']) product.image = target['image'];
  }

  saveTuftingProduct(product: EditableContent): void {
    this.saveTufting();
  }

  defaultTuftingImage(id: string): string {
    return this.tuftingProducts[id]?.image || 'assets/img/tufting/producto-logo-madeja.png';
  }

  private mergeHomepage(value: EditableContent): HomepageContent {
    const defaults = this.defaultHomepage();
    return {
      ...defaults, ...value,
      about: { ...defaults.about, ...(value?.['about'] || {}) },
      slides: defaults.slides.map((slide, index) => ({ ...slide, ...(value?.['slides']?.[index] || {}) })),
      possibilities: defaults.possibilities.map((item, index) => ({ ...item, ...(value?.['possibilities']?.[index] || {}) }))
    };
  }

  private defaultHomepage(): HomepageContent {
    return {
      about: { image: 'assets/img/profesiones.jpg', title: 'Una empresa con varias lineas para resolver mejor', text: 'Creamos y comercializamos productos para negocios, hogares y proyectos creativos con asesoria clara, calidad constante y tiempos de respuesta rapidos.' },
      slides: [
        { eyebrow: 'UNIALRE soluciones para tu negocio', title: 'Productos y servicios para empresas, hogar y proyectos', text: 'Integramos sellos, lenceria, ferreteria y tufting en una experiencia cercana y confiable.', image: 'assets/img/profesiones.jpg', primaryLabel: 'Conoce nuestras lineas', primaryLink: '#contacto', secondaryLabel: 'Ver productos', secondaryLink: '#servicios' },
        { eyebrow: 'Sellos y personalizacion', title: 'Marcacion profesional para documentos, marcas y procesos', text: 'Fabricamos sellos, fechadores, insumos y soluciones personalizadas para negocios.', image: 'assets/img/profesiones.jpg', primaryLabel: 'Ver sellos', primaryLink: '/sellos', secondaryLabel: 'Cotizar ahora', secondaryLink: '#contacto' },
        { eyebrow: 'Lineas para hogar y proyectos', title: 'Lenceria, ferreteria y tufting en un solo lugar', text: 'Explora productos para el hogar, herramientas para tus proyectos y piezas textiles personalizadas.', image: 'assets/img/modelos-proyectos.jpg', primaryLabel: 'Hablar por WhatsApp', primaryLink: 'https://wa.me/573124986325', secondaryLabel: 'Ver lineas', secondaryLink: '#servicios' }
      ],
      possibilities: [
        { title: 'Para negocios', text: 'Sellos, insumos y productos utiles para operaciones del dia a dia.', image: 'assets/img/profesiones.jpg' },
        { title: 'Para el hogar', text: 'Lenceria, textiles y articulos pensados para espacios comodos.', image: 'assets/img/usos-hogar.jpg' },
        { title: 'Para proyectos', text: 'Ferreteria, corte laser y tufting para crear, reparar y personalizar.', image: 'assets/img/modelos-proyectos.jpg' }
      ]
    };
  }
}
