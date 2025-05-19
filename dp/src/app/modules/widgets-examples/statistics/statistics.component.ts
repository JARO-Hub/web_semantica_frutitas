import { Component, OnInit } from '@angular/core';
import {
  StatsWidget5Component
} from "../../../_buscador/partials/content/widgets/stats/stats-widget5/stats-widget5.component";
import {
  StatsWidget1Component
} from "../../../_buscador/partials/content/widgets/stats/stats-widget1/stats-widget1.component";
import { NgStyle } from "@angular/common";
import {
  StatsWidget2Component
} from "../../../_buscador/partials/content/widgets/stats/stats-widget2/stats-widget2.component";
import {
  StatsWidget3Component
} from "../../../_buscador/partials/content/widgets/stats/stats-widget3/stats-widget3.component";
import {
  StatsWidget4Component
} from "../../../_buscador/partials/content/widgets/stats/stats-widget4/stats-widget4.component";
import {
  StatsWidget6Component
} from "../../../_buscador/partials/content/widgets/stats/stats-widget6/stats-widget6.component";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  imports: [
    StatsWidget5Component,
    StatsWidget1Component,
    NgStyle,
    StatsWidget2Component,
    StatsWidget3Component,
    StatsWidget4Component,
    StatsWidget6Component
  ],
  styleUrls: ["./statistics.component.scss"]
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
