import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AgregarProducto } from './agregar-producto';
import { Catalogo } from '../servicios/catalogo';

describe('AgregarProducto', () => {
  let fixture: ComponentFixture<AgregarProducto>;
  let catalogo: Catalogo;
  let el: HTMLElement;

  beforeEach(async () => {
    localStorage.clear(); // así arranca con los tres productos iniciales
    await TestBed.configureTestingModule({
      imports: [AgregarProducto],
    }).compileComponents();

    catalogo = TestBed.inject(Catalogo);
    fixture = TestBed.createComponent(AgregarProducto);
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('muestra los productos del catálogo', () => {
    expect(el.textContent).toContain('Empanada');
    expect(el.textContent).toContain('Gaseosa');
  });

  it('elimina un producto cuando el usuario confirma', async () => {
    window.confirm = () => true;
    const antes = catalogo.todos().length;

    el.querySelector<HTMLButtonElement>('.eliminar')!.click();
    await fixture.whenStable();

    expect(catalogo.todos().length).toBe(antes - 1);
  });

  it('no elimina nada cuando el usuario cancela', async () => {
    window.confirm = () => false;
    const antes = catalogo.todos().length;

    el.querySelector<HTMLButtonElement>('.eliminar')!.click();
    await fixture.whenStable();

    expect(catalogo.todos().length).toBe(antes);
  });

  it('al pulsar Editar el formulario pasa a modo edición', async () => {
    el.querySelector<HTMLButtonElement>('.editar')!.click();
    await fixture.whenStable();

    expect(el.textContent).toContain('Editar producto');
    expect(el.textContent).toContain('Guardar cambios');
    expect(el.querySelector('.cancelar')).not.toBeNull();
  });

  it('Cancelar vuelve al modo agregar', async () => {
    el.querySelector<HTMLButtonElement>('.editar')!.click();
    await fixture.whenStable();

    el.querySelector<HTMLButtonElement>('.cancelar')!.click();
    await fixture.whenStable();

    expect(el.textContent).toContain('Agregar producto');
    expect(el.querySelector('.cancelar')).toBeNull();
  });
});
