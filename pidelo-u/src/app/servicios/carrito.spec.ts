import { TestBed } from '@angular/core/testing';
import { Carrito } from './carrito';
import { Ventas } from './ventas';

describe('Carrito', () => {
  let carrito: Carrito;
  let ventas: Ventas;

  beforeEach(() => {
    localStorage.clear();
    window.alert = () => {}; // en pruebas no hay ventana que muestre la alerta
    TestBed.configureTestingModule({});
    carrito = TestBed.inject(Carrito);
    ventas = TestBed.inject(Ventas);
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

  it('al comprar registra la venta y vacía el carrito', () => {
    carrito.agregar({ id: 1, nombre: 'Empanada', precio: 2500 });
    carrito.agregar({ id: 2, nombre: 'Gaseosa', precio: 3000 });

    carrito.comprar();

    expect(ventas.cantidad()).toBe(1);
    expect(ventas.totalVendido()).toBe(5500);
    expect(ventas.lista()[0].productos.length).toBe(2);
    expect(carrito.cantidad()).toBe(0);
  });

  it('no registra nada si el carrito está vacío', () => {
    carrito.comprar();
    expect(ventas.cantidad()).toBe(0);
  });
});