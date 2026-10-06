import { Routes } from '@angular/router';
import { FerreteriaComponent } from './ferreteria/ferreteria.component';
import { LenceriaComponent } from './lenceria/lenceria.component';
import { MetricasComponent } from './metricas/metricas.component';
import { PrincipalComponent } from './principal/principal.component';
import { SellosComponent } from './sellos/sellos.component';

export const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: 'sellos', component: SellosComponent },
  { path: 'lenceria', component: LenceriaComponent },
  { path: 'ferreteria', component: FerreteriaComponent },
  { path: 'metricas', component: MetricasComponent },
  { path: 'tufting/diseno', loadComponent: () => import('./tufting-diseno/tufting-diseno.component').then((module) => module.TuftingDisenoComponent) },
  { path: 'tufting', loadComponent: () => import('./tufting/tufting.component').then((module) => module.TuftingComponent) },
  { path: '**', redirectTo: 'principal' }
];
