// /src/app/_buscador/layout/searcher/searcher-routing.module.ts
// Rutas propias del buscador
// ====================================================
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearcherComponent } from "./searcher/searcher.component";

const routes: Routes = [
  { path: '', component: SearcherComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
