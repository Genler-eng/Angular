import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Catalogo } from '../servicios/catalogo';

@Component({
  selector: 'app-agregar-producto',
  imports: [FormsModule], // Importamos FormsModule para conectar los inputs
  templateUrl: './agregar-producto.html',
  styleUrl: './agregar-producto.css'
})
export class AgregarProducto {
  private readonly catalogo = inject(Catalogo);

  // Variables para guardar lo que escribe el usuario
  nombre = '';
  precio = 0;

  guardar(): void {
    if (this.nombre.trim() && this.precio > 0) {
      this.catalogo.agregarProducto({
        nombre: this.nombre,
        precio: this.precio
      });
      // Limpiamos los campos
      this.nombre = '';
      this.precio = 0;
    }
  }
}