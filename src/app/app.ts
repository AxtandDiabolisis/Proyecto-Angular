import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CartWidgetComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly showCart = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => !['/tufting', '/tufting/diseno'].includes(event.urlAfterRedirects.split('?')[0].split('#')[0]))
    ),
    { initialValue: true }
  );

  constructor() {
    this.auth.refreshProfile().subscribe();
  }

  signOut(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/principal');
  }
}
