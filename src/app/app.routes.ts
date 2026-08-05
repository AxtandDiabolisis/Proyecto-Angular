import { Routes } from '@angular/router';
import { FerreteriaComponent } from './ferreteria/ferreteria.component';
import { LenceriaComponent } from './lenceria/lenceria.component';
import { MetricasComponent } from './metricas/metricas.component';
import { PrincipalComponent } from './principal/principal.component';
import { SellosComponent } from './sellos/sellos.component';
import { TuftingComponent } from './tufting/tufting.component';

export const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: 'sellos', component: SellosComponent },
  { path: 'lenceria', component: LenceriaComponent },
  { path: 'ferreteria', component: FerreteriaComponent },
  { path: 'metricas', component: MetricasComponent },
  { path: 'tufting', component: TuftingComponent },
  { path: '**', redirectTo: 'principal' }
];
