import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Importar FormsModule
import { Catalogo } from '../servicios/catalogo';
import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-menu',
  imports: [FormsModule], // 2. Agregarlo aquí en los imports
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private readonly catalogo = inject(Catalogo);
  protected readonly carrito = inject(Carrito);

  protected readonly filtro = signal('');

  protected readonly productosFiltrados = computed(() => {
    const texto = this.filtro().toLowerCase();
    return this.catalogo.todos().filter(p => 
      p.nombre.toLowerCase().includes(texto)
    );
  });
}