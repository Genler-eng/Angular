import { Service, computed, signal, effect } from '@angular/core';
import { Producto } from '../modelos/producto';

@Service()
export class Carrito {
  private static readonly STORAGE_KEY = 'pidelo_u_carrito';

  private static cargarGuardados(): Producto[] {
    // Verificamos si estamos en el navegador antes de usar localStorage
    if (typeof window === 'undefined') {
      return [];
    }
    const datos = localStorage.getItem(Carrito.STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
  }

  private readonly items = signal<Producto[]>(Carrito.cargarGuardados());

  readonly lista = this.items.asReadonly();
  readonly cantidad = computed(() => this.items().length);
  readonly total = computed(() => this.items().reduce((suma, p) => suma + p.precio, 0));

  constructor() {
    effect(() => {
      // Verificamos también en el efecto para evitar errores al renderizar
      if (typeof window !== 'undefined') {
        localStorage.setItem(Carrito.STORAGE_KEY, JSON.stringify(this.items()));
      }
    });
  }

  agregar(producto: Producto): void {
    this.items.update((actual) => [...actual, producto]);
  }

  remover(index: number): void {
    this.items.update((actual) => actual.filter((_, i) => i !== index));
  }

  vaciar(): void {
    this.items.set([]);
  }

  comprar(): void {
    if (this.items().length === 0) return;
    alert(`¡Pedido realizado con éxito! 🎉 Total pagado: $${this.total()}`);
    this.vaciar();
  }
}