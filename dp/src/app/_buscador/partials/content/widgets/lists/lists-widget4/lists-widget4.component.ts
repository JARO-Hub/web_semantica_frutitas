import { Component, Input } from '@angular/core';
import { DropdownMenu1Component } from "../../../dropdown-menus/dropdown-menu1/dropdown-menu1.component";
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgIf } from "@angular/common";

@Component({

  selector: "app-lists-widget4",
  templateUrl: "./lists-widget4.component.html",
  imports: [
    DropdownMenu1Component,
    InlineSVGModule,
    NgIf
  ]
})
export class ListsWidget4Component {
  @Input() items: number = 6;
  constructor() {}
}
