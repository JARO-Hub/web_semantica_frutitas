import { Component, Input, OnInit } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-base-tables-widget6",
  templateUrl: "./base-tables-widget6.component.html",
  imports: [
    InlineSVGModule,
    NgClass
  ]
})
export class BaseTablesWidget6Component implements OnInit {
  TABS: string[] = ['Month', 'Week', 'Day'];
  currentTab: string;
  @Input() cssClass: string;

  constructor() {}

  ngOnInit(): void {
    this.currentTab = this.TABS[2];
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }
}
