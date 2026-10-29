import { TestBed } from '@angular/core/testing';
import { Ventas } from './ventas';

describe('Ventas', () => {
  let ventas: Ventas;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    ventas = TestBed.inject(Ventas);
  });

  it('empieza sin ventas', () => {
    expect(ventas.cantidad()).toBe(0);
    expect(ventas.totalVendido()).toBe(0);
  });

  it('registra ventas, las cuenta y suma el total vendido', () => {
    ventas.registrar([{ id: 1, nombre: 'Empanada', precio: 2500 }], 2500);
    ventas.registrar([{ id: 2, nombre: 'Gaseosa', precio: 3000 }], 3000);

    expect(ventas.cantidad()).toBe(2);
    expect(ventas.totalVendido()).toBe(5500);
    expect(ventas.lista()[0].id).toBe(2); // la más reciente va primero
  });
});