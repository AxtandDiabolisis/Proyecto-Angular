import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface LencyCategory {
  name: string;
  count: number;
}

interface LencyProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  whatsappMessage: string;
}

@Component({
  selector: 'app-lenceria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lenceria.component.html',
  styleUrl: './lenceria.component.css'
})
export class LenceriaComponent {
  selectedCategory = 'Todos';
  sortOption = 'latest';
  currentPage = 1;

  categories: LencyCategory[] = [
    { name: 'Todos', count: 16 },
    { name: 'Bano', count: 1 },
    { name: 'Cama', count: 10 },
    { name: 'Infantil', count: 1 },
    { name: 'Sala', count: 2 },
    { name: 'Saldos', count: 2 }
  ];

  products: LencyProduct[] = [
    { id: 1, name: 'Cobija Bebe 1A', category: 'Infantil', image: 'assets/img/lency/producto-cobija-bebe.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cobija Bebe 1A' },
    { id: 2, name: 'Cobija Estrella', category: 'Cama', image: 'assets/img/lency/producto-cobija-estrella.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cobija Estrella' },
    { id: 3, name: 'Cobija Filix', category: 'Cama', image: 'assets/img/lency/producto-cobija-filix.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cobija Filix' },
    { id: 4, name: 'Cobija Galleta', category: 'Cama', image: 'assets/img/lency/producto-cobija-galleta.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cobija Galleta' },
    { id: 5, name: 'Cobija Star Ovejera', category: 'Cama', image: 'assets/img/lency/producto-cobija-star.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cobija Star Ovejera' },
    { id: 6, name: 'Aromas', category: 'Sala', image: 'assets/img/lency/producto-aromas.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Aromas' },
    { id: 7, name: 'Toallas', category: 'Bano', image: 'assets/img/lency/producto-toallas.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Toallas' },
    { id: 8, name: 'Sabana Solo Tono-Casa Luna', category: 'Cama', image: 'assets/img/lency/producto-sabana.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Sabana Solo Tono-Casa Luna' },
    { id: 9, name: 'Cortina Black Out', category: 'Sala', image: 'assets/img/lency/producto-cortina-blackout.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cortina Black Out' },
    { id: 10, name: 'Cobija Termica', category: 'Saldos', image: 'assets/img/lency/producto-cobija-termica.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cobija Termica' },
    { id: 11, name: 'Cubre Cama Infantil', category: 'Cama', image: 'assets/img/lency/producto-cubre-cama-infantil.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cubre Cama Infantil' },
    { id: 12, name: 'Cubre cama', category: 'Saldos', image: 'assets/img/lency/producto-cubre-cama.jpg', whatsappMessage: 'Hola, estoy interesado en el producto: Cubre cama' }
  ];

  get filteredProducts(): LencyProduct[] {
    if (this.selectedCategory === 'Todos') {
      return this.products;
    }

    return this.products.filter((product) => product.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  openWhatsApp(product: LencyProduct): void {
    window.open(`https://wa.me/573203109797?text=${encodeURIComponent(product.whatsappMessage)}`, '_blank', 'noopener');
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
