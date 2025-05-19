import { Component, OnInit } from '@angular/core';
import { PurchaseToolbarComponent } from "./purchase-toolbar/purchase-toolbar.component";
import { HelpDrawerComponent } from "./help-drawer/help-drawer.component";
import { ExploreMainDrawerComponent } from "./explore-main-drawer/explore-main-drawer.component";

@Component({
  selector: "app-engages",
  templateUrl: "./engages.component.html",
  imports: [
    PurchaseToolbarComponent,
    HelpDrawerComponent,
    ExploreMainDrawerComponent
  ],
  styleUrls: ["./engages.component.scss"]
})
export class EngagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
