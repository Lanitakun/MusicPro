import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/productos.model';

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

  eliminarProducto(producto: Producto) {
    //elimina el producto del carrito, pero solo el que fue seleccionado, si hay uno igual no lo elimina
    this.productos = this.productos.filter(productoCarrito => productoCarrito.id !== producto.id);
  }
}
