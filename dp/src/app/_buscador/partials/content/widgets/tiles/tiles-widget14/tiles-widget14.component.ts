import { Component, Input } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-tiles-widget14",
  templateUrl: "./tiles-widget14.component.html",
  imports: [
    InlineSVGModule,
    NgClass
  ]
})
export class TilesWidget14Component {
  @Input() cssClass = '';
  constructor() {}
}
