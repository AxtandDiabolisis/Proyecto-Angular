
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ContactService } from '../services/contact.service';
import { SiteContentService } from '../services/site-content.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  menuOpen = false;
  currentHeroSlide = 0;

  heroSlides = [
    {
      eyebrow: 'UNIALRE soluciones para tu negocio',
      title: 'Todo para tu negocio',
      text: 'Sellos, lencería, ferretería y tufting para el hogar, los negocios y tus proyectos.',
      image: 'assets/img/sede-tienda.jpg',
      primaryLabel: 'Conoce nuestras lineas',
      primaryLink: '#servicios',
      secondaryLabel: 'Ver productos',
      secondaryLink: '/sellos'
    },
    {
      eyebrow: 'Sellos y personalización',
      title: 'Sellos para tu marca',
      text: 'Fabricamos sellos, fechadores e insumos para identificar documentos y productos.',
      image: 'assets/img/profesiones.jpg',
      primaryLabel: 'Ver sellos',
      primaryLink: '/sellos',
      secondaryLabel: 'Cotizar ahora',
      secondaryLink: '#contacto'
    },
    {
      eyebrow: 'Líneas para hogar y proyectos',
      title: 'Hogar y proyectos',
      text: 'Encuentra textiles, herramientas y piezas tufting para tus ideas.',
      image: 'assets/img/usos-hogar.jpg',
      primaryLabel: 'Hablar por WhatsApp',
      primaryLink: 'https://wa.me/573124986325',
      secondaryLabel: 'Ver lineas',
      secondaryLink: '#servicios'
    }
  ];

  about = {
    image: 'assets/img/profesiones.jpg',
    title: 'Un aliado para cada día',
    text: 'Creamos y comercializamos productos para negocios, hogares y proyectos creativos con asesoría clara, calidad constante y respuesta oportuna.'
  };

  possibilities = [
    { title: 'Para negocios', text: 'Sellos, insumos y productos utiles para operaciones del dia a dia.', image: 'assets/img/profesiones.jpg' },
    { title: 'Para el hogar', text: 'Lenceria, textiles y articulos pensados para espacios comodos.', image: 'assets/img/usos-hogar.jpg' },
    { title: 'Para proyectos', text: 'Ferreteria, corte laser y tufting para crear, reparar y personalizar.', image: 'assets/img/modelos-proyectos.jpg' }
  ];

  contactForm = {
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
    politica: false
  };

  constructor(
    private contactService: ContactService,
    private contentService: SiteContentService,
    readonly auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentService.get<any>('homepage').subscribe({
      next: ({ value }) => {
        if (value?.slides?.length) this.heroSlides = this.heroSlides.map((slide, index) => ({ ...slide, ...(value.slides[index] || {}) }));
        if (value?.about) {
          const savedAbout = value.about as Partial<{ image: string; title: string; text: string }>;
          this.about = {
            image: savedAbout.image?.trim() ? savedAbout.image : this.about.image,
            title: savedAbout.title?.trim() ? savedAbout.title : this.about.title,
            text: savedAbout.text?.trim() ? savedAbout.text : this.about.text
          };
        }
        if (value?.possibilities?.length) this.possibilities = this.possibilities.map((item, index) => ({ ...item, ...(value.possibilities[index] || {}) }));
      },
      error: () => undefined
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  navigateToSection(section: string, event: MouseEvent): void {
    event.preventDefault();
    this.closeMenu();
    void this.router.navigate(['/principal'], { fragment: section, replaceUrl: true }).then(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(section);
        if (!target) return;
        target.scrollIntoView({
          block: 'start',
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
        target.focus({ preventScroll: true });
      });
    });
  }

  nextHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide + 1) % this.heroSlides.length;
  }

  previousHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  goToHeroSlide(index: number): void {
    this.currentHeroSlide = index;
  }

  followHeroLink(link: string, event: MouseEvent): void {
    event.preventDefault();

    if (link.startsWith('#')) {
      this.navigateToSection(link.slice(1), event);
      return;
    }

    if (link.startsWith('/')) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }

    window.open(link, '_blank', 'noopener,noreferrer');
  }

  sendForm(): void {
    const { nombre, correo, telefono, mensaje, politica } = this.contactForm;

    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !politica) {
      window.alert('Por favor completa nombre, correo, telefono y acepta la politica de datos.');
      return;
    }

    // Enviar a la API
    this.contactService.sendContactMessage({
      name: nombre,
      email: correo,
      phone: telefono,
      message: mensaje,
      source_page: 'principal'
    }).subscribe({
      next: () => {
        console.log('Mensaje de contacto guardado en la API');
      },
      error: (error) => {
        console.error('Error guardando mensaje de contacto', error);
      }
    });

    const text = [
      'Hola, quiero solicitar una cotizacion.',
      `Nombre: ${nombre}`,
      `Correo: ${correo}`,
      `Telefono: ${telefono}`,
      mensaje.trim() ? `Mensaje: ${mensaje}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/573124986325?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
}
