import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categorias.model';
import { ModalController } from '@ionic/angular';
import { DetalleCategoriaPage } from './detalle-categoria/detalle-categoria.page';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-categorias',
  templateUrl: 'categorias.page.html',
  styleUrls: ['categorias.page.scss']
})
export class CategoriasPage {

  categoria: Categoria[] = [];
  todasLasCategorias: Categoria[] = []; // Variable para almacenar todas las categorías

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.http.get<Categoria[]>('https://musicprosolutions.tech/backend/api/category/').subscribe(
      (data) => {
        this.categoria = data;
        this.todasLasCategorias = data; // Asignar el valor de 'data' a 'todasLasCategorias'
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async seleccionarCategoria(categoria: Categoria) {
    const modal = await this.modalController.create({
      component: DetalleCategoriaPage,
      componentProps: {
        categoria: categoria
      }
    });
    return await modal.present();
  }

  async irAlCarrito() {
    const modal = await this.modalController.create({
      component: CarritoPage,
      componentProps: {
        // Puedes pasar cualquier dato adicional al componente modal si es necesario
      }
    });
  
    await modal.present();
  }
}
