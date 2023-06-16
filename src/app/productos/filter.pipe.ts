import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../productos/productos.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(productos: Producto[], searchTerm: string): Producto[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return productos; // Retorna todos los productos si no hay término de búsqueda
    }

    // Filtra los productos según el término de búsqueda
    searchTerm = searchTerm.toLowerCase();
    return productos.filter((producto: Producto) => {
      return (
        producto.name.toLowerCase().includes(searchTerm) ||
        producto.brand.toLowerCase().includes(searchTerm)
      );
    });
  }
}
