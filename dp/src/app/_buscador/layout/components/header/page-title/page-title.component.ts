import {Component, effect, OnDestroy, OnInit, Signal} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LayoutService } from '../../../core/layout.service';
import { PageInfoService, PageLink } from '../../../core/page-info.service';
import { RouterLink } from "@angular/router";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {TranslationService} from "../../../../../modules/i18n";

@Component({
  selector: "app-page-title",
  templateUrl: "./page-title.component.html",
  imports: [
    RouterLink,
    NgClass,
    NgIf,
    AsyncPipe,
    TranslatePipe
  ]
})
export class PageTitleComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  showTitle: boolean = true;
  showBC: boolean = true;
  title$: Observable<string>;
  showDescritption: boolean = false;
  description$: Observable<string>;
  bc$: Observable<Array<PageLink>>;
  pageTitleCssClass: string = '';
  pageTitleDirection: string = 'row';
  public currentLang: Signal<'en' | 'es' | 'de' | 'fr'>;

  constructor(
    private pageInfo: PageInfoService,
    private layout: LayoutService,
    private i18n: TranslationService
  ) {
    this.currentLang = this.i18n.langSignal;
    effect(() => {
      console.log("Idioma cambiado a:", this.currentLang());
    });
  }

  ngOnInit(): void {
    this.title$ = this.pageInfo.title.asObservable();
    this.description$ = this.pageInfo.description.asObservable();
    this.bc$ = this.pageInfo.breadcrumbs.asObservable();
    this.showDescritption = this.layout.getProp(
      'pageTitle.description'
    ) as boolean;
    this.showTitle = this.layout.getProp('pageTitle.display') as boolean;
    this.showBC = this.layout.getProp('pageTitle.breadCrumbs') as boolean;
    this.pageTitleCssClass = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleDirection = this.layout.getProp(
      'pageTitle.direction'
    ) as string;
  }

  filteredBC(bc: PageLink[]): PageLink[] {
    return bc.filter((b) => !b.isSeparator);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
