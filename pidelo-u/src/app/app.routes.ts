import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { Menu } from './menu/menu';
import { Resumen } from './resumen/resumen';
import { AgregarProducto } from './agregar-producto/agregar-producto';

// Vista exclusiva para clientes (Menú y Carrito)
@Component({
  selector: 'app-inicio-view',
  imports: [Menu, Resumen],
  template: `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <app-menu />
      <app-resumen />
    </div>
  `
})
class InicioView {}

export const routes: Routes = [
  { path: '', component: InicioView },
  { path: 'admin', component: AgregarProducto },
  { path: '**', redirectTo: '' } // Redirige al inicio si la ruta no existe
];