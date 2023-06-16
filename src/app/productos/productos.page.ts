import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: 'productos.page.html',
  styleUrls: ['productos.page.scss']
})
export class ProductosPage {

  mostrarListaProductos: boolean = false;
  
  constructor() {}

  mostrarLista() {
    this.mostrarListaProductos = !this.mostrarListaProductos;
  }

  ocultarLista() {
    this.mostrarListaProductos = false;
  }

  buscarProductos(event: any) {
  }




}
