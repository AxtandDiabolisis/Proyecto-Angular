import { Routes } from '@angular/router';
import { adminGuard } from './auth/auth.guards';

export const routes: Routes = [
  { path: 'principal', loadComponent: () => import('./principal/principal.component').then((module) => module.PrincipalComponent) },
  { path: 'cuenta', loadComponent: () => import('./auth/auth.component').then((module) => module.AuthComponent) },
  { path: 'sellos', loadComponent: () => import('./sellos/sellos.component').then((module) => module.SellosComponent) },
  { path: 'lenceria', loadComponent: () => import('./lenceria/lenceria.component').then((module) => module.LenceriaComponent), canActivate: [adminGuard] },
  { path: 'ferreteria', loadComponent: () => import('./ferreteria/ferreteria.component').then((module) => module.FerreteriaComponent), canActivate: [adminGuard] },
  { path: 'metricas', loadComponent: () => import('./metricas/metricas.component').then((module) => module.MetricasComponent), canActivate: [adminGuard] },
  { path: 'administracion', loadComponent: () => import('./admin/admin.component').then((module) => module.AdminComponent), canActivate: [adminGuard] },
  { path: 'tufting/diseno', loadComponent: () => import('./tufting-diseno/tufting-diseno.component').then((module) => module.TuftingDisenoComponent) },
  { path: 'tufting', loadComponent: () => import('./tufting/tufting.component').then((module) => module.TuftingComponent) },
  { path: '**', redirectTo: 'principal' }
];
