import { Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-encabezado',
  imports: [],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css'
})
export class Encabezado {
  // Inyectamos el mismo servicio Carrito para escuchar su estado global
  protected readonly carrito = inject(Carrito);
}
