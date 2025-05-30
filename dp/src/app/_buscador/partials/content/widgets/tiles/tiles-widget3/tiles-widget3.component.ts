import { Component, Input } from '@angular/core';
import { NgClass, NgStyle } from "@angular/common";

@Component({
  selector: "app-tiles-widget3",
  templateUrl: "./tiles-widget3.component.html",
  imports: [
    NgStyle,
    NgClass
  ]
})
export class TilesWidget3Component {
  @Input() cssClass = '';
  @Input() widgetHeight = '130px';

  constructor() {}
}
