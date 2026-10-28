import { Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';
import { ItemPedido } from '../item-pedido/item-pedido';

@Component({
  selector: 'app-resumen',
  imports: [ItemPedido],
  templateUrl: './resumen.html',
  styleUrl: './resumen.css'
})
export class Resumen {
  protected readonly carrito = inject(Carrito);
}