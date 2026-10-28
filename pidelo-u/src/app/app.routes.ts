import { Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Resumen } from './resumen/resumen';
import { AgregarProducto } from './agregar-producto/agregar-producto';

// Componente contenedor para la vista principal (Menú + Carrito)
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-view',
  imports: [Menu, Resumen],
  template: `
    <app-menu />
    <app-resumen />
  `
})
class InicioView {}

export const routes: Routes = [
  { path: '', component: InicioView },
  { path: 'admin', component: AgregarProducto },
  { path: '**', redirectTo: '' } // Si escriben una ruta mal, los devuelve al inicio
];