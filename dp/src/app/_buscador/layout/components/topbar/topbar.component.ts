import { Component } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { ThemeModeSwitcherComponent } from "../../../partials/layout/theme-mode-switcher/theme-mode-switcher.component";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  imports: [
    InlineSVGModule,
    ThemeModeSwitcherComponent
  ]
})
export class TopbarComponent {}
