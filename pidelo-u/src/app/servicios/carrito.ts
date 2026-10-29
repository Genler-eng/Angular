import { Service, computed, signal, effect, inject } from '@angular/core'; // 1) agregaste inject
import { Producto } from '../modelos/producto';
import { Ventas } from './ventas';                                         // 2) import nuevo

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
  private readonly ventas = inject(Ventas);                                // 3) propiedad nueva

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

  comprar(): void {                                                        // 4) método cambiado
    if (this.items().length === 0) return;
    this.ventas.registrar(this.items(), this.total()); // primero se guarda la venta
    alert(`¡Pedido realizado con éxito! 🎉 Total pagado: $${this.total()}`);
    this.vaciar();                                     // y después se vacía
  }
}