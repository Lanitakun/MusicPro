import { Component } from '@angular/core';
import { Producto } from '../models/productos.model';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { DetalleProductoPage } from './detalle-producto/detalle-producto.page';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-productos',
  templateUrl: 'productos.page.html',
  styleUrls: ['productos.page.scss']
})
export class ProductosPage {
  searchTerm: string = '';
  searchQuery: string = '';

  productos: Producto[] = [];
  mostrarListaProductos: boolean = false;
  todosLosProductos: Producto[] = []; // Nueva propiedad agregada

  isLoadingProductos = false;

  
  constructor(private http: HttpClient, private modalController: ModalController) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.http.get<Producto[]>('https://musicprosolutions.tech/backend/api/product/').subscribe(
      (data) => {
        this.productos = data;
        this.todosLosProductos = data; // Asignar el valor de 'data' a 'todosLosProductos'
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarLista() {
    this.mostrarListaProductos = !this.mostrarListaProductos;
  }

  ocultarLista() {
    this.mostrarListaProductos = false;
  }

  buscarProductos(event: any) {
    this.searchTerm = event?.target?.value || '';

    if (this.searchTerm) {
      this.productos = this.filterProductos(this.searchTerm);
    } else {
      this.productos = this.todosLosProductos;
    }
  }

  filterProductos(searchTerm: string): Producto[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return this.productos; // Retorna todos los productos si no hay término de búsqueda
    }

    // Filtra los productos según el término de búsqueda
    searchTerm = searchTerm.toLowerCase();
    return this.productos.filter((producto: Producto) => {
      return (
        producto.name.toLowerCase().includes(searchTerm) ||
        producto.brand.toLowerCase().includes(searchTerm)
      );
    });
  }

  seleccionarProducto(producto: Producto) {
    // función para seleccionar un producto de la lista del searchbar
  }

  async verProducto(producto: Producto) {
    const modal = await this.modalController.create({
      component: DetalleProductoPage,
      componentProps: {
        producto: producto
      }
    });
    return await modal.present();
    
  }

  async irAlCarrito() {
    const modal = await this.modalController.create({
      component: CarritoPage,
      componentProps: {
        // Puedes pasar cualquier dato adicional al componente modal si es necesario
      }
    });
  
    await modal.present();
  }

  
  
  
}
