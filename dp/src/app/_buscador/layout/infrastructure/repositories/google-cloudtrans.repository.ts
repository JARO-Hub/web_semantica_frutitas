// core/repositories/fuseki.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {CloudTransRepository} from "../../core/repositories/cloud-trans.repository";
import {lastValueFrom} from "rxjs";

@Injectable({ providedIn: 'root' })
export class GoogleCloudtransRepository implements CloudTransRepository {
  private apikey = `${environment.apikeytraductor}`;

  constructor(private http: HttpClient) {

  }
  translate(text: string, targetLang: string): Promise<string> {
    const url = `https://translation.googleapis.com/language/translate/v2`;
    const body = new HttpParams()
      .set('q', text)
      .set('target', targetLang)
      .set('key', this.apikey);

    // lastValueFrom convierte el Observable en Promise
    return lastValueFrom(
      this.http
        .post<{
          data: { translations: { translatedText: string }[] };
        }>(
          url,
          body.toString(),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
    )
      .then(response => response.data.translations[0].translatedText)
      .catch(error => {
        console.error('Translation error:', error);
        throw error;
      });
  }
  detectLanguage(text: string): Promise<string> {
    const url = `https://translation.googleapis.com/language/translate/v2/detect`;
    const body = new HttpParams()
      .set('q', text)
      .set('key', this.apikey);

    // lastValueFrom convierte el Observable en Promise
    return lastValueFrom(
      this.http
        .post<{
          data: { detections: { language: string }[] };
        }>(
          url,
          body.toString(),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
    )
      .then(response => response.data.detections[0].language)
      .catch(error => {
        console.error('Language detection error:', error);
        throw error;
      });
  }
}
