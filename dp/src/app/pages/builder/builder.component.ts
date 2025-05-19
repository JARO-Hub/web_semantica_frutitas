import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { LayoutService } from '../../_buscador/layout';
import { NgClass, NgIf } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg-2";
import { AppRoutingModule } from "../../app-routing.module";

type Tabs = 'Header' | 'Toolbar' | 'PageTitle' | 'Aside' | 'Content' | 'Footer';

@Component({
  selector: "app-builder",
  templateUrl: "./builder.component.html",
  imports: [
    FormsModule,
    NgClass,
    InlineSVGModule,
    AppRoutingModule,
    NgIf
  ]
})
export class BuilderComponent implements OnInit {
  activeTab: Tabs = 'Header';
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  resetPreview(): void {
    this.resetLoading = true;
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.configLoading = true;
    this.layout.setConfig(this.model);
    location.reload();
  }
}
