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
    rojos: 'rojo',
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
      // 1) Quitar signos de puntuación comunes (dejamos sólo letras y espacios)
      .replace(/[^a-záéíóúñü\s]/g, ' ')
      // 2) Eliminar palabras “vacías” que no aportan color
      .replace(/\b(fruta|frutas|color|de|la|las|el|los)\b/g, ' ')
      // 3) Normalizar espacios múltiples
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Intenta detectar un color válido dentro del input (ya limpio).
   * Devuelve { type: 'color', value: formaCanónica } o null si no encuentra ninguno.
   */
  map(input: string, lang : string): { type: 'color'; value: string } | null {
    const limpio = this.limpiarInput(input);
    // Dividimos en palabras
    const palabras = limpio.split(' ');

    // Primero tratamos frases compuestas de dos palabras (por ejemplo "naranja vibrante")
    for (let i = 0; i < palabras.length - 1; i++) {
      const par = `${palabras[i]} ${palabras[i + 1]}`.trim();
      if (this.colorMap[par]) {
        return { type: 'color', value: this.colorMap[par] };
      }
    }

    // Si no hay coincidencia de dos palabras, probamos palabra a palabra
    for (const palabra of palabras) {
      if (this.colorMap[palabra]) {
        return { type: 'color', value: this.colorMap[palabra] };
      }
    }

    return null;
  }
}
