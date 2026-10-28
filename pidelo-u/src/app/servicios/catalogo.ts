import { Injectable, signal, effect } from '@angular/core';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class Catalogo {
  private static readonly STORAGE_KEY = 'pidelo_u_catalogo';

  private static cargarGuardados(): Producto[] {
    // Verificamos si estamos en el navegador
    if (typeof window === 'undefined') {
      return [
        { id: 1, nombre: 'Empanada', precio: 2500 },
        { id: 2, nombre: 'Gaseosa', precio: 3000 },
        { id: 3, nombre: 'Jugo Natural', precio: 3500 },
      ];
    }
    const datos = localStorage.getItem(Catalogo.STORAGE_KEY);
    return datos ? JSON.parse(datos) : [
      { id: 1, nombre: 'Empanada', precio: 2500 },
      { id: 2, nombre: 'Gaseosa', precio: 3000 },
      { id: 3, nombre: 'Jugo Natural', precio: 3500 },
    ];
  }

  private readonly productos = signal<Producto[]>(Catalogo.cargarGuardados());

  readonly todos = this.productos.asReadonly();

  constructor() {
    // Sincroniza automáticamente los cambios del catálogo con localStorage
    effect(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(Catalogo.STORAGE_KEY, JSON.stringify(this.productos()));
      }
    });
  }

  agregarProducto(nuevo: Omit<Producto, 'id'>): void {
    // Generamos un ID único seguro basándonos en el tamaño o el máximo ID existente
    const actual = this.productos();
    const id = actual.length > 0 ? Math.max(...actual.map(p => p.id)) + 1 : 1;
    this.productos.update((lista) => [...lista, { id, ...nuevo }]);
  }
}