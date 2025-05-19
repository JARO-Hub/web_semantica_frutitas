import { Component, Input } from '@angular/core';
import { DropdownMenu1Component } from "../../../dropdown-menus/dropdown-menu1/dropdown-menu1.component";
import { InlineSVGModule } from "ng-inline-svg-2";

@Component({
  selector: "app-lists-widget8",
  templateUrl: "./lists-widget8.component.html",
  imports: [
    DropdownMenu1Component,
    InlineSVGModule
  ]
})
export class ListsWidget8Component {
  @Input() cssClass = '';
  constructor() {}
}
