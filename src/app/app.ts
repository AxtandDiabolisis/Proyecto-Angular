import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartWidgetComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);
  readonly showCart = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => !['/tufting', '/tufting/diseno'].includes(event.urlAfterRedirects.split('?')[0].split('#')[0]))
    ),
    { initialValue: true }
  );
}
