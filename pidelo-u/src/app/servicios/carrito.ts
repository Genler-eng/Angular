import { Injectable, computed, signal } from '@angular/core';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class Carrito {
  private readonly items = signal<Producto[]>([]);

  readonly lista = this.items.asReadonly();
  readonly cantidad = computed(() => this.items().length);
  readonly total = computed(() => this.items().reduce((suma, p) => suma + p.precio, 0));

  agregar(producto: Producto): void {
    this.items.update((actual) => [...actual, producto]);
  }

  // Nuevo método para quitar un producto según su posición (índice)
  remover(index: number): void {
    this.items.update((actual) => actual.filter((_, i) => i !== index));
  }

  vaciar(): void {
    this.items.set([]);
  }
}