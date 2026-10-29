import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Ventas } from '../servicios/ventas';

@Component({
  selector: 'app-historial',
  imports: [DatePipe],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class Historial {
  protected readonly ventas = inject(Ventas);

  protected borrar(): void {
    if (confirm('¿Borrar todo el historial de ventas? Esta acción no se puede deshacer.')) {
      this.ventas.limpiar();
    }
  }
}