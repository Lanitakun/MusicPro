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
      },
      (error) => {
        console.log(error);
      }
    );
    //se agrega la fecha de compra almacenada en el local storage al html en el id #fecha
    document.getElementById('fecha')!.innerHTML = localStorage.getItem('accounting_date')!;
    //se da formato a la fecha que llega en este formato 'MMDD' a 'MM/DD'
    let fecha = document.getElementById('fecha')!.innerHTML;
    let mes = fecha.substring(0, 2);
    let dia = fecha.substring(2, 4);
    document.getElementById('fecha')!.innerHTML = dia + '/' + mes;
  }
  
  buscarProductoSeleccionado() {
    this.productoSeleccionado = this.productos.find(producto => producto.id === this.productoId);
  }
  
  
  
}
