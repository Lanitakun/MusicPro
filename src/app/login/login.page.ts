import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users = usuario;
  nombreUsuario = '';
  contrasena = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  iniciarSesion() {
    // Si los campos están vacíos, no se puede iniciar sesión
    if (this.nombreUsuario == '' || this.contrasena == '') {
      this.crearToast('Debes rellenar los campos');
    } else {
      // Se obtiene el usuario desde el nombre de usuario ingresado
      let user = this.users.find(user => user.nombreUsuario == this.nombreUsuario);
      if (user) {
        // Si el usuario existe, se compara la contraseña ingresada con la contraseña del usuario para logearse
        if (user.contrasena == this.contrasena) {
          // Si la contraseña es correcta, se guarda el nombre de usuario en el local storage y se redirige a la página de libros
          localStorage.setItem('usuario', this.nombreUsuario);
          // Se verifica el tipo de usuario para redirigir a la página correspondiente
          if (user.tipoUsuario == 'admin') {
            this.router.navigate(['/tabs']);
          } else {
            this.router.navigate(['tabs']);
          }
        } else {
          this.crearToast('Contraseña incorrecta');
        }
      } else {
        this.crearToast('Usuario no encontrado');
      }
    }
  }

  registrarUsuario() {
    // Se verifica que los campos no estén vacíos
    if (this.nombreUsuario == '' || this.contrasena == '') {
      this.crearToast('Debes rellenar los campos');
    } else {
      // Se verifica que el nombre de usuario no exista
      let user = this.users.find(user => user.nombreUsuario == this.nombreUsuario);
      if (user) {
        this.crearToast('El nombre de usuario ya existe');
      } else {
        // Si el nombre de usuario no existe, se crea el usuario y se guarda en el arreglo de usuarios
        let newUser = {
          id: this.users.length + 1,
          nombreUsuario: this.nombreUsuario,
          contrasena: this.contrasena,
          nombre: '',
          apellido: '',
          email: '',
          tipoUsuario: 'user'
        }
        this.users.push(newUser);
        this.crearToast('Usuario creado correctamente');
        // Se redirige a la página de libros
        this.router.navigate(['login']);
      }
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
