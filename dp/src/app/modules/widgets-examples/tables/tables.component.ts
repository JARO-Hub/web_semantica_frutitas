import { Component, OnInit } from '@angular/core';
import {
  TablesWidget11Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget11/tables-widget11.component";
import {
  TablesWidget12Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget12/tables-widget12.component";
import {
  TablesWidget13Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget13/tables-widget13.component";
import {
  TablesWidget9Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget9/tables-widget9.component";
import {
  TablesWidget8Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget8/tables-widget8.component";
import {
  TablesWidget7Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget7/tables-widget7.component";
import {
  TablesWidget6Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget6/tables-widget6.component";
import {
  TablesWidget5Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget5/tables-widget5.component";
import {
  TablesWidget4Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget4/tables-widget4.component";
import {
  TablesWidget3Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget3/tables-widget3.component";
import {
  TablesWidget2Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget2/tables-widget2.component";
import {
  TablesWidget1Component
} from "../../../_buscador/partials/content/widgets/tables/tables-widget1/tables-widget1.component";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  imports: [
    TablesWidget11Component,
    TablesWidget12Component,
    TablesWidget13Component,
    TablesWidget9Component,
    TablesWidget8Component,
    TablesWidget7Component,
    TablesWidget6Component,
    TablesWidget5Component,
    TablesWidget4Component,
    TablesWidget3Component,
    TablesWidget2Component,
    TablesWidget1Component
  ]
})
export class TablesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
