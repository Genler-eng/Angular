import { Component, inject } from '@angular/core';
import { Catalogo } from '../servicios/catalogo';
import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private readonly catalogo = inject(Catalogo);
  protected readonly carrito = inject(Carrito);

  // Usamos un getter () para consultar la señal directamente en cada render
  get productos() {
    return this.catalogo.todos();
  }
}