import { Component, input, output } from '@angular/core';
import { Producto } from '../modelos/producto';

@Component({
  selector: 'app-item-pedido',
  imports: [],
  templateUrl: './item-pedido.html',
  styleUrl: './item-pedido.css'
})
export class ItemPedido {
  readonly producto = input.required<Producto>(); // el dato baja
  readonly quitar = output<void>();               // el aviso sube, sin datos
}