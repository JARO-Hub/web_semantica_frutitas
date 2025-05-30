import { Component, Input } from '@angular/core';
import { DropdownMenu1Component } from "../../../dropdown-menus/dropdown-menu1/dropdown-menu1.component";
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-mixed-widget1",
  templateUrl: "./mixed-widget1.component.html",
  imports: [
    DropdownMenu1Component,
    InlineSVGModule,
    NgClass
  ]
})
export class MixedWidget1Component {
  @Input() color: string = '';
  constructor() {}
}
