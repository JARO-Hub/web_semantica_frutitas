import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { FrutaModel } from 'src/app/_buscador/layout/core/models/fruta.model';
import { DBpediaInfo, FrutaRepository } from 'src/app/_buscador/layout/core/repositories/fruta.repository';
import { ColorStatsModel } from "src/app/_buscador/layout/core/models/color-stats.model"; /*--color model--*/


export type SparqlJSON = {
  results: { bindings: any[] };
};

@Injectable({ providedIn: 'root' })
export class SparqlFrutasRicasRepository implements FrutaRepository {

  private readonly FUSEKI_URL = `${environment.fusekiApiUrl}/ontology/query`;
  private readonly DBPEDIA_URL = 'https://dbpedia.org/sparql';

  constructor(private http: HttpClient) {}

  async frutasRicasEnVitaminaC(lang: string, umbral: number): Promise<FrutaModel[]> {
    // Ejecuta la consulta SPARQL con filtro dinámico
    const fusekiResult = await this.consultaFuseki(this.queryFrutasRicas(lang));
    const frutas = this.mapBindingsToFrutas(fusekiResult.results.bindings)
    // Enriquecer con datos de DBpedia (abstract, thumbnail)
    await this.enriquecerConDbpedia(frutas, lang);
    return frutas;
  }



  async buscarTodas(lang: string): Promise<FrutaModel[]> {
    const fuseki = await this.consultaFuseki(this.queryFrutasRicas(lang));
    const frutas = this.mapBindingsToFrutas(fuseki.results.bindings);
    await this.enriquecerConDbpedia(frutas, lang);
    return frutas;
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
        PREFIX : <http://www.mi-ontologia-frutas.org/ontologia#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?fruit ?label ?color ?vitaminaC ?indiceORAC
        WHERE {
          ?fruit a :Fruta ;
          rdfs:label ?label ;
                :colorDeFruta ?color .
          OPTIONAL { ?fruit :cantidadVitaminaC ?vitaminaC . }
          OPTIONAL { ?fruit :indiceORAC ?indiceORAC . }
          FILTER( lang(?label) = "${lang}" )
        }
      `;
    }

  async buscarPorNombre(nombre: string, lang: string): Promise<FrutaModel[]> {
    throw new Error("buscarPorNombre no es soportado en SparqlFrutasRicasRepository.");
  }

  async info(nombre: string, lang: string): Promise<DBpediaInfo> {
    const db = await this.sendSparql(this.DBPEDIA_URL, this.dbpediaQuery(nombre, lang)) as SparqlJSON;
    const first = db.results.bindings[0];
    return first ? {
      abstract: first.abstract?.value,
      thumbnail: first.thumbnail?.value
    } : {};
  }

  async frutasRicasEnIndiceORAC(lang: string, umbral: number): Promise<FrutaModel[]> {
  const query = `
    PREFIX : <http://www.mi-ontologia-frutas.org/ontologia#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?fruit ?label ?prop ?val
    WHERE {
      ?fruit a :Fruta ;
              rdfs:label ?label ;
             :indiceORAC ?val ;
             ?prop ?val .
      FILTER(?val >= ${umbral})
      VALUES ?prop { :indiceORAC }
      FILTER( lang(?label) = "${lang}" )
    }
  `;
  const fusekiResult = await this.consultaFuseki(query);
  const frutas = this.mapBindingsToFrutas(fusekiResult.results.bindings);
  await this.enriquecerConDbpedia(frutas, lang);
  return frutas;
}

  /* ==================== HELPERS ==================== */

  //private async consultaFuseki(query: string): Promise<SparqlJSON> {
    //return this.sendSparql(this.FUSEKI_URL, query) as Promise<SparqlJSON>;
  //}

  private async sendSparql(endpoint: string, query: string): Promise<SparqlJSON> {
    const body = new HttpParams().set('query', query);
    const headers = { Accept: 'application/sparql-results+json' };
    return firstValueFrom(this.http.post<SparqlJSON>(endpoint, body, { headers }));
  }

  /* ================ SPARQL QUERIES ================ */

  private queryFrutasRicas(lang: string): string {
    return `
      PREFIX : <http://www.mi-ontologia-frutas.org/ontologia#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT ?fruit ?label ?prop ?val
      WHERE {
        ?fruit a :Fruta ;
                rdfs:label ?label ;
               :cantidadVitaminaC ?val ;
               ?prop ?val .
        FILTER(?val >= 50)
        VALUES ?prop { :cantidadVitaminaC :indiceORAC }
        FILTER( lang(?label) = "${lang}" )
      }
    `;
  }

  private dbpediaQuery(nombre: string, lang: string): string {
    const recurso = encodeURIComponent(nombre.replace(/ /g, '_'));
    return `
      PREFIX dbo: <http://dbpedia.org/ontology/>
      SELECT ?abstract ?thumbnail
      WHERE {
        <http://dbpedia.org/resource/${recurso}> dbo:abstract ?abstract .
        FILTER(langMatches(lang(?abstract), "${lang}"))
        OPTIONAL { <http://dbpedia.org/resource/${recurso}> dbo:thumbnail ?thumbnail }
      } LIMIT 10`;
  }

   // 21:07 Envia la consulta SPARQL al endpoint Fuseki y devuelve los resultados JSON.
  private async consultaFuseki(query: string): Promise<SparqlJSON> {
    const body = new HttpParams().set('query', query);
    const headers = { Accept: 'application/sparql-results+json' };
    return firstValueFrom(this.http.post<SparqlJSON>(this.FUSEKI_URL, body, { headers }));
  }

  // Mapea los bindings SPARQL a objetos FrutaModel.
  private mapBindingsToFrutas(bindings: any[]): FrutaModel[] {
    const map = new Map<string, FrutaModel>();
    bindings.forEach(b => {
      const uri = b.fruit.value;
      const nombre = uri.split('#').pop()!;
      let fruta = map.get(uri);
      if (!fruta) {
        fruta = { uri, nombre };
        map.set(uri, fruta);
      }
      const prop = b.prop.value.split('#').pop();
      if (prop === 'cantidadVitaminaC') fruta.vitC = +b.val.value;
      if (prop === 'indiceORAC')       fruta.orac = +b.val.value;
    });
    return [...map.values()];
  }

  private async enriquecerConDbpedia(frutas: FrutaModel[], lang: string): Promise<void> {
    await Promise.all(frutas.map(async (f) => {
      try {
        const db = await this.sendSparql(this.DBPEDIA_URL, this.dbpediaQuery(f.nombre, lang)) as SparqlJSON;
        const first = db.results.bindings[0];
        if (first) {
          f.abstract = first.abstract?.value;
          f.thumbnail = first.thumbnail?.value;
        }
      } catch {

      }
    }));
  }

  /* private mapBindingsToFrutas(bindings: any[]): FrutaModel[] {
    const map = new Map<string, FrutaModel>();
    bindings.forEach(b => {
      const uri = b.fruit.value;
      const nombre = uri.split('#').pop()!;
      let fruta = map.get(uri);
      if (!fruta) {
        fruta = { uri, nombre };
        map.set(uri, fruta);
      }
      const prop = b.prop.value.split('#').pop();
      if (prop === 'cantidadVitaminaC') fruta.vitC = +b.val.value;
      if (prop === 'indiceORAC') fruta.orac = +b.val.value;
    });
    return [...map.values()];
  }
  */
}
