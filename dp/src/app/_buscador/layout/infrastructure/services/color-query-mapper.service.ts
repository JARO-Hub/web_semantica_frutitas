import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorQueryMapperService {
  private colorMap: { [key: string]: string } = {
    amarillo: 'amarillo',
    amarillas: 'amarillo',
    rojo: 'rojo',
    rojas: 'rojo',
    verde: 'verde',
    verdes: 'verde',
    azul: 'azul',
    azules: 'azul',
    naranja: 'naranja',
    naranjas: 'naranja',
    'naranja vibrante': 'naranja vibrante',
    marron: 'marron',
    marrones: 'marron',
    rosado: 'Rosado',
    rosados: 'Rosado'
  };

  /**
   * Limpia el input eliminando palabras genéricas como "fruta", "frutas"
   */
  private limpiarInput(input: string): string {
    return input
      .toLowerCase()
      .replace(/\bfruta(s)?\b/g, '')  // elimina "fruta" o "frutas"
      .replace(/\s+/g, ' ')          // normaliza espacios múltiples a uno solo
      .trim();
  }

  /**
   * Detecta si el input contiene un color válido, ignorando palabras como "fruta(s)"
   */
  map(input: string): { type: 'color'; value: string } | null {
    const limpio = this.limpiarInput(input);
    const palabras = limpio.split(' ');

    for (const palabra of palabras) {
      if (this.colorMap[palabra]) {
        return { type: 'color', value: this.colorMap[palabra] };
      }
    }
    return null;
  }
}
