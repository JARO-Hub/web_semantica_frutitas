import { Inject, Injectable, Signal, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';
import { FrutaModel } from "../../core/models/fruta.model";
import { ColorStatsModel } from '../../core/models/color-stats.model';
import { FRUTA_REPOSITORY, FrutaRepository } from "../../core/repositories/fruta.repository";
import {FUSEKI_REPOSITORY, FusekiRepository} from "../../core/repositories/fuseki.repository";
import { ColorQueryMapperService } from '../services/color-query-mapper.service';
import { StringToken } from "@angular/compiler";
import { VitaminCQueryMapperService } from '../services/VitaminCQueryMapperService';
import { IndiceORACQueryMapperService } from '../services/indice-orac-query-mapper.service';
import { SparqlFrutasRicasRepository } from '../repositories/sparql-vitaminaC-repository';
import {CloudTransRepository, TRANSLATOR_REPOSITORY} from "../../core/repositories/cloud-trans.repository";

@Injectable({
  providedIn: 'root'
})
export class SearcherService {

  private searchResults = signal<any>(null);
  public resultados = signal<FrutaModel[]>([]);
  public resultadosColor = signal<FrutaModel[] | null>(null);
  private isLoading = signal(false);
  error = signal<string|null>(null);


  constructor(
    private http: HttpClient,

    @Inject(FRUTA_REPOSITORY)
    private repository: FrutaRepository,

    @Inject(FUSEKI_REPOSITORY)
    private fusekiRepository: FusekiRepository,

    @Inject(TRANSLATOR_REPOSITORY)
    private translatorRepository: CloudTransRepository,

    private colorMapper: ColorQueryMapperService,
    private vitaminCMapper: VitaminCQueryMapperService,
    private indiceOracMapper: IndiceORACQueryMapperService
  ) {

  }


  async search(nombre: string, lang: string) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const datos = await this.repository.buscarPorNombre(nombre, lang);
      this.resultados.set(datos);
    } catch {
      this.error.set('Error al buscar');
      this.resultados.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }
  // Expone la señal como lectura pública
  get results(): Signal<any> {
    return this.searchResults.asReadonly();
  }

  private buildQuery(name: string, lang: 'es'|'en' | string): string {
    if (!name) return '';
    const esc = name.replace(/"/g, '\\"');
    const r = `
      PREFIX :     <http://www.mi-ontologia-frutas.org/ontologia#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT ?prop ?valName WHERE {

        ?fruit a :Fruta;
               rdfs:label "${esc}"@${lang} .

        ?fruit ?prop ?val .

        OPTIONAL {
          ?val rdfs:label ?valName .
          FILTER(lang(?valName) = "${lang}")
        }
      } ORDER BY ?prop
      LIMIT 30
    `;
    console.log(r);
    return r;
  }

  private mapNameToURI(name: string, lang: 'es'|'en'): string|null {
    const lookup: Record<string,string> = {
      // español
      'manzana':   'http://frutas.deploymentsoftware.com/ontology#Manzana',
      'pera':      'http://frutas.deploymentsoftware.com/ontology#Pera',
      'platano':   'http://frutas.deploymentsoftware.com/ontology#Platano',
      'fresa':     'http://frutas.deploymentsoftware.com/ontology#Fresa',
      // inglés
      'apple':     'http://frutas.deploymentsoftware.com/ontology#Manzana',
      'pear':      'http://frutas.deploymentsoftware.com/ontology#Pera',
      'banana':    'http://frutas.deploymentsoftware.com/ontology#Platano',
      'strawberry':'http://frutas.deploymentsoftware.com/ontology#Fresa',
    };
    return lookup[name] || null;
  }

  decodeHtml(html: string): string {
    // Creamos dinámicamente un elemento <textarea> que no se anexa al DOM.
    const textarea = document.createElement('textarea');
    textarea.className = 'd-none';
    textarea.innerHTML = html;
    // Al leer textarea.value, ya obtienes la cadena con las entidades resueltas.
    return textarea.value;
  }


  async buscar(nombre: string, lang: string) {
    this.isLoading.set(true);
    this.error.set(null);


    if (lang !== 'es') {
      // Si el nombre no está en español, lo traducimos
      try {
        // si nombre es mas de una palabra lo traducimos
        if ( nombre.includes(' ')) {
          // Si es una frase, la traducimos completa
          nombre = await this.translatorRepository.translate(nombre, 'es');
          nombre = this.decodeHtml(nombre);
        }else{
          nombre = nombre;
        }


      } catch (e) {
        console.error('Error al traducir:', e);
        this.error.set('Error al traducir el nombre');
        this.isLoading.set(false);
        return;
      }
    }


    try {

      // Paso 1: detectar si la búsqueda es por color
      const colorMapped = this.colorMapper.map(nombre, lang);
      if (colorMapped) {
        let colorValue = colorMapped.value;
        if (lang !== 'es') {
            colorMapped.value = await this.translatorRepository.translate(colorMapped.value, lang);
           colorValue = this.decodeHtml(colorMapped.value);
        }

        const resultados = await this.repository.frutasPorColor(colorValue, lang);
        this.resultadosColor.set(resultados);

        this.resultados.set([]); // limpia los resultados normales
        return;
      }

      //VITAMINAC
      const vitCMap = this.vitaminCMapper.map(nombre);
      if (vitCMap) {

        // Llama al nuevo método del repositorio con el umbral detectado
        const resultados = await this.repository.frutasRicasEnVitaminaC(lang, vitCMap.value);
        this.resultados.set(resultados);
        this.resultadosColor.set(null);
        return;
      }
      const oracMap = this.indiceOracMapper.map(nombre);
      if (oracMap) {
        const resultados = await this.repository.frutasRicasEnIndiceORAC(lang, oracMap.value);
        this.resultados.set(resultados);
        this.resultadosColor.set(null);
        return;
      }


      // Paso 2: búsqueda tradicional por nombre
      let frutas = await this.repository.buscarPorNombre(nombre.trim(), lang);
      if (!frutas.length) {
        frutas = await this.repository.buscarTodas(lang);
      }

      const info$ = frutas.map(f =>
        this.repository.info(f.nombre, lang).then(info => ({ f, info }))
      );

      const enriquecidas = await Promise.all(info$);

      this.resultados.set(
        enriquecidas.map(({ f, info }) => ({ ...f, ...info }))
      );
      this.resultadosColor.set(null); // limpia los resultados de color

    } catch (e) {
      console.error(e);
      this.error.set('Error al buscar');
      this.resultados.set([]);
      this.resultadosColor.set(null);
    } finally {
      this.isLoading.set(false);
    }
  }
}
