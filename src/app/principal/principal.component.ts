import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  menuOpen = false;
  currentHeroSlide = 0;

  heroSlides = [
    {
      eyebrow: 'UNIALRE soluciones para tu negocio',
      title: 'Productos y servicios para empresas, hogar y proyectos',
      text: 'Integramos sellos, lenceria, ferreteria y tufting en una experiencia cercana y confiable.',
      image: 'assets/img/hero-sellos.jpg',
      primaryLabel: 'Conoce nuestras lineas',
      primaryLink: '#contacto',
      secondaryLabel: 'Ver productos',
      secondaryLink: '#servicios'
    },
    {
      eyebrow: 'Sellos y personalizacion',
      title: 'Marcacion profesional para documentos, marcas y procesos',
      text: 'Fabricamos sellos, fechadores, insumos y soluciones personalizadas para negocios.',
      image: 'assets/img/modelos.jpg',
      primaryLabel: 'Ver sellos',
      primaryLink: '/sellos',
      secondaryLabel: 'Cotizar ahora',
      secondaryLink: '#contacto'
    },
    {
      eyebrow: 'Lineas para hogar y proyectos',
      title: 'Lenceria, ferreteria y tufting en un solo lugar',
      text: 'Explora productos para el hogar, herramientas para tus proyectos y piezas textiles personalizadas.',
      image: 'assets/img/sedes-bg.jpg',
      primaryLabel: 'Hablar por WhatsApp',
      primaryLink: 'https://wa.me/573046159935',
      secondaryLabel: 'Ver lineas',
      secondaryLink: '#servicios'
    }
  ];

  contactForm = {
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
    politica: false
  };

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

    const text = [
      'Hola, quiero solicitar una cotizacion.',
      `Nombre: ${nombre}`,
      `Correo: ${correo}`,
      `Telefono: ${telefono}`,
      mensaje.trim() ? `Mensaje: ${mensaje}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
}
