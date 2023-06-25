import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../models/users.model';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  nombreUsuario: string = '';
  usuarioLogueado: any; // Variable para almacenar la información del usuario logeado

  constructor(private router: Router) {}

  ionViewDidEnter() {
    // Verificar si el usuario está logueado cada vez que se muestra la página de perfil
    this.verificarUsuario();
  }

  cerrarSesion() {
    // Eliminar el usuario del localStorage, asignar false a isLogged y redirigir a la página de inicio
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  verificarUsuario() {
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      // Si el usuario está logueado, obtener la información del usuario
      this.usuarioLogueado = usuario.find(user => user.nombreUsuario === usuarioLogueado);
      this.nombreUsuario = usuarioLogueado;
    } else {
      // Si el usuario no está logueado, redirigir a la página de login
      this.router.navigate(['/login']);
    }
  }
}
