import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { FilterPipe } from './filter.pipe'; // Importa la tubería de filtro personalizada

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule
  ],
  declarations: [
    ProductosPage,
    FilterPipe // Agrega la tubería de filtro personalizada a las declaraciones
  ]
})
export class ProductosPageModule {}
