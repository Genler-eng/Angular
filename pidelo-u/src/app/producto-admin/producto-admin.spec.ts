import { TestBed } from '@angular/core/testing';
import { ProductoAdmin } from './producto-admin';

describe('ProductoAdmin', () => {
  const empanada = { id: 1, nombre: 'Empanada', precio: 2500 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoAdmin],
    }).compileComponents();
  });

  it('muestra el nombre y el precio que recibe', async () => {
    const fixture = TestBed.createComponent(ProductoAdmin);
    fixture.componentRef.setInput('producto', empanada);
    await fixture.whenStable();

    const texto = (fixture.nativeElement as HTMLElement).textContent;
    expect(texto).toContain('Empanada');
    expect(texto).toContain('2500');
  });

  it('avisa con el producto cuando pulsan Editar', async () => {
    const fixture = TestBed.createComponent(ProductoAdmin);
    fixture.componentRef.setInput('producto', empanada);
    await fixture.whenStable();

    let recibido: unknown;
    fixture.componentInstance.editar.subscribe((p) => (recibido = p));

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.editar')!.click();

    expect(recibido).toEqual(empanada);
  });

  it('avisa con el producto cuando pulsan Eliminar', async () => {
    const fixture = TestBed.createComponent(ProductoAdmin);
    fixture.componentRef.setInput('producto', empanada);
    await fixture.whenStable();

    let recibido: unknown;
    fixture.componentInstance.eliminar.subscribe((p) => (recibido = p));

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.eliminar')!.click();

    expect(recibido).toEqual(empanada);
  });
});