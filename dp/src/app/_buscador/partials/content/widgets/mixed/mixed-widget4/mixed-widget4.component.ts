import { Component, Input } from '@angular/core';
import { NgClass } from "@angular/common";
import { DropdownMenu1Component } from "../../../dropdown-menus/dropdown-menu1/dropdown-menu1.component";
import { InlineSVGModule } from "ng-inline-svg-2";

@Component({
  selector: "app-mixed-widget4",
  templateUrl: "./mixed-widget4.component.html",
  imports: [
    NgClass,
    DropdownMenu1Component,
    InlineSVGModule
  ]
})
export class MixedWidget4Component {
  @Input() color: string = '';
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() date: string = '';
  @Input() progress: string = '';
  constructor() {}
}
