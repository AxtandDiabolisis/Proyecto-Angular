import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface ToolCategory {
  name: string;
  count: number;
}

interface ToolProduct {
  id: number;
  name: string;
  category: string;
  icon: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-ferreteria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ferreteria.component.html',
  styleUrl: './ferreteria.component.css'
})
export class FerreteriaComponent {
  selectedCategory = 'Todos';
  sortOption = 'latest';
  currentPage = 1;

  categories: ToolCategory[] = [
    { name: 'Todos', count: 12 },
    { name: 'Electricas', count: 3 },
    { name: 'Manuales', count: 3 },
    { name: 'Construccion', count: 2 },
    { name: 'Insumos', count: 2 },
    { name: 'Seguridad', count: 2 }
  ];

  products: ToolProduct[] = [
    {
      id: 1,
      name: 'Taladros y rotomartillos',
      category: 'Electricas',
      icon: 'fa-screwdriver-wrench',
      description: 'Equipos para perforacion, instalacion y trabajo pesado.',
      image: 'assets/img/ferreteria/producto-taladro.jpg'
    },
    {
      id: 2,
      name: 'Llaves y copas',
      category: 'Manuales',
      icon: 'fa-wrench',
      description: 'Soluciones resistentes para ajuste, mantenimiento y taller.',
      image: 'assets/img/ferreteria/producto-llaves.jpg'
    },
    {
      id: 3,
      name: 'Pinturas y acabados',
      category: 'Construccion',
      icon: 'fa-paint-roller',
      description: 'Insumos para renovar muros, madera, metal y exteriores.',
      image: 'assets/img/ferreteria/producto-pinturas.jpg'
    },
    {
      id: 4,
      name: 'Tornilleria y fijaciones',
      category: 'Insumos',
      icon: 'fa-screwdriver',
      description: 'Tornillos, anclajes, puntillas y accesorios por medida.',
      image: 'assets/img/ferreteria/producto-tornilleria.jpg'
    },
    {
      id: 5,
      name: 'Seguridad industrial',
      category: 'Seguridad',
      icon: 'fa-helmet-safety',
      description: 'Guantes, gafas, cascos y elementos para trabajar protegido.',
      image: 'assets/img/ferreteria/producto-seguridad.jpg'
    },
    {
      id: 6,
      name: 'Electricidad y plomeria',
      category: 'Construccion',
      icon: 'fa-plug',
      description: 'Materiales para reparaciones rapidas y proyectos completos.',
      image: 'assets/img/ferreteria/producto-electricidad.jpg'
    },
    {
      id: 7,
      name: 'Martillos y alicates',
      category: 'Manuales',
      icon: 'fa-hammer',
      description: 'Herramientas basicas para instalacion, ajuste y reparacion.',
      image: 'assets/img/ferreteria/producto-martillos.jpg'
    },
    {
      id: 8,
      name: 'Pulidoras y sierras',
      category: 'Electricas',
      icon: 'fa-gear',
      description: 'Equipos para corte, desbaste y acabados en obra.',
      image: 'assets/img/ferreteria/producto-pulidoras.jpg'
    },
    {
      id: 9,
      name: 'Brocas y discos',
      category: 'Insumos',
      icon: 'fa-compact-disc',
      description: 'Consumibles para perforar, cortar y pulir diferentes superficies.',
      image: 'assets/img/ferreteria/producto-brocas.jpg'
    },
    {
      id: 10,
      name: 'Guantes y gafas',
      category: 'Seguridad',
      icon: 'fa-shield-halved',
      description: 'Proteccion personal para trabajos de taller y construccion.',
      image: 'assets/img/ferreteria/producto-guantes.jpg'
    },
    {
      id: 11,
      name: 'Destornilladores',
      category: 'Manuales',
      icon: 'fa-screwdriver',
      description: 'Juegos practicos para ensamble, mantenimiento y hogar.',
      image: 'assets/img/ferreteria/producto-destornilladores.jpg'
    },
    {
      id: 12,
      name: 'Extensiones y multitomas',
      category: 'Electricas',
      icon: 'fa-plug-circle-bolt',
      description: 'Accesorios electricos para obra, taller y oficina.',
      image: 'assets/img/ferreteria/producto-extensiones.jpg'
    }
  ];

  get filteredProducts(): ToolProduct[] {
    if (this.selectedCategory === 'Todos') {
      return this.products;
    }

    return this.products.filter((product) => product.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  openWhatsApp(productName: string): void {
    const text = `Hola, estoy interesado en productos de ferreteria: ${productName}`;
    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
