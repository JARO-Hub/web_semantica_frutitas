import { Component, OnInit } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { DropdownMenu2Component } from "../../../dropdown-menus/dropdown-menu2/dropdown-menu2.component";

@Component({
  selector: "app-tables-widget12",
  templateUrl: "./tables-widget12.component.html",
  imports: [
    InlineSVGModule,
    DropdownMenu2Component
  ]
})
export class TablesWidget12Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
