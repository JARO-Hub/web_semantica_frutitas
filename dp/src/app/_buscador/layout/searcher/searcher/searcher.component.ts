import {Component, effect, ElementRef, Inject, OnInit, Signal, signal, ViewChild} from "@angular/core";
import { SearcherService } from "../../infrastructure/services/searcher.service";
import { FrutaModel } from "../../core/models/fruta.model";
import { FRUTA_REPOSITORY, FrutaRepository } from "../../core/repositories/fruta.repository";
import {LayoutService} from "../../core/layout.service";
import {LayoutInitService} from "../../core/layout-init.service";
import {TranslationService} from "../../../../modules/i18n";
import {locale as enLang} from "../../../../modules/i18n/vocabs/en";
import {locale as chLang} from "../../../../modules/i18n/vocabs/ch";
import {locale as esLang} from "../../../../modules/i18n/vocabs/es";
import {locale as jpLang} from "../../../../modules/i18n/vocabs/jp";
import {locale as deLang} from "../../../../modules/i18n/vocabs/de";
import {locale as frLang} from "../../../../modules/i18n/vocabs/fr";


@Component({
  selector: "app-searcher",
  standalone: false,
  templateUrl: "./searcher.component.html",
  styleUrls: ["./searcher.component.scss"],
})

export class SearcherComponent implements OnInit {
  headerCSSClasses: string;
  query = '';
  @ViewChild('searchBtn', { static: false }) searchBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('ktHeader', { static: false }) title!: ElementRef<HTMLInputElement>;
  public currentLang: Signal<'en' | 'es' | 'de' | 'fr'>;
  queryText = '';
  lang: 'es'|'en'|'de'|'fr' = 'es';

  language: 'es'|'en'|'de'|'fr' = 'es';
  resultsSignal: Signal<any>;
  results = signal<FrutaModel[]>([]);
  isLoading = signal(false);
  error = signal<string|null>(null);

  frutas    = () => this.searcher.resultados();
  frutasColor = () => this.searcher.resultadosColor();
  asideDisplay: boolean;
  asideCSSClasses: string;


  constructor(
    private searcher: SearcherService,
    @Inject(FRUTA_REPOSITORY) private repository: FrutaRepository,
    private layout: LayoutService,
    private initService: LayoutInitService,
    private i18n: TranslationService
  ) {
    this.initService.init();
    this.i18n.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );

    this.currentLang = this.i18n.langSignal;
    effect(() => {
      console.log("Idioma cambiado a:", this.currentLang());
    });
    // Hacemos una busqueda inicial
    this.withLoading(() =>
      this.searcher.buscar('', this.lang)
    );
  }

  async onLangChange(event: Event) {
    const selectElem = event.target as HTMLSelectElement;
    const chosen = selectElem.value as 'en' | 'es' | 'de' | 'fr';
    this.changeLang(chosen);
    this.query = '';

    if (this.searchBtn && this.searchBtn.nativeElement) {
      this.searchBtn.nativeElement.classList.add('d-none');
    }
    await this.withLoading(() =>
      this.searcher.buscar('', chosen)
    );
    // Volvemos a mostrarlo
    if (this.searchBtn && this.searchBtn.nativeElement) {
      this.searchBtn.nativeElement.classList.remove('d-none');
    }

  }

  changeLang(lang: 'en' | 'es' | 'de' | 'fr') {
    this.i18n.use(lang);
    this.lang = lang;
   // actualizamos también la propiedad local si la necesitas
  }

  private async withLoading<T>(fn: () => Promise<T>): Promise<T> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      return await fn();
    } catch (err) {
      this.error.set('Error al buscar');
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }

  async onSearch(): Promise<void> {

    // Volvemos a mostrarlo
    if (this.searchBtn && this.searchBtn.nativeElement) {
      this.searchBtn.nativeElement.classList.add('d-none');
    }
    await this.withLoading(() =>
      this.searcher.buscar(this.query, this.lang)
    );
    // Volvemos a mostrarlo
    if (this.searchBtn && this.searchBtn.nativeElement) {
      this.searchBtn.nativeElement.classList.remove('d-none');
    }

  }

  ngOnInit(): void {

    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.asideCSSClasses = this.layout.getStringCSSClasses('aside');

  }

  changeTitle(ktHeader: ElementRef, lang: string): void {
    let title = ktHeader.nativeElement.querySelector('#kt-header__title');
    if (title) {
      title.textContent = this.i18n.translateSearcher(title.textContent, lang as 'fr' | 'en' | 'es' | 'de');
    } else {
      console.warn('No se encontró el elemento de título en ktHeader');
    }
  }

}
