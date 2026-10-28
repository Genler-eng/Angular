import { TestBed } from '@angular/core/testing';
import { Carrito } from './carrito';

describe('Carrito', () => {
  let carrito: Carrito;

  beforeEach(() => {
    localStorage.clear(); // tu carrito lee localStorage al crearse
    TestBed.configureTestingModule({});
    carrito = TestBed.inject(Carrito);
  });

  it('empieza vacío', () => {
    expect(carrito.cantidad()).toBe(0);
    expect(carrito.total()).toBe(0);
  });

  it('al agregar dos productos, cuenta y suma bien', () => {
    carrito.agregar({ id: 1, nombre: 'Empanada', precio: 2500 });
    carrito.agregar({ id: 2, nombre: 'Gaseosa', precio: 3000 });

    expect(carrito.cantidad()).toBe(2);
    expect(carrito.total()).toBe(5500);
  });
});
