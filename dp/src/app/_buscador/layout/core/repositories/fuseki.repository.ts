// core/repositories/fuseki.repository.ts
import {Injectable, InjectionToken} from '@angular/core';
import { Observable } from 'rxjs';

export interface FusekiRepository {
  select(sparql: string): Observable<any>;

}
export const FUSEKI_REPOSITORY = new InjectionToken<FusekiRepository>('FusekiRepository');
