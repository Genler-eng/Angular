import { TestBed } from '@angular/core/testing';
import { Historial } from './historial';
import { Ventas } from '../servicios/ventas';

describe('Historial', () => {
  const empanada = { id: 1, nombre: 'Empanada', precio: 2500 };
  const gaseosa = { id: 2, nombre: 'Gaseosa', precio: 3000 };

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Historial],
    }).compileComponents();
  });

  it('muestra un mensaje cuando no hay ventas', async () => {
    const fixture = TestBed.createComponent(Historial);
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Aún no hay ventas');
  });

  it('muestra las ventas registradas', async () => {
    TestBed.inject(Ventas).registrar([empanada], 2500);

    const fixture = TestBed.createComponent(Historial);
    await fixture.whenStable();

    const texto = (fixture.nativeElement as HTMLElement).textContent;
    expect(texto).toContain('Venta #1');
    expect(texto).toContain('Empanada');
  });

  it('muestra el total vendido', async () => {
    const ventas = TestBed.inject(Ventas);
    ventas.registrar([empanada], 2500);
    ventas.registrar([gaseosa], 3000);

    const fixture = TestBed.createComponent(Historial);
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('5500');
  });

  it('borra el historial cuando el usuario confirma', async () => {
    window.confirm = () => true;
    const ventas = TestBed.inject(Ventas);
    ventas.registrar([empanada], 2500);

    const fixture = TestBed.createComponent(Historial);
    await fixture.whenStable();

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.borrar')!.click();

    expect(ventas.cantidad()).toBe(0);
  });

  it('no borra nada cuando el usuario cancela', async () => {
    window.confirm = () => false;
    const ventas = TestBed.inject(Ventas);
    ventas.registrar([empanada], 2500);

    const fixture = TestBed.createComponent(Historial);
    await fixture.whenStable();

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.borrar')!.click();

    expect(ventas.cantidad()).toBe(1);
  });

  it('elimina solo la venta elegida cuando el usuario confirma', async () => {
    window.confirm = () => true;
    const ventas = TestBed.inject(Ventas);
    ventas.registrar([empanada], 2500);
    ventas.registrar([gaseosa], 3000);

    const fixture = TestBed.createComponent(Historial);
    await fixture.whenStable();

    // la primera tarjeta es la más reciente: la venta #2
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.eliminar')!.click();

    expect(ventas.cantidad()).toBe(1);
    expect(ventas.lista()[0].id).toBe(1);
    expect(ventas.totalVendido()).toBe(2500);
  });

  it('no elimina la venta cuando el usuario cancela', async () => {
    window.confirm = () => false;
    const ventas = TestBed.inject(Ventas);
    ventas.registrar([empanada], 2500);

    const fixture = TestBed.createComponent(Historial);
    await fixture.whenStable();

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.eliminar')!.click();

    expect(ventas.cantidad()).toBe(1);
  });
});