import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resultado-pago',
  templateUrl: './resultado-pago.page.html',
  styleUrls: ['./resultado-pago.page.scss'],
})
export class ResultadoPagoPage{

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token_ws'];
      const tbk_token = params['TBK_TOKEN'];
      localStorage.setItem('token', token);
      this.procesarPagoExitoso(token);
    });
  }

  async procesarPagoExitoso(token: string) {
    const url = 'http://localhost:5000/resultado';
    try {
      const resultado = await lastValueFrom(this.http.post<any>(url, { token }));
      if (resultado.status === 'FAILED') {
        // El pago fue rechazado o hubo un error
        this.router.navigate(['/resultado-pago/error-pago']);
        alert('No se pudo procesar el pago');
      } else {
        // El pago fue exitoso
        this.router.navigate(['/resultado-pago/pago-exitoso']);
        //se espera a que se cargue la pagina para mostrar el mensaje
        localStorage.setItem('accounting_date', resultado.accounting_date);
        setTimeout(() => {
          this.mostrarToast('Pago realizado con éxito');
        }, 1000);
      }
    } catch (error) {
      this.router.navigate(['/resultado-pago/error-pago']);
      this.mostrarToast('No se pudo procesar el pago');
    }
  }

  public async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom' // Posición del toast ('top', 'bottom', 'middle')
    });
  
    await toast.present();
  }
}