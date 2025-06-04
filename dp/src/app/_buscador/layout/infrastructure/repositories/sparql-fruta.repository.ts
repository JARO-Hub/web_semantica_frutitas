import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { DBpediaInfo, FrutaRepository } from "src/app/_buscador/layout/core/repositories/fruta.repository";
import { FrutaModel } from "src/app/_buscador/layout/core/models/fruta.model";
import { ColorStatsModel } from "src/app/_buscador/layout/core/models/color-stats.model"; /*--color model--*/
import { environment } from "../../../../../environments/environment";
import { firstValueFrom, lastValueFrom } from "rxjs";

export type SparqlJSON = {
  results: { bindings: any[] };
};
@Injectable({ providedIn: "root" })
export class SparqlFrutaRepository implements FrutaRepository {

  private readonly FUSEKI_URL  = `${environment.fusekiApiUrl}/ontology/query`;
  private readonly DBPEDIA_URL = 'https://dbpedia.org/sparql';

  constructor(private http: HttpClient) {}

  /* ---------- 1. buscarPorNombre ---------------------------------------- */
  async buscarPorNombre(nombre: string, lang: string): Promise<FrutaModel[]> {
    const fuseki = await this.consultaFuseki(this.fusekiPorNombre(nombre, lang));
    const frutas = this.mapBindingsToFrutas(fuseki.results.bindings);
    await this.enriquecerConDbpedia(frutas, lang);
    return frutas;
  }

  /* ---------- 2. buscarTodas ------------------------------------------- */
  async buscarTodas(lang: string): Promise<FrutaModel[]> {
    const fuseki:SparqlJSON= await this.consultaFuseki(this.fusekiTodas(lang));
    const frutas = this.mapBindingsToFrutas(fuseki.results.bindings);
    await this.enriquecerConDbpedia(frutas, lang);
    return frutas;
  }



  /* ---------- 3. info (por nombre)  ------------------------------------ */
  async info(nombre: string, lang: string): Promise<DBpediaInfo> {
    const db = await this.sendSparql(
      this.DBPEDIA_URL,
      this.dbpediaQuery(nombre, lang)
    ) as SparqlJSON;

    const first = db.results.bindings[0];
    return first
      ? { abstract: first.abstract?.value, thumbnail: first.thumbnail?.value }
      : {};
  }

  /*---- frutas por color desde Fuseki ----*/
  async frutasPorColor(color: string, lang: string): Promise<FrutaModel[]> {
    const query = this.fusekiPorColor(color, lang);
    const fuseki = await this.consultaFuseki(query) as SparqlJSON;
    const frutas = this.mapBindingsToFrutas(fuseki.results.bindings);
    await this.enriquecerConDbpedia(frutas, lang); // opcional
    return frutas;
  }

  private fusekiPorColor(color: string, lang: string): string {
    return `
    PREFIX :   <http://www.mi-ontologia-frutas.org/ontologia#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?fruit ?label ?color ?prop ?val
    WHERE {
      ?fruit   a          :Fruta ;
               rdfs:label ?label ;
               :colorDeFruta ?color .

      OPTIONAL { ?fruit :cantidadVitaminaC ?vitaminaC . }
      OPTIONAL { ?fruit :indiceORAC       ?indiceORAC . }

      ?fruit   ?prop      ?val .

      FILTER( lang(?label) = "${lang}" )
      FILTER( lcase(str(?color)) = "${color}" )
    }
  `;
  }


  //Esto es reciente
  async frutasRicasEnVitaminaC(lang: string, umbral: number): Promise<FrutaModel[]>{
    const fuseki = await this.consultaFuseki(this.fusekiFrutasRicas(lang, umbral));
    const frutas = this.mapBindingsToFrutas(fuseki.results.bindings);
    await this.enriquecerConDbpedia(frutas, lang);
    return frutas;
  }

  private fusekiFrutasRicas(lang: string, umbral: number): string {
  return `
    PREFIX : <http://www.mi-ontologia-frutas.org/ontologia#>

    SELECT ?fruit ?prop ?val
    WHERE {
      ?fruit a :Fruta ;
             :cantidadVitaminaC ?val ;
             ?prop ?val .

      FILTER(?val >= ${umbral})
      VALUES ?prop { :cantidadVitaminaC :indiceORAC }
    }
  `;
}
/*indice orac*/
// Nueva función para frutas con alto índice ORAC
async frutasRicasEnIndiceORAC(lang: string, umbral: number): Promise<FrutaModel[]> {
  const fuseki = await this.consultaFuseki(this.fusekiFrutasRicasEnIndiceORAC(lang, umbral));
  const frutas = this.mapBindingsToFrutas(fuseki.results.bindings);
  await this.enriquecerConDbpedia(frutas, lang);
  return frutas;
}

private fusekiFrutasRicasEnIndiceORAC(lang: string, umbral: number): string {
  return `
    PREFIX : <http://www.mi-ontologia-frutas.org/ontologia#>

    SELECT ?fruit ?prop ?val
    WHERE {
      ?fruit a :Fruta ;
             :indiceORAC ?val ;
             ?prop ?val .
      FILTER(?val >= ${umbral})
      VALUES ?prop { :indiceORAC }
    }
      ORDER BY DESC(?val)
  `;
}


