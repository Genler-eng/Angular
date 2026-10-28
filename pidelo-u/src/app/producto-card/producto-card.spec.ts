import { TestBed } from '@angular/core/testing';
import { ProductoCard } from './producto-card';

describe('ProductoCard', () => {
  const empanada = { id: 1, nombre: 'Empanada', precio: 2500 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCard],
    }).compileComponents();
  });

  it('muestra el nombre y el precio que recibe', async () => {
    const fixture = TestBed.createComponent(ProductoCard);
    fixture.componentRef.setInput('producto', empanada);
    await fixture.whenStable();

    const texto = (fixture.nativeElement as HTMLElement).textContent;
    expect(texto).toContain('Empanada');
    expect(texto).toContain('2500');
    expect(texto).not.toContain('Recomendado'); // destacado vale false por defecto
  });

  it('muestra "Recomendado" cuando destacado es true', async () => {
    const fixture = TestBed.createComponent(ProductoCard);
    fixture.componentRef.setInput('producto', empanada);
    fixture.componentRef.setInput('destacado', true);
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Recomendado');
  });

    it('emite el producto cuando pulsan Agregar', async () => {
    const fixture = TestBed.createComponent(ProductoCard);
    fixture.componentRef.setInput('producto', empanada);
    await fixture.whenStable();

    let recibido: unknown;
    fixture.componentInstance.agregar.subscribe((p) => (recibido = p));

    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();

    expect(recibido).toEqual(empanada);
  });
});