import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}

  ionViewDidEnter() {
    // Verificar si el usuario está logueado al cargar la página
    const usuarioLogueado = localStorage.getItem('usuario');
    if (!usuarioLogueado) {
      // Si el usuario no está logueado, redirigir a la página de login
      this.router.navigate(['/login']);
    }
  }
}