  /* ====================== helpers ===================== */
  private async consultaFuseki(q: string) {
    return this.sendSparql(this.FUSEKI_URL, q) as Promise<SparqlJSON>;
  }

  private async sendSparql(endpoint: string, query: string): Promise<SparqlJSON> {
    const body    = new HttpParams().set('query', query);
    const headers = { Accept: 'application/sparql-results+json' };
    return firstValueFrom(this.http.post<SparqlJSON>(endpoint, body, { headers }));
  }

  /* -------------------  consultas Fuseki ------------------- */
  private fusekiPorNombre(nombre: string, lang: string): string {
    const esc = nombre;
    return `
      PREFIX : <http://www.mi-ontologia-frutas.org/ontologia#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?fruit ?label ?prop ?val
    WHERE {
      # Enlazamos el label en una variable para poder seleccionarlo
      ?fruit a :Fruta ;
             rdfs:label ?label ;
             ?prop ?val .

      # Filtramos que ?label coincida exactamente con el literal en el idioma dado
      FILTER( ?label = "${esc}"@${lang} )

      # Y sólo queremos devolver estas dos propiedades, si existen
      VALUES ?prop { :cantidadVitaminaC :indiceORAC }

      # (Opcional) También podríamos filtrar que ?label realmente tenga ese idioma
      FILTER(lang(?label) = "${lang}")
    }`;
  }

  private fusekiTodas( lang: string): string {
    return `
      PREFIX : <http://www.mi-ontologia-frutas.org/ontologia#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT ?fruit ?label ?prop ?val
      WHERE {
        ?fruit a :Fruta ;
        rdfs:label ?label ;
               ?prop ?val .
        VALUES ?prop { :cantidadVitaminaC :indiceORAC }
        FILTER( lang(?label) = "${lang}" )
      }`;
  }

  /* -------------------  consulta directa a DBpedia ------------------- */
  private dbpediaQuery(nombre: string, lang: string): string {
    const recurso = encodeURIComponent(nombre.replace(/ /g, '_'));
    return `
      PREFIX dbo: <http://dbpedia.org/ontology/>
      SELECT ?abstract ?thumbnail
      WHERE {
        <http://dbpedia.org/resource/${recurso}> dbo:abstract ?abstract .
        FILTER(langMatches(lang(?abstract), "${lang}"))
        OPTIONAL { <http://dbpedia.org/resource/${recurso}> dbo:thumbnail ?thumbnail }
      } LIMIT 1`;
  }


  /*  Enriquecer los modelos locales con datos de DBpedia  */
  private async enriquecerConDbpedia(frutas: FrutaModel[], lang: string): Promise<void> {
    await Promise.all(
      frutas.map(async (f) => {
        try {
          const db = await this.sendSparql(
            this.DBPEDIA_URL,
            this.dbpediaQuery(f.nombre, lang)
          ) as SparqlJSON;

          const first = db.results.bindings[0];
          if (first) {
            f.abstract  = first.abstract?.value;
            f.thumbnail = first.thumbnail?.value;
          }
        } catch {
          /* Cualquier fallo ⇒ dejamos los campos vacíos */
        }
      })
    );
  }

  /* =================  Binding → Modelo  ==================== */
  private mapBindingsToFrutas(bindings: any[]): FrutaModel[] {
    const map = new Map<string, FrutaModel>();

    bindings.forEach(b => {
      const uri     = b.fruit.value;
      const nombre  = uri.split('#').pop()!;
      let   fruta   = map.get(uri);
      if (!fruta) {
        fruta = { uri, nombre };
        map.set(uri, fruta);
      }
      const prop = b.prop.value.split('#').pop();
      if (prop === 'cantidadVitaminaC') fruta.vitC = +b.val.value;
      if (prop === 'indiceORAC')        fruta.orac = +b.val.value;
    });

    return [...map.values()];
  }
}
