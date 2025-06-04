import { FrutaModel } from '../models/fruta.model';
import { ColorStatsModel } from '../models/color-stats.model';
import { InjectionToken } from "@angular/core";
import {FrutaRepository} from "./fruta.repository";
export type DBpediaInfo = { abstract?: string; thumbnail?: string };


export interface CloudTransRepository {

  translate(text: string, targetLang: string): Promise<string>;
  detectLanguage(text: string): Promise<string>;

}
export const TRANSLATOR_REPOSITORY = new InjectionToken<CloudTransRepository>('CloudTransRepository');
