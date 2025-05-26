import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorQueryMapperService {
  private colorMap: { [key: string]: string } = {
    amarillas: 'Yellow',
    rojas: 'Red',
    verdes: 'Green',
    azules: 'Blue'
  };

  map(input: string): { type: 'color'; value: string } | null {
    const match = input.match(/frutas (amarillas|rojas|verdes|azules)/i);
    if (match) {
      const colorEsp = match[1].toLowerCase();
      const colorIngles = this.colorMap[colorEsp];
      if (colorIngles) {
        return { type: 'color', value: colorIngles };
      }
    }
    return null;
  }
}
