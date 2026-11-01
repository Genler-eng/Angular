import { Component, input, output } from '@angular/core';
import { Producto } from '../modelos/producto';

@Component({
  imports: [],
  selector: 'app-producto-admin',
  styleUrl: './producto-admin.css',
  templateUrl: './producto-admin.html',
})
export class ProductoAdmin {
 readonly producto = input.required<Producto>();
 readonly editar = output<Producto>();
 readonly eliminar = output<Producto>();
}
