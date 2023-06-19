import { Injectable } from '@angular/core';
import { Producto } from 'src/app/productos/productos.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  productos: Producto[] = [];

  constructor() { }

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
  }

  obtenerCarrito() {
    return this.productos;
  }

  vaciarCarrito() {
    this.productos = [];
  }
}
