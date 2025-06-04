import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { AppComponent } from './app/app.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // necesario para cargar archivos vía Http
    provideTransloco({
      config: {
        defaultLang: 'es',
        reRenderOnLangChange: true,  // permite re-renderizar componentes al cambiar idioma [oai_citation:3‡stackoverflow.com](https://stackoverflow.com/questions/78302561/transloco-is-not-loading-translations-in-angular-17#:~:text=provideTransloco%28,)
        prodMode: true               // false en desarrollo para debug
      },
      loader: TranslateHttpLoader    // clase que carga los archivos JSON de assets
    })
  ]
});
