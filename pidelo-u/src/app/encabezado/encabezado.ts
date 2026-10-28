import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Carrito } from '../servicios/carrito'; // 1. Importar el servicio Carrito

@Component({
  selector: 'app-encabezado',
  imports: [RouterLink],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css'
})
export class Encabezado {
  // 2. Inyectar el carrito para que esté disponible en el encabezado
  protected readonly carrito = inject(Carrito);
}