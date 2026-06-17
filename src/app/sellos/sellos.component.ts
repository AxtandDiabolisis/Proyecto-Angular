import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sellos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sellos.component.html',
  styleUrl: './sellos.component.css'
})
export class SellosComponent {
  menuOpen = false;
  currentHeroSlide = 0;

  heroSlides = [
    {
      eyebrow: 'Sellos, insumos y personalizacion',
      title: 'Tenemos el sello que tu negocio necesita',
      text: 'Soluciones agiles para empresas, emprendedores y profesionales en toda Colombia.',
      image: 'assets/img/hero-sellos.jpg',
      primaryLabel: 'Solicita una cotizacion',
      primaryLink: '#contacto',
      secondaryLabel: 'Ver servicios',
      secondaryLink: '#servicios'
    },
    {
      eyebrow: 'Sellos automaticos y manuales',
      title: 'Marca tus documentos con precision profesional',
      text: 'Fabricamos sellos para firmas, certificaciones, fechas, logos y procesos empresariales.',
      image: 'assets/img/modelos.jpg',
      primaryLabel: 'Cotizar ahora',
      primaryLink: '#contacto',
      secondaryLabel: 'Nuestros servicios',
      secondaryLink: '#servicios'
    },
    {
      eyebrow: 'Cobertura nacional',
      title: 'Enviamos tus sellos a cualquier ciudad de Colombia',
      text: 'Atendemos desde nuestras sedes y coordinamos envios para que recibas tu pedido a tiempo.',
      image: 'assets/img/sedes-bg.jpg',
      primaryLabel: 'Hablar por WhatsApp',
      primaryLink: 'https://wa.me/573046159935',
      secondaryLabel: 'Ver sedes',
      secondaryLink: '#contacto'
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
