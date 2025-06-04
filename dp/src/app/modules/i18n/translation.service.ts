// Localization is based on '@ngx-translate/core';
// Please be familiar with official documentations first => https://github.com/ngx-translate/core

import {effect, Injectable, signal} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale {
  lang: string;
  data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private _lang = signal<'en' | 'es' | 'de' | 'fr'>('es');
  public readonly langSignal = this._lang.asReadonly();
  private loadedLangs: string[] = [];
  // Private properties
  private langIds: any = [];

  constructor(private translate: TranslateService) {
    // add new langIds to the list
    this.translate.addLangs(['es']);

    const stored = (localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) ?? 'es') as
      | 'en' | 'es' | 'de' | 'fr';
    this._lang.set(stored);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('es');
    effect(() => {
      const current = this._lang();
      this.translate.use(current);
      // Guardamos en localStorage
      localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, current);
    });
  }

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);
      if (!this.loadedLangs.includes(locale.lang)) {
        this.loadedLangs.push(locale.lang);
      }
      this.langIds.push(locale.lang);

    });

    // add new languages to the list
    this.translate.addLangs(this.langIds);
    this.translate.use(this.getSelectedLanguage());
    this.translate.addLangs(this.loadedLangs);

    // Si el idioma actual no está cargado, volvemos a 'en'
    const current = this._lang();
    if (!this.loadedLangs.includes(current)) {
      this._lang.set(this.translate.getDefaultLang() as 'en' | 'es' | 'de' | 'fr');
    }
  }

  setLanguage(lang: string) {
    if (lang) {
      this.translate.use(this.translate.getDefaultLang());
      this.translate.use(lang);
      localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    }
  }

  /**
   * Returns selected language
   */
  getSelectedLanguage(): any {
    return (
      localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) ||
      this.translate.getDefaultLang()
    );
  }

  use(lang: 'en' | 'es' | 'de' | 'fr') {
    this._lang.set(lang);
    localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    // El effect() en el constructor hará que ngx-translate use(lang) automáticamente
  }
  current(): 'en' | 'es' | 'de' | 'fr' {
    return this._lang();
  }


  translateSearcher(input: string, lang: 'en' | 'es' | 'de' | 'fr'): string {
    if (!input) {
      return '';
    }
    const translation = this.translate.instant(input);
    if (translation === input) {
      console.warn(`No translation found for "${input}" in language "${lang}"`);
      return input; // Return the original input if no translation is found
    }
    return translation;
  }

}
