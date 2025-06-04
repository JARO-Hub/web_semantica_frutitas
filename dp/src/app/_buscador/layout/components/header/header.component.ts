import {
  Component, effect,
  ElementRef,
  OnDestroy,
  OnInit, Signal,
  ViewChild,
} from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../core/layout.service';
import { MenuComponent } from '../../../kt/components';
import { PageTitleComponent } from "./page-title/page-title.component";
import { NgClass, NgIf } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg-2";
import { TopbarComponent } from "../topbar/topbar.component";
import {TranslatePipe} from "@ngx-translate/core";
import {locale as enLang} from "../../../../modules/i18n/vocabs/en";
import {locale as chLang} from "../../../../modules/i18n/vocabs/ch";
import {locale as esLang} from "../../../../modules/i18n/vocabs/es";
import {locale as jpLang} from "../../../../modules/i18n/vocabs/jp";
import {locale as deLang} from "../../../../modules/i18n/vocabs/de";
import {locale as frLang} from "../../../../modules/i18n/vocabs/fr";
import {TranslationService} from "../../../../modules/i18n";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [
    PageTitleComponent,
    NgClass,
    InlineSVGModule,
    TopbarComponent,
    TranslatePipe
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerContainerCssClasses: string = '';
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef;
  lang: 'es'|'en'|'de'|'fr' = 'es';
  public currentLang: Signal<'en' | 'es' | 'de' | 'fr'>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private router: Router,
    private i18n: TranslationService
  ) {
    this.routingChanges();
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

  }

  ngOnInit(): void {
    this.headerContainerCssClasses =
      this.layout.getStringCSSClasses('headerContainer');
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        MenuComponent.reinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {}
}
