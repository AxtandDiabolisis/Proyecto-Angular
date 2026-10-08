import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  mode: 'login' | 'register' = 'login';
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  submitting = false;

  ngOnInit(): void {
    this.auth.refreshProfile().subscribe();
  }

  selectMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.errorMessage = '';
  }

  submit(): void {
    if (this.submitting) return;
    this.errorMessage = '';
    this.submitting = true;
    const request = this.mode === 'register'
      ? this.auth.register({ name: this.name.trim(), email: this.email.trim(), password: this.password })
      : this.auth.login({ email: this.email.trim(), password: this.password });

    request.subscribe({
      next: (session) => {
        this.submitting = false;
        this.password = '';
        const requestedUrl = this.route.snapshot.queryParamMap.get('redirect');
        const destination = session.user.role === 'admin'
          ? (requestedUrl?.startsWith('/') && !requestedUrl.startsWith('//') ? requestedUrl : '/metricas')
          : '/cuenta';
        void this.router.navigateByUrl(destination);
      },
      error: (error) => {
        this.submitting = false;
        this.errorMessage = error.status === 0
          ? 'No se pudo conectar con el servidor. Inténtalo más tarde.'
          : error.error?.detail || 'No se pudo completar el acceso.';
      }
    });
  }

  signOut(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/principal');
  }
}
