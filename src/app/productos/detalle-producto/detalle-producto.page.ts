import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/productos.model';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CarritoPage } from 'src/app/carrito/carrito.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  @Input() producto!: Producto;
  stocks: any[] = []; // Variable para almacenar los datos de stock

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    private carritoService: CarritoService,
    public toastController: ToastController,
  ) { }
  

  ngOnInit() {
    localStorage.setItem('selectedProductId', this.producto.id.toString());
    this.obtenerStock();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async realizarPago() {
    const monto = this.producto.price.toString().replace(/[^0-9]/g, '');
    const datos = {
      monto: monto,
    };
  
    try {
      const url = 'http://localhost:5000/transaccion';
      console.log(url,datos);
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

  agregarAlCarrito() {
    this.carritoService.agregarProducto(this.producto);
    this.mostrarToast(`${this.producto.name} agregado al carrito`);
  }

  async irAlCarrito() {
    const modal = await this.modalController.create({
      component: CarritoPage,
      componentProps: {
      }
    });
  
    await modal.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom' // Posición del toast ('top', 'bottom', 'middle')
    });
  
    await toast.present();
  }

  async obtenerStock() {
    try {
      const idProducto = this.producto.id;
      const url = `https://musicprosolutions.tech/backend/api/product_stock/${idProducto}`;
      const response = await this.http.get<any>(url).toPromise();
      this.stocks = response.stocks; // Asignar los datos de stock a la variable
      console.log(this.stocks);
    } catch (error) {
      console.error(error);
      // Maneja el error adecuadamente
    }
  }
  
}
