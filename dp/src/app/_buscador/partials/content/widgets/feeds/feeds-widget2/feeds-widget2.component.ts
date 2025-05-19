import { Component, OnInit } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { DropdownMenu1Component } from "../../../dropdown-menus/dropdown-menu1/dropdown-menu1.component";

@Component({
  selector: "app-feeds-widget2",
  templateUrl: "./feeds-widget2.component.html",
  imports: [
    InlineSVGModule,
    DropdownMenu1Component
  ]
})
export class FeedsWidget2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
