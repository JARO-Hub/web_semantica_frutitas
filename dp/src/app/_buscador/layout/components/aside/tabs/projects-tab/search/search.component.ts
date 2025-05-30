import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KTHelpers } from 'src/app/_buscador/kt';
import { FormsModule } from "@angular/forms";
import { InlineSVGModule } from "ng-inline-svg-2";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  imports: [
    FormsModule,
    InlineSVGModule,
    AsyncPipe,
    NgIf
  ]
})
export class SearchComponent implements OnInit {
  showLoading: boolean = false;
  searchText = new BehaviorSubject<string>('');

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    KTHelpers.menuReinitialization()
  }

  updateSearchText(input: string) {
    this.showLoading = true;
    this.searchText.next(input);
    this.cdr.detectChanges();
    if (input && input.length > 2) {
      KTHelpers.menuReinitialization();
    }
    setTimeout(() => {
      this.showLoading = false;
      this.cdr.detectChanges();
    }, 1300);
  }

  resetSearchText() {
    this.searchText.next('');
    this.cdr.detectChanges();
  }
}
