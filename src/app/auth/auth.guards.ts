import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.refreshProfile().pipe(
    map((user) => user?.role === 'admin'
      ? true
      : router.createUrlTree(['/cuenta'], { queryParams: { redirect: state.url } }))
  );
};
