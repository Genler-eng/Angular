import { TestBed } from '@angular/core/testing';
import { Historial } from './historial';
import { Ventas } from '../servicios/ventas';

describe('Historial', () => {
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
    TestBed.inject(Ventas).registrar([{ id: 1, nombre: 'Empanada', precio: 2500 }], 2500);

    const fixture = TestBed.createComponent(Historial);
    await fixture.whenStable();

    const texto = (fixture.nativeElement as HTMLElement).textContent;
    expect(texto).toContain('Venta #1');
    expect(texto).toContain('Empanada');
    expect(texto).toContain('2500');
  });
});