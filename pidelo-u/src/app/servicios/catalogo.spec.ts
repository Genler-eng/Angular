import { TestBed } from '@angular/core/testing';
import { Catalogo } from './catalogo';

describe('Catalogo', () => {
  let catalogo: Catalogo;

  beforeEach(() => {
    localStorage.clear(); // así arranca con los tres productos iniciales
    TestBed.configureTestingModule({});
    catalogo = TestBed.inject(Catalogo);
  });

  it('should be created', () => {
    expect(catalogo).toBeTruthy();
  });

  it('edita el nombre y el precio sin cambiar el id', () => {
    catalogo.editarProducto(1, { nombre: 'Empanada grande', precio: 3000 });

    const producto = catalogo.todos().find((p) => p.id === 1);
    expect(producto).toEqual({ id: 1, nombre: 'Empanada grande', precio: 3000 });
  });

  it('elimina un producto', () => {
    const antes = catalogo.todos().length;

    catalogo.eliminarProducto(1);

    expect(catalogo.todos().length).toBe(antes - 1);
    expect(catalogo.todos().some((p) => p.id === 1)).toBe(false);
  });
});
