import { TestBed } from '@angular/core/testing';
import { ItemPedido } from './item-pedido';

describe('ItemPedido', () => {
  const empanada = { id: 1, nombre: 'Empanada', precio: 2500 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPedido],
    }).compileComponents();
  });

  it('muestra el nombre y el precio que recibe', async () => {
    const fixture = TestBed.createComponent(ItemPedido);
    fixture.componentRef.setInput('producto', empanada);
    await fixture.whenStable();

    const texto = (fixture.nativeElement as HTMLElement).textContent;
    expect(texto).toContain('Empanada');
    expect(texto).toContain('2500');
  });

  it('avisa cuando pulsan Quitar', async () => {
    const fixture = TestBed.createComponent(ItemPedido);
    fixture.componentRef.setInput('producto', empanada);
    await fixture.whenStable();

    let avisos = 0;
    fixture.componentInstance.quitar.subscribe(() => avisos++);

    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();

    expect(avisos).toBe(1);
  });
});