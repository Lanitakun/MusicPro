import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ResultadoPagoPage } from './resultado-pago/resultado-pago.page';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detalle-producto',
    loadChildren: () => import('./productos/detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'resultado-pago',
    loadChildren: () => import('./resultado-pago/resultado-pago.module').then( m => m.ResultadoPagoPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'detalle-categoria',
    loadChildren: () => import('./categorias/detalle-categoria/detalle-categoria.module').then( m => m.DetalleCategoriaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) // Agregar esta línea
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
