
import { AfterViewInit, Component, DestroyRef, ElementRef, OnDestroy, ViewChild, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MetricsService } from '../services/metrics.service';
import { CartWidgetComponent } from '../cart-widget/cart-widget.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { SiteContentService } from '../services/site-content.service';

interface TuftingCategory {
  id: string;
  name: string;
  description: string;
  detail: string;
}

interface TuftingProduct {
  id: number;
  name: string;
  category: string;
  categoryId: string;
  price: string;
  image: string;
  badge: string;
  description: string;
  use: string;
}

@Component({
  selector: 'app-tufting',
  standalone: true,
  imports: [FormsModule, RouterLink, CartWidgetComponent, ProductReviewsComponent],
  templateUrl: './tufting.component.html',
  styleUrls: ['./tufting.component.css']
})
export class TuftingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tuftingHeader') private header!: ElementRef<HTMLElement>;
  @ViewChild('productDialog') private productDialog!: ElementRef<HTMLDialogElement>;
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private headerObserver?: ResizeObserver;
  private scrollFrame?: number;
  readonly selectedCategory = signal('all');
  readonly search = signal('');
  readonly sort = signal('featured');
  readonly currentSection = signal('');
  readonly preview = signal<TuftingProduct | null>(null);
  readonly reviewProduct = signal<TuftingProduct | null>(null);
  readonly failedImages = signal<Set<number>>(new Set());
  private readonly productsRefresh = signal(0);
  private readonly cartItems;
  categories: TuftingCategory[] = [
    { id: 'custom', name: 'Tapetes a medida', description: 'Convierte tu logo, frase o dibujo en una pieza para tu casa o negocio.', detail: 'Forma, tamaño y colores a elección' },
    { id: 'wall', name: 'Arte para pared', description: 'Piezas textiles para dar color y textura a tus paredes.', detail: 'Formato y montaje por cotizar' },
    { id: 'gifts', name: 'Regalos únicos', description: 'Iniciales, nombres y colores pensados para una persona especial.', detail: 'Personalizable para cada ocasión' },
    { id: 'drops', name: 'Diseños de colección', description: 'Piezas coloridas para escritorios y rincones pequeños.', detail: 'Precio y disponibilidad al cotizar' }
  ];

  products: TuftingProduct[] = [
    { id: 1001, name: 'Tapete con logo personalizado', category: 'Tapetes a medida', categoryId: 'custom', price: 'Desde $120.000', image: 'assets/img/tufting/producto-logo-madeja.png', badge: 'A tu medida', description: 'Una pieza con la identidad de tu marca o tu idea favorita. El diseño, los colores y la forma se definen durante la cotización.', use: 'Piso, estudio o negocio' },
    { id: 1002, name: 'Arte textil smile', category: 'Arte para pared', categoryId: 'wall', price: 'Desde $95.000', image: 'assets/img/tufting/producto-smile.png', badge: 'Para pared', description: 'Una cara sonriente y bloques de color para una pared con personalidad. Consulta el formato y las opciones de montaje.', use: 'Decoración de pared' },
    { id: 1003, name: 'Tapete de iniciales', category: 'Regalos únicos', categoryId: 'gifts', price: 'Desde $85.000', image: 'assets/img/tufting/producto-iniciales.png', badge: 'Personalizable', description: 'Iniciales, nombres y una paleta elegida por ti. Una propuesta de regalo que puedes adaptar a la persona y a su espacio.', use: 'Regalo o decoración' },
    { id: 1004, name: 'Mini rug color pop', category: 'Diseños de colección', categoryId: 'drops', price: 'Desde $70.000', image: 'assets/img/tufting/producto-color-pop.png', badge: 'Colección', description: 'Un diseño de cuadros en rosa y menta para dar un acento de color. Consulta medidas, disponibilidad y adaptaciones para escritorio.', use: 'Escritorio o rincón decorativo' }
  ];

  readonly filteredProducts = computed(() => {
    this.productsRefresh();
    const query = this.normalize(this.search().trim());
    const items = this.products.filter((product) =>
      (this.selectedCategory() === 'all' || product.categoryId === this.selectedCategory())
      && (!query || this.normalize(`${product.name} ${product.category} ${product.description} ${product.use}`).includes(query))
    );
    if (this.sort() !== 'featured') {
      const direction = this.sort() === 'price-asc' ? 1 : -1;
      items.sort((a, b) => direction * (this.priceValue(a) - this.priceValue(b)));
    }
    return items;
  });
  readonly selectedCategoryName = computed(() => this.categories.find((category) => category.id === this.selectedCategory())?.name ?? 'Todos los diseños');

  constructor(
    private cartService: CartService,
    private metricsService: MetricsService,
    private contentService: SiteContentService
  ) {
    this.contentService.get<Record<string, Partial<TuftingProduct>>>('tufting_products').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ value }) => {
        const overrides = value || {};
        for (const product of this.products) {
          const override = overrides[String(product.id)];
          if (override) Object.assign(product, override);
        }
        this.productsRefresh.update((revision) => revision + 1);
      },
      error: () => undefined
    });
    this.cartItems = toSignal(this.cartService.items$, { initialValue: this.cartService.items });
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const category = params.get('categoria');
      this.selectedCategory.set(this.categories.some((item) => item.id === category) ? category! : 'all');
    });
  }

  ngAfterViewInit(): void {
    this.headerObserver = new ResizeObserver(([entry]) => {
      this.host.nativeElement.style.setProperty('--tufting-header-offset', `${entry.target.getBoundingClientRect().height + 20}px`);
    });
    this.headerObserver.observe(this.header.nativeElement);
    this.route.fragment.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((fragment) => {
      if (fragment === 'drops' || fragment === 'categorias') this.scrollSection(fragment);
    });
  }

  ngOnDestroy(): void {
    this.headerObserver?.disconnect();
    if (this.scrollFrame !== undefined) cancelAnimationFrame(this.scrollFrame);
  }

  scrollSection(section: string): void {
    this.currentSection.set(section);
    if (this.scrollFrame !== undefined) cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = requestAnimationFrame(() => {
      this.host.nativeElement.style.setProperty('--tufting-header-offset', `${this.header.nativeElement.getBoundingClientRect().height + 20}px`);
      document.getElementById(section)?.scrollIntoView({
        block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  }

  openDrops(): void {
    this.selectedCategory.set('all');
    this.search.set('');
    this.scrollSection('drops');
  }

  chooseCategory(category: string): void {
    this.selectedCategory.set(category);
    this.search.set('');
    this.scrollSection('drops');
  }

  filterCategory(category: string): void {
    this.selectedCategory.set(category);
    void this.router.navigate(['/tufting'], {
      fragment: 'drops', queryParams: { categoria: category === 'all' ? null : category },
      queryParamsHandling: 'merge', replaceUrl: true
    });
  }

  clearFilters(): void {
    this.search.set('');
    this.sort.set('featured');
    this.filterCategory('all');
  }

  categoryCount(category: string): number {
    return this.products.filter((product) => product.categoryId === category).length;
  }

  showProduct(product: TuftingProduct): void {
    this.preview.set(product);
    this.productDialog.nativeElement.showModal();
  }

  showReviews(product: TuftingProduct): void {
    this.reviewProduct.set(product);
  }

  imageFailed(id: number): void {
    this.failedImages.update((ids) => new Set([...ids, id]));
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  private priceValue(product: TuftingProduct): number {
    return Number(product.price.replace(/[^\d]/g, ''));
  }

  openWhatsApp(productName: string): void {
    const text = `Hola, quiero cotizar tufting personalizado: ${productName}`;
    window.open(`https://wa.me/573124986325?text=${encodeURIComponent(text)}`, '_blank', 'noopener');

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
    return this.cartItems().find((item) => item.id === `Tufting-${product.name}`)?.quantity ?? 0;
  }
}
