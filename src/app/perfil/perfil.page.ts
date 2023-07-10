import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../models/users.model';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  username: string = '';
  email: string = '';
  nombre: string = '';
  apellido: string = '';
  tipo: string = '';
  rut: string = '';

  constructor(private router: Router) {}

  ionViewDidEnter() {
    this.username = localStorage.getItem('username')!;
    this.email = localStorage.getItem('email')!;
    this.nombre = JSON.parse(localStorage.getItem('nombre')!);
    this.apellido = JSON.parse(localStorage.getItem('apellido')!);
    this.tipo = localStorage.getItem('tipo')!;
    this.verificarUsuario();
    console.log(this.email);
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

  verificarUsuario(email: string = this.email) {
    if (email == null) {
      this.router.navigate(['/login']);
    }
  } 
}
