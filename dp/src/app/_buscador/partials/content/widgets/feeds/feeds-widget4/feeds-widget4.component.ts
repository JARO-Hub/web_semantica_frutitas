import { Component, OnInit } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { DropdownMenu1Component } from "../../../dropdown-menus/dropdown-menu1/dropdown-menu1.component";

@Component({
  selector: "app-feeds-widget4",
  templateUrl: "./feeds-widget4.component.html",
  imports: [
    InlineSVGModule,
    DropdownMenu1Component
  ]
})
export class FeedsWidget4Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
