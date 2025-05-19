import { Component, Inject, Signal, signal } from "@angular/core";
import { SearcherService } from "../../infrastructure/services/searcher.service";
import { FrutaModel } from "../../core/models/fruta.model";
import { FRUTA_REPOSITORY, FrutaRepository } from "../../core/repositories/fruta.repository";

@Component({
  selector: "app-searcher",
  standalone: false,
  templateUrl: "./searcher.component.html",
  styleUrl: "./searcher.component.scss"
})
export class SearcherComponent {
  query = '';
  queryText = '';
  lang: 'es'|'en' = 'es';
  language: 'es'|'en' = 'es';
  resultsSignal: Signal<any>;
  results = signal<FrutaModel[]>([]);
  isLoading = signal(false);
  error = signal<string|null>(null);

  frutas    = () => this.searcher.resultados();
  constructor(
    private searcher: SearcherService,
    @Inject(FRUTA_REPOSITORY) private repository: FrutaRepository
  ) {}


  async onSearch() {
    await this.searcher.buscar(this.query, this.language);
  }

}
