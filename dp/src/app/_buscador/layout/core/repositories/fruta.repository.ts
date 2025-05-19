import { FrutaModel } from '../models/fruta.model';
import { InjectionToken } from "@angular/core";
export type DBpediaInfo = { abstract?: string; thumbnail?: string };

export interface FrutaRepository {
  /**
   * Busca frutas por nombre en el idioma dado.
   * @param nombre Texto de búsqueda (label de la fruta)
   * @param lang Código de idioma ("es" | "en"...)
   * @returns Lista de Fruta encontradas
   */
  buscarPorNombre(nombre: string, lang: string): Promise<FrutaModel[]>;
  buscarTodas(lang: string): Promise<FrutaModel[]>;
  info(nombre: string, lang: string): Promise<DBpediaInfo>;
}


export const FRUTA_REPOSITORY = new InjectionToken<FrutaRepository>('FrutaRepository');
