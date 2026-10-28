import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Catalogo } from '../servicios/catalogo';
import { Carrito } from '../servicios/carrito';
import { Producto } from '../modelos/producto';
import { ProductoCard } from '../producto-card/producto-card';

@Component({
  selector: 'app-menu',
  imports: [FormsModule, ProductoCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private readonly catalogo = inject(Catalogo);
  private readonly carrito = inject(Carrito);

  protected readonly filtro = signal('');

  protected readonly productosFiltrados = computed(() => {
    const texto = this.filtro().toLowerCase();
    return this.catalogo.todos().filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
  });

  protected agregarAlCarrito(producto: Producto): void {
    this.carrito.agregar(producto);
  }
}