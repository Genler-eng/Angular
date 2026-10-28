import { Injectable, signal } from '@angular/core';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class Catalogo {
  private readonly productos = signal<Producto[]>([
    { id: 1, nombre: 'Empanada', precio: 2500 },
    { id: 2, nombre: 'Gaseosa', precio: 3000 },
    { id: 3, nombre: 'Jugo Natural', precio: 3500 },
  ]);

  readonly todos = this.productos.asReadonly();

  // Método para agregar un nuevo producto al catálogo
  agregarProducto(nuevo: Omit<Producto, 'id'>): void {
    const id = this.productos().length + 1;
    this.productos.update((actual) => [...actual, { id, ...nuevo }]);
  }
}