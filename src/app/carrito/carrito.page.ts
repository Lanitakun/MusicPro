import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoService } from '../servicios/carrito.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private carritoService: CarritoService,
    public toastController: ToastController,
    private http: HttpClient,
  ) { 
    this.productosCarrito = this.carritoService.obtenerCarrito();
    this.calcularTotal();
  }

  productosCarrito = this.carritoService.obtenerCarrito();
  total = 0;

  ngOnInit() {
    this.productosCarrito = this.carritoService.obtenerCarrito();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async realizarPago() {
    const monto = this.total.toString().replace(/[^0-9]/g, '');
    const datos = {
      monto: monto,
    };
  
    try {
      const url = 'http://localhost:5000/transaccion';
      const resultado = await this.http.post<any>(url, datos).toPromise();
      const token = resultado.token; // Token de la transacción
      const urlPago = resultado.url; // URL de formulario de pago Webpay
      const urlConParametros = urlPago + '?token_ws=' + token;
      // Se redirige a la página externa de pago de Transbank con el token como parámetro
      window.location.replace(urlConParametros);
    } catch (error) {
      console.error(error);
      // Maneja el error adecuadamente
    }
  }
  

  calcularTotal() {
    this.total = 0;
    this.productosCarrito.forEach(producto => {
      const precio = parseInt(producto.price.replace(/[^0-9]/g, ''));
      this.total += precio;
    });
  }
  

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom' // Posición del toast ('top', 'bottom', 'middle')
    });
  
    await toast.present();
  }
  

}
