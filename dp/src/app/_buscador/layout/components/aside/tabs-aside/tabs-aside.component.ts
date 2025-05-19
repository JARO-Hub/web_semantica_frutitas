import { Component, Input, OnInit } from '@angular/core';

import { Tab, tabs } from '../tabs';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { NgClass, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "app-tabs-aside",
  templateUrl: "./tabs-aside.component.html",
  imports: [
    InlineSVGModule,
    NgbTooltip,
    NgClass,
    NgForOf
  ]
})
export class TabsAsideComponent implements OnInit {
  @Input() activeTab: Tab = tabs[0];
  @Input() setActiveTab: (
    activeTabLink:
      | 'projects'
      | 'menu'
      | 'subscription'
      | 'tasks'
      | 'notifications'
      | 'authors'
  ) => void;
  allTabs: ReadonlyArray<Tab> = [];
  constructor() {}

  ngOnInit(): void {
    this.allTabs = tabs;
  }
}
