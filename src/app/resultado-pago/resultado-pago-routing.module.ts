import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoPagoPage } from './resultado-pago.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoPagoPage
  },
  {
    path: 'error-pago',
    loadChildren: () => import('./error-pago/error-pago.module').then( m => m.ErrorPagoPageModule)
  },
  {
    path: 'pago-exitoso',
    loadChildren: () => import('./pago-exitoso/pago-exitoso.module').then( m => m.PagoExitosoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoPagoPageRoutingModule {}
