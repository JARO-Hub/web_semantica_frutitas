import { Component, Input } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-stats-widget5",
  templateUrl: "./stats-widget5.component.html",
  imports: [
    InlineSVGModule,
    NgClass
  ]
})
export class StatsWidget5Component {
  @Input() svgIcon = '';
  @Input() iconColor = '';
  @Input() color = '';
  @Input() description = '';
  @Input() title = '';

  constructor() {}
}
