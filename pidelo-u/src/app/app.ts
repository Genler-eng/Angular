import { Component } from '@angular/core';
import { Menu } from './menu/menu';
import { Resumen } from './resumen/resumen';
import { Encabezado } from './encabezado/encabezado';
import { AgregarProducto } from './agregar-producto/agregar-producto'; // 1. Importar

@Component({
  selector: 'app-root',
  imports: [Menu, Resumen, Encabezado, AgregarProducto], // 2. Registrar
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}