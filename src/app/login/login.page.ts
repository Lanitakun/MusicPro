import { HttpClient, HttpResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  apiUrl = 'https://musicprosolutions.tech/backend/api/login';  // Esto va en variables de entorno pero por simplicidad lo dejo aquí
  email = '';
  contrasena = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  iniciarSesion() {
    if (this.email === '' || this.contrasena === '') {
      this.crearToast('Debes rellenar los campos');
    } else {
      const body = {
        email: this.email,
        password: this.contrasena,
      };

      this.http.post(this.apiUrl, body, { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.body != "Usuario Invalido"){
            if (response.body != "Password incorrecta") {
              // Autenticación exitosa, guardar datos en el almacenamiento local o servicio de autenticación
              localStorage.setItem('username', JSON.stringify(response.body.username));
              localStorage.setItem('email', JSON.stringify(response.body.email))
              localStorage.setItem('nombre', JSON.stringify(response.body.nombre))
              localStorage.setItem('apellido', JSON.stringify(response.body.apellido))
              localStorage.setItem('tipo', JSON.stringify(response.body.tipo))
              this.router.navigate(['/tabs']);
              console.log(response.body);
            } else {
              // Autenticación fallida
              this.crearToast('Contraseña incorrecta');
              
            }
          } else {
            this.crearToast('Usuario no registrado');
          }
        },
        (error) => {
          console.log(error);
          this.crearToast('Ha ocurrido un error');
        }
      );
    }
  }

  async crearToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
