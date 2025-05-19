import { Component, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg-2";

type Tabs =
  | 'kt_table_widget_5_tab_1'
  | 'kt_table_widget_5_tab_2'
  | 'kt_table_widget_5_tab_3';

@Component({
  selector: "app-tables-widget5",
  templateUrl: "./tables-widget5.component.html",
  imports: [
    NgClass,
    InlineSVGModule
  ]
})
export class TablesWidget5Component implements OnInit {
  constructor() {}

  activeTab: Tabs = 'kt_table_widget_5_tab_1';

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }

  ngOnInit(): void {}
}
