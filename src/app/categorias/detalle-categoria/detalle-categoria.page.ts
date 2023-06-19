import { Categoria } from './../categorias.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/productos/productos.model';
import { DetalleProductoPage } from 'src/app/productos/detalle-producto/detalle-producto.page';
import { CarritoPage } from 'src/app/carrito/carrito.page';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.page.html',
  styleUrls: ['./detalle-categoria.page.scss'],
})
export class DetalleCategoriaPage implements OnInit {
  productos: Producto[] = [];
  categoria: Categoria;
  todosLosProductos: Producto[] = [];

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    private navParams: NavParams
  ) {
    this.categoria = this.navParams.get('categoria');
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  obtenerProductos() {
    this.http.get<Producto[]>(`https://musicprosolutions.tech/backend/api/product/?category=${this.categoria.name}`).subscribe(
      (data) => {
        this.productos = data;
        this.todosLosProductos = data; // Almacena todos los productos en el array todosLosProductos
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async seleccionarProducto(producto: Producto) {
    const modal = await this.modalController.create({
      component: DetalleProductoPage,
      componentProps: {
        producto: producto
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
