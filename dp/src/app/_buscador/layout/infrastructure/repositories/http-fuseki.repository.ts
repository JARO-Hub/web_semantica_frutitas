// core/repositories/fuseki.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FusekiRepository} from "../../core/repositories/fuseki.repository";

@Injectable({ providedIn: 'root' })
export class HttpFusekiRepository implements FusekiRepository {
  private endpoint = `${environment.fusekiApiUrl}/ontology/query`;

  constructor(private http: HttpClient) {}

  select(sparql: string): Observable<any> {
    const body   = new HttpParams().set('query', sparql);
    const header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(this.endpoint, body, {
      headers: header,
      responseType: 'json',
    });
  }
}
