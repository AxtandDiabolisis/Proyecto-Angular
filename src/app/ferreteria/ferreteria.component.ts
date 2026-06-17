import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ToolProduct {
  name: string;
  category: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-ferreteria',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ferreteria.component.html',
  styleUrl: './ferreteria.component.css'
})
export class FerreteriaComponent {
  products: ToolProduct[] = [
    {
      name: 'Taladros y rotomartillos',
      category: 'Herramienta electrica',
      icon: 'fa-screwdriver-wrench',
      description: 'Equipos para perforacion, instalacion y trabajo pesado.'
    },
    {
      name: 'Llaves y copas',
      category: 'Herramienta manual',
      icon: 'fa-wrench',
      description: 'Soluciones resistentes para ajuste, mantenimiento y taller.'
    },
    {
      name: 'Pinturas y acabados',
      category: 'Construccion',
      icon: 'fa-paint-roller',
      description: 'Insumos para renovar muros, madera, metal y exteriores.'
    },
    {
      name: 'Tornilleria y fijaciones',
      category: 'Insumos',
      icon: 'fa-screwdriver',
      description: 'Tornillos, anclajes, puntillas y accesorios por medida.'
    },
    {
      name: 'Seguridad industrial',
      category: 'Proteccion',
      icon: 'fa-helmet-safety',
      description: 'Guantes, gafas, cascos y elementos para trabajar protegido.'
    },
    {
      name: 'Electricidad y plomeria',
      category: 'Instalacion',
      icon: 'fa-plug',
      description: 'Materiales para reparaciones rapidas y proyectos completos.'
    }
  ];

  openWhatsApp(productName: string): void {
    const text = `Hola, estoy interesado en productos de ferreteria: ${productName}`;
    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
}
