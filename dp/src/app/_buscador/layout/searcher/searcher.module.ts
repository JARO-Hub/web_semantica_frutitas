import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient } from "@angular/common/http";

import { SearcherComponent } from "./searcher/searcher.component";
import { ResultadosComponent } from "./responses/responses.component";
import { SearcherService } from "../infrastructure/services/searcher.service";
import { FRUTA_REPOSITORY } from "../core/repositories/fruta.repository";
import { SparqlFrutaRepository } from "../infrastructure/repositories/sparql-fruta.repository";
import { SearchRoutingModule } from "./searcher-routing.module";
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


@NgModule({
  declarations: [
    SearcherComponent,
    ResultadosComponent,

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
    MatPaginatorModule
  ],
  providers: [
    provideHttpClient(),
    SearcherService,
    {
      provide: FRUTA_REPOSITORY,
      useClass: SparqlFrutaRepository
    }
  ]
})
export class SearcherModule { }
