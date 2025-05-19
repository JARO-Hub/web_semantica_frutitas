import { Component } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { DropdownMenu1Component } from "../../../dropdown-menus/dropdown-menu1/dropdown-menu1.component";

@Component({
  selector: "app-lists-widget1",
  templateUrl: "./lists-widget1.component.html",
  imports: [
    InlineSVGModule,
    DropdownMenu1Component
  ]
})
export class ListsWidget1Component {
  constructor() {}
}
