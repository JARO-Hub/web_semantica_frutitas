// src/app/_buscador/layout/infrastructure/services/vitamin-c-query-mapper.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VitaminCQueryMapperService {
  map(input: string): { type: 'vitaminC'; value: number } | null {
    const lower = input.toLowerCase();
    // Detecta frases que mencionan vitamina C
    if (lower.includes('vitamina c')) {
      // Extrae un número si se menciona (ej. ">=60 mg")
      const numMatch = lower.match(/(\d+)\s*mg/);
      const umbral = numMatch ? parseInt(numMatch[1], 10) : 50;
      return { type: 'vitaminC', value: umbral };
    }
    return null;
  }
}
