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

  async frutasPorColor(color: string, lang: string): Promise<ColorStatsModel[]> {
      const query = this.dbpediaPorColor(color, lang); //  usa el método aquí
      const response = await this.sendSparql(this.DBPEDIA_URL, query) as SparqlJSON;
  
      return response.results.bindings.map((b) => ({
        uri: b.uri.value,
        label: b.label.value,
      }));
    }

     private dbpediaPorColor(color: string, lang: string): string {
  return `
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?uri ?label
    WHERE {
      ?uri a dbo:Fruit ;
           dbo:colour ?colour ;
           rdfs:label ?label .

      FILTER(LANG(?label) = "${lang}")
      FILTER(CONTAINS(LCASE(STR(?colour)), "${color.toLowerCase()}"))
    }
    LIMIT 50
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

    SELECT ?fruit ?prop ?val
    WHERE {
      ?fruit a :Fruta ;
             :indiceORAC ?val ;
             ?prop ?val .
      FILTER(?val >= ${umbral})
      VALUES ?prop { :indiceORAC }
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

      SELECT ?fruit ?prop ?val
      WHERE {
        ?fruit a :Fruta ;
               :cantidadVitaminaC ?val ;
               ?prop ?val .
        FILTER(?val >= 50)
        VALUES ?prop { :cantidadVitaminaC :indiceORAC }
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
