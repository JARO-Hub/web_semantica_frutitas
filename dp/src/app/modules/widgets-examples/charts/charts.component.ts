import { Component } from '@angular/core';
import {
  ChartsWidget2Component
} from "../../../_buscador/partials/content/widgets/charts/charts-widget2/charts-widget2.component";
import {
  ChartsWidget1Component
} from "../../../_buscador/partials/content/widgets/charts/charts-widget1/charts-widget1.component";
import {
  ChartsWidget3Component
} from "../../../_buscador/partials/content/widgets/charts/charts-widget3/charts-widget3.component";
import {
  ChartsWidget4Component
} from "../../../_buscador/partials/content/widgets/charts/charts-widget4/charts-widget4.component";
import {
  ChartsWidget5Component
} from "../../../_buscador/partials/content/widgets/charts/charts-widget5/charts-widget5.component";
import {
  ChartsWidget7Component
} from "../../../_buscador/partials/content/widgets/charts/charts-widget7/charts-widget7.component";
import {
  ChartsWidget6Component
} from "../../../_buscador/partials/content/widgets/charts/charts-widget6/charts-widget6.component";
import {
  ChartsWidget8Component
} from "../../../_buscador/partials/content/widgets/charts/charts-widget8/charts-widget8.component";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  imports: [
    ChartsWidget2Component,
    ChartsWidget1Component,
    ChartsWidget3Component,
    ChartsWidget4Component,
    ChartsWidget5Component,
    ChartsWidget7Component,
    ChartsWidget6Component,
    ChartsWidget8Component
  ]
})
export class ChartsComponent {
  constructor() {}
}
