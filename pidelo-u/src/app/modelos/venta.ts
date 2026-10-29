import { Producto } from './producto';

export interface Venta {
  id: number;
  fecha: string;        // cuándo se hizo la compra
  productos: Producto[];
  total: number;
}