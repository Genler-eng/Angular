import { Component, inject } from '@angular/core';
import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-resumen',
  imports: [],
  templateUrl: './resumen.html',
  styleUrl: './resumen.css'
})
export class Resumen {
  // Inyectamos el servicio Carrito para acceder a sus señales y métodos reactivos
  protected readonly carrito = inject(Carrito);
}