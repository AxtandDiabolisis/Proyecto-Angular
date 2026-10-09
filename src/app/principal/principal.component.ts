import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ContactService } from '../services/contact.service';
import { SiteContentService } from '../services/site-content.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  menuOpen = false;
  currentHeroSlide = 0;

  heroSlides = [
    {
      eyebrow: 'UNIALRE soluciones para tu negocio',
      title: 'Productos y servicios para empresas, hogar y proyectos',
      text: 'Integramos sellos, lenceria, ferreteria y tufting en una experiencia cercana y confiable.',
      image: 'assets/img/profesiones.jpg',
      primaryLabel: 'Conoce nuestras lineas',
      primaryLink: '#contacto',
      secondaryLabel: 'Ver productos',
      secondaryLink: '#servicios'
    },
    {
      eyebrow: 'Sellos y personalizacion',
      title: 'Marcacion profesional para documentos, marcas y procesos',
      text: 'Fabricamos sellos, fechadores, insumos y soluciones personalizadas para negocios.',
      image: 'assets/img/profesiones.jpg',
      primaryLabel: 'Ver sellos',
      primaryLink: '/sellos',
      secondaryLabel: 'Cotizar ahora',
      secondaryLink: '#contacto'
    },
    {
      eyebrow: 'Lineas para hogar y proyectos',
      title: 'Lenceria, ferreteria y tufting en un solo lugar',
      text: 'Explora productos para el hogar, herramientas para tus proyectos y piezas textiles personalizadas.',
      image: 'assets/img/modelos-proyectos.jpg',
      primaryLabel: 'Hablar por WhatsApp',
      primaryLink: 'https://wa.me/573124986325',
      secondaryLabel: 'Ver lineas',
      secondaryLink: '#servicios'
    }
  ];

  about = {
    image: 'assets/img/profesiones.jpg',
    title: 'Una empresa con varias lineas para resolver mejor',
    text: 'Creamos y comercializamos productos para negocios, hogares y proyectos creativos con asesoria clara, calidad constante y tiempos de respuesta rapidos.'
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

  constructor(private contactService: ContactService, private contentService: SiteContentService) {}

  ngOnInit(): void {
    this.contentService.get<any>('homepage').subscribe({
      next: ({ value }) => {
        if (value?.slides?.length) this.heroSlides = this.heroSlides.map((slide, index) => ({ ...slide, ...(value.slides[index] || {}) }));
        if (value?.about) this.about = { ...this.about, ...value.about };
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

  nextHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide + 1) % this.heroSlides.length;
  }

  previousHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  goToHeroSlide(index: number): void {
    this.currentHeroSlide = index;
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
