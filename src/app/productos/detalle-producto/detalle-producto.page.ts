import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../productos.model';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  @Input() producto!: Producto;

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }
  

  ngOnInit() {
    localStorage.setItem('selectedProductId', this.producto.id.toString());
    console.log(localStorage.getItem('selectedProductId'));
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async realizarPago() {
    const monto = this.producto.price.replace(/[^0-9]/g, '');
    const datos = {
      monto: monto,
    };
  
    try {
      const url = 'http://localhost:5000/transaccion';
      const resultado = await this.http.post<any>(url, datos).toPromise();
      const token = resultado.token; // Token de la transacción
      const urlPago = resultado.url; // URL de formulario de pago Webpay
      const idLibro = this.producto.id;
      const urlConParametros = urlPago + '?token_ws=' + token;
      // Se redirige a la página externa de pago de Transbank con el token como parámetro
      window.location.replace(urlConParametros);
    } catch (error) {
      console.error(error);
      // Maneja el error adecuadamente
    }
  }
  

}
