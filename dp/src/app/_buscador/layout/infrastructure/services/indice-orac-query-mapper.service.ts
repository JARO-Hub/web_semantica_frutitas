import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndiceORACQueryMapperService {

  private keywords: string[] = [
    'índice orac',
    'orac alto',
    'alto orac',
    'rico en orac',
    'frutas con mucho orac',
    'frutas antioxidantes',
    'antioxidantes'
  ];

  private threshold = 4000; // Umbral mínimo de ORAC

  map(text: string): { value: number } | null {
    const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const match = this.keywords.some(k => normalized.includes(k));
    return match ? { value: this.threshold } : null;
  }
}