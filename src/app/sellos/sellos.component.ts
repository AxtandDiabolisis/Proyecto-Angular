import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface StampCategory {
  name: string;
  count: number;
}

interface StampProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-sellos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sellos.component.html',
  styleUrl: './sellos.component.css'
})
export class SellosComponent {
  selectedCategory = 'Todos';
  sortOption = 'latest';
  currentPage = 1;

  categories: StampCategory[] = [
    { name: 'Todos', count: 12 },
    { name: 'Automaticos', count: 3 },
    { name: 'Manuales', count: 3 },
    { name: 'Fechadores', count: 2 },
    { name: 'Insumos', count: 2 },
    { name: 'Personalizados', count: 2 }
  ];

  products: StampProduct[] = [
    { id: 1, name: 'Sello automatico empresarial', category: 'Automaticos', image: 'assets/img/sellos/producto-sello-automatico.jpg', icon: 'fa-stamp', description: 'Ideal para alto volumen de documentos y uso diario.' },
    { id: 2, name: 'Sello manual personalizado', category: 'Manuales', image: 'assets/img/sellos/producto-sello-manual.jpg', icon: 'fa-hand', description: 'Opcion practica para firmas, logos y textos cortos.' },
    { id: 3, name: 'Sello fechador', category: 'Fechadores', image: 'assets/img/sellos/producto-fechador.jpg', icon: 'fa-calendar-days', description: 'Fecha documentos, recibos y controles internos con rapidez.' },
    { id: 4, name: 'Tinta para sellos', category: 'Insumos', image: 'assets/img/sellos/producto-tinta.jpg', icon: 'fa-droplet', description: 'Tintas de alto rendimiento para diferentes tipos de sello.' },
    { id: 5, name: 'Sello de bolsillo', category: 'Automaticos', image: 'assets/img/sellos/producto-bolsillo.jpg', icon: 'fa-briefcase', description: 'Compacto, portable y listo para profesionales en movimiento.' },
    { id: 6, name: 'Sello para logo', category: 'Personalizados', image: 'assets/img/sellos/producto-logo.jpg', icon: 'fa-pen-nib', description: 'Marca empaques, papeleria y piezas promocionales con identidad.' },
    { id: 7, name: 'Sello numerador', category: 'Fechadores', image: 'assets/img/sellos/producto-numerador.jpg', icon: 'fa-list-ol', description: 'Controla consecutivos, series y registros administrativos.' },
    { id: 8, name: 'Almohadilla para sello', category: 'Insumos', image: 'assets/img/sellos/producto-almohadilla.jpg', icon: 'fa-square', description: 'Accesorio resistente para sellos manuales de uso frecuente.' },
    { id: 9, name: 'Sello para firma', category: 'Manuales', image: 'assets/img/sellos/producto-firma.jpg', icon: 'fa-signature', description: 'Reproduce firmas autorizadas para procesos internos.' },
    { id: 10, name: 'Sello seco o relieve', category: 'Personalizados', image: 'assets/img/sellos/producto-relieve.jpg', icon: 'fa-certificate', description: 'Acabado elegante para certificados, invitaciones y documentos.' },
    { id: 11, name: 'Sello redondo automatico', category: 'Automaticos', image: 'assets/img/sellos/producto-redondo.jpg', icon: 'fa-circle-dot', description: 'Perfecto para logos, aprobaciones y marcas institucionales.' },
    { id: 12, name: 'Sello manual grande', category: 'Manuales', image: 'assets/img/sellos/producto-manual-grande.jpg', icon: 'fa-border-all', description: 'Formato amplio para textos, sellos contables y marcacion visible.' }
  ];

  get filteredProducts(): StampProduct[] {
    if (this.selectedCategory === 'Todos') {
      return this.products;
    }

    return this.products.filter((product) => product.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  openWhatsApp(product: StampProduct): void {
    const text = `Hola, estoy interesado en el producto de sellos: ${product.name}`;
    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
