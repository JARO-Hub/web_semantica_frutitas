import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS, HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



const BASIC = btoa(`${environment.fusekiUser}:${environment.fusekiPassword}`);
const AUTH_HEADER = `Basic ${BASIC}`;
/*
export const b2bInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
*/
@Injectable()
export class B2bInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ① Solo para Fuseki
    const isFuseki = req.url.includes(environment.fusekiApiUrl);
    const authReq  = isFuseki
      ? req.clone({ setHeaders: { Authorization: AUTH_HEADER } })
      : req;

      //debugger;                   // ← abrirá DevTools al llegar aquí

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        // ② Si vino 401 y aún no llevaba cabecera, prueba una vez
        if (isFuseki && err.status === 401 && !req.headers.has('Authorization')) {
          const retry = req.clone({ setHeaders: { Authorization: AUTH_HEADER } });
          console.table({
            'Response': {
              status: err.status,
              statusText: err.statusText,
            },
            'Request': {
              url: req.url,
              method: req.method,
              headers: req.headers.keys(),
            },
            'Auth': {
              Authorization: AUTH_HEADER,
            },
          });
          return next.handle(retry);

        }
        return throwError(() => err);
      })
    );
  }
}

export const B2B_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: B2bInterceptor, multi: true },
];
