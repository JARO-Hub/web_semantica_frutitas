import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgFor, NgIf } from "@angular/common";

type Demo = {
  key: string
  title: string;
  description: string;
  published: boolean;
  thumbnail: string;
};

type Demos = {
  [key: string]: Demo;
};

@Component({
  selector: "app-explore-main-drawer",
  templateUrl: "./explore-main-drawer.component.html",
  imports: [
    InlineSVGModule,
    NgIf,
    NgFor
  ]
})
export class ExploreMainDrawerComponent implements OnInit {
  appThemeName: string = environment.appThemeName;
  appPurchaseUrl: string = environment.appPurchaseUrl;
  appPreviewUrl: string = environment.appPreviewUrl;
  appDemos: ReadonlyArray<Demo> = Object.keys(environment.appDemos).map((key: string) => {
    return {
      // @ts-ignore
      ...environment.appDemos[key],
      key
    }
  });

  constructor() {}

  ngOnInit(): void {}
}
