import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import { SearcherComponent } from "./searcher/searcher.component";
import { ResultadosComponent } from "./responses/responses.component";
import { SearcherService } from "../infrastructure/services/searcher.service";
import { FRUTA_REPOSITORY } from "../core/repositories/fruta.repository";
import { SparqlFrutaRepository } from "../infrastructure/repositories/sparql-fruta.repository";
import { SearchRoutingModule } from "./searcher-routing.module";
import { ColorStatsTableComponent } from './responses/color-stats-table.component';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule
} from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {B2B_INTERCEPTOR_PROVIDERS, B2bInterceptor} from "../infrastructure/angular/b2b.interceptor";
import {FUSEKI_REPOSITORY} from "../core/repositories/fuseki.repository";
import {HttpFusekiRepository} from "../infrastructure/repositories/http-fuseki.repository";
import {HeaderComponent} from "../components/header/header.component";
import {AsideComponent} from "../components/aside/aside.component";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslationService} from "../../../modules/i18n";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    SearcherComponent,
    ResultadosComponent,
    ColorStatsTableComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatPaginatorModule,
    HeaderComponent,
    AsideComponent,
    TranslateModule.forRoot(),

  ],
  providers: [
    provideHttpClient(/*withInterceptorsFromDi()*/),
    B2B_INTERCEPTOR_PROVIDERS,
    SearcherService,
    {
      provide: FRUTA_REPOSITORY,
      useClass: SparqlFrutaRepository
    },
    {
      provide: FUSEKI_REPOSITORY,
      useClass: HttpFusekiRepository
    },
    TranslationService

  ]
})
export class SearcherModule { }
