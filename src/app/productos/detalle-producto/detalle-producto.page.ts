import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from '../productos.model';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  @Input() producto!: Producto;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
