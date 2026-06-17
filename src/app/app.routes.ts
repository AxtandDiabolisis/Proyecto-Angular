import { Routes } from '@angular/router';
import { FerreteriaComponent } from './ferreteria/ferreteria.component';
import { LenceriaComponent } from './lenceria/lenceria.component';
import { SellosComponent } from './sellos/sellos.component';

export const routes: Routes = [
  { path: '', component: SellosComponent },
  { path: 'lenceria', component: LenceriaComponent },
  { path: 'ferreteria', component: FerreteriaComponent },
  { path: '**', redirectTo: '' }
];
