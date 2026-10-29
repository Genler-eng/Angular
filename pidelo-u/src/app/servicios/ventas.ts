import { Service, computed, signal, effect } from '@angular/core';
import { Producto } from '../modelos/producto';
import { Venta } from '../modelos/venta';

@Service()
export class Ventas {
  private static readonly STORAGE_KEY = 'pidelo_u_ventas';

  private static cargarGuardadas(): Venta[] {
    if (typeof window === 'undefined') {
      return [];
    }
    const datos = localStorage.getItem(Ventas.STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
  }

  private readonly items = signal<Venta[]>(Ventas.cargarGuardadas());

  readonly lista = this.items.asReadonly();
  readonly cantidad = computed(() => this.items().length);
  readonly totalVendido = computed(() =>
    this.items().reduce((suma, v) => suma + v.total, 0)
  );

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(Ventas.STORAGE_KEY, JSON.stringify(this.items()));
      }
    });
  }

  registrar(productos: Producto[], total: number): void {
    const actual = this.items();
    const id = actual.length > 0 ? Math.max(...actual.map(v => v.id)) + 1 : 1;
    const venta: Venta = { id, fecha: new Date().toISOString(), productos, total };
    this.items.update((lista) => [venta, ...lista]); // la más reciente va primero
  }

    limpiar(): void {
    this.items.set([]);
  }
}