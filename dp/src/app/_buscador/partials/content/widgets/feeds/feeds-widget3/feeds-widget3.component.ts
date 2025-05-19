import { Component, OnInit } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { DropdownMenu2Component } from "../../../dropdown-menus/dropdown-menu2/dropdown-menu2.component";

@Component({
  selector: "app-feeds-widget3",
  templateUrl: "./feeds-widget3.component.html",
  imports: [
    InlineSVGModule,
    DropdownMenu2Component
  ]
})
export class FeedsWidget3Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
