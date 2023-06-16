import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/productos/productos.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.page.html',
  styleUrls: ['./pago-exitoso.page.scss'],
})
export class PagoExitosoPage implements OnInit {
  productoId: number = 0;
  productos: Producto[] = [];
  productoSeleccionado: Producto | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const productoIdString = localStorage.getItem('selectedProductId');
    this.productoId = parseInt(productoIdString || '0', 10);
  
    this.obtenerProductos();
  }
  
  obtenerProductos() {
    this.http.get<Producto[]>('https://musicprosolutions.tech/backend/api/product/').subscribe(
      (data) => {
        this.productos = data;
        this.buscarProductoSeleccionado();
        console.log(this.productoSeleccionado);
        console.log(this.productoId);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  buscarProductoSeleccionado() {
    this.productoSeleccionado = this.productos.find(producto => producto.id === this.productoId);
  }
  
  
  
}
