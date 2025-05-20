import { Inject, Injectable, Signal, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';
import { FrutaModel } from "../../core/models/fruta.model";
import { FRUTA_REPOSITORY, FrutaRepository } from "../../core/repositories/fruta.repository";
import {FUSEKI_REPOSITORY, FusekiRepository} from "../../core/repositories/fuseki.repository";

@Injectable({
  providedIn: 'root'
})
export class SearcherService {

  private searchResults = signal<any>(null);
  public resultados = signal<FrutaModel[]>([]);
private isLoading = signal(false);
  error = signal<string|null>(null);


  constructor(
    private http: HttpClient,

    @Inject(FRUTA_REPOSITORY)
    private repository: FrutaRepository,

    @Inject(FUSEKI_REPOSITORY)
    private fusekiRepository: FusekiRepository
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

  async buscar(nombre: string, lang: 'es'|'en') {
    this.isLoading.set(true); this.error.set(null);
    try {
      let frutas = await this.repository.buscarPorNombre(nombre.trim(), lang);
      if (!frutas.length) {
        frutas = await this.repository.buscarTodas(lang);
      }

      // Paralelizamos llamadas a DBpedia con forkJoin
      const info$ = frutas.map(f =>
        this.repository.info(f.nombre, lang).then(info => ({ f, info }))
      );
      const enriquecidas = await Promise.all(info$);

      this.resultados.set(
        enriquecidas.map(({f,info}) => ({ ...f, ...info }))
      );
    } catch (e) {
      console.error(e);
      this.error.set('Error al buscar');
      this.resultados.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }
}
