import { TestBed } from '@angular/core/testing';
import { Resumen } from './resumen';
import { Carrito } from '../servicios/carrito';

describe('Resumen', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Resumen],
    }).compileComponents();
  });

  it('quita un producto cuando ItemPedido avisa', async () => {
    const carrito = TestBed.inject(Carrito);
    carrito.agregar({ id: 1, nombre: 'Empanada', precio: 2500 });

    const fixture = TestBed.createComponent(Resumen);
    await fixture.whenStable();
    expect(carrito.cantidad()).toBe(1);

    (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLButtonElement>('app-item-pedido button')!
      .click();

    expect(carrito.cantidad()).toBe(0);
  });
});