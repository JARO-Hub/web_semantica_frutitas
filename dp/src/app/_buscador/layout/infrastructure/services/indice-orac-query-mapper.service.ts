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
    'antioxidantes',
    'orac'
  ];

  private defaultThreshold = 5000;

  map(text: string): { value: number } | null {
    const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const keywordMatch = this.keywords.some(k => normalized.includes(k));
    if (!keywordMatch) return null;

    const numberMatch = normalized.match(/(?:de|más de|mayor(?: a)?|superior a|>=?)\s*(\d{3,5})/);
    
    if (numberMatch && numberMatch[1]) {
      const value = parseInt(numberMatch[1], 10);
      return { value };
    }

    const fallbackMatch = normalized.match(/\b\d{3,5}\b/);
    if (fallbackMatch) {
      const value = parseInt(fallbackMatch[0], 10);
      return { value };
    }

    return { value: this.defaultThreshold };
  }
}
