import { Component, HostBinding, Input } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgClass, NgIf } from "@angular/common";
import { DropdownMenu1Component } from "../../dropdown-menus/dropdown-menu1/dropdown-menu1.component";

@Component({
  selector: "app-card5",
  templateUrl: "./card5.component.html",
  imports: [
    InlineSVGModule,
    NgClass,
    DropdownMenu1Component,
    NgIf
  ]
})
export class Card5Component {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() status: 'up' | 'down' = 'up';
  @Input() statusValue: number;
  @Input() statusDesc: string = '';
  @Input() progress: number = 100;
  @Input() progressType: string = '';
  @HostBinding('class') class = 'card h-100';

  constructor() {}
}
