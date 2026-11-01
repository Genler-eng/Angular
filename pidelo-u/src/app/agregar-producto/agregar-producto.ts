import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Catalogo } from '../servicios/catalogo';
import { Producto } from '../modelos/producto';
import { ProductoAdmin } from '../producto-admin/producto-admin';

@Component({
  selector: 'app-agregar-producto',
  imports: [FormsModule, ProductoAdmin],
  templateUrl: './agregar-producto.html',
  styleUrl: './agregar-producto.css'
})
export class AgregarProducto {
  private readonly catalogo = inject(Catalogo);

  protected readonly productos = this.catalogo.todos;

  protected readonly nombre = signal('');
  protected readonly precio = signal(0);
  protected readonly editando = signal<Producto | null>(null);

  protected guardar(): void {
    const nombre = this.nombre().trim();
    const precio = this.precio();
    if (!nombre || !(precio > 0)) return;

    const actual = this.editando();
    if (actual) {
      this.catalogo.editarProducto(actual.id, { nombre, precio });
    } else {
      this.catalogo.agregarProducto({ nombre, precio });
    }
    this.cancelar(); // limpia el formulario y sale del modo edición
  }

  protected editar(producto: Producto): void {
    this.editando.set(producto);
    this.nombre.set(producto.nombre);
    this.precio.set(producto.precio);
  }

  protected cancelar(): void {
    this.editando.set(null);
    this.nombre.set('');
    this.precio.set(0);
  }

  protected eliminar(producto: Producto): void {
    if (confirm(`¿Eliminar "${producto.nombre}" del menú?`)) {
      this.catalogo.eliminarProducto(producto.id);
      if (this.editando()?.id === producto.id) {
        this.cancelar(); // si lo estaban editando, se cierra el formulario
      }
    }
  }
}