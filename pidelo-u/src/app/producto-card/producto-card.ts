import { Component, input, output } from '@angular/core';
import { Producto } from '../modelos/producto';

@Component({
  selector: 'app-producto-card',
  imports: [],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css'
})
export class ProductoCard {
  readonly producto = input.required<Producto>();
  readonly destacado = input(false);
  readonly agregar = output<Producto>(); // el aviso que sube al padre

  pedir(): void {
    this.agregar.emit(this.producto());
  }
}