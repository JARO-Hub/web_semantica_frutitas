import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { InlineSVGModule } from "ng-inline-svg-2";
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";

@Component({
  selector: "app-aside-menu",
  templateUrl: "./aside-menu.component.html",
  styleUrls: ["./aside-menu.component.scss"],
  imports: [
    InlineSVGModule,
    RouterLinkActive,
    RouterModule
  ]
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor() {}

  ngOnInit(): void {}
}
