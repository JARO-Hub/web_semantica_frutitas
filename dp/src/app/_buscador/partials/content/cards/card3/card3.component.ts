import { Component, HostBinding, Input } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgClass, NgIf } from "@angular/common";

@Component({
  selector: "app-card3",
  templateUrl: "./card3.component.html",
  imports: [
    InlineSVGModule,
    NgClass,
    NgIf
  ]
})
export class Card3Component {
  @Input() color: string = '';
  @Input() avatar: string = '';
  @Input() online: boolean = false;
  @Input() name: string = '';
  @Input() job: string = '';
  @Input() avgEarnings: string = '';
  @Input() totalEarnings: string = '';
  @HostBinding('class') class = 'card';

  constructor() {}
}
