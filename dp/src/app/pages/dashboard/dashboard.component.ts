import { Component, OnInit } from '@angular/core';
import {
  MixedWidget2Component
} from "../../_buscador/partials/content/widgets/mixed/mixed-widget2/mixed-widget2.component";
import {
  ListsWidget5Component
} from "../../_buscador/partials/content/widgets/lists/lists-widget5/lists-widget5.component";
import {
  MixedWidget10Component
} from "../../_buscador/partials/content/widgets/mixed/mixed-widget10/mixed-widget10.component";
import {
  MixedWidget11Component
} from "../../_buscador/partials/content/widgets/mixed/mixed-widget11/mixed-widget11.component";
import {
  ListsWidget3Component
} from "../../_buscador/partials/content/widgets/lists/lists-widget3/lists-widget3.component";
import {
  TablesWidget10Component
} from "../../_buscador/partials/content/widgets/tables/tables-widget10/tables-widget10.component";
import {
  ListsWidget2Component
} from "../../_buscador/partials/content/widgets/lists/lists-widget2/lists-widget2.component";
import {
  ListsWidget6Component
} from "../../_buscador/partials/content/widgets/lists/lists-widget6/lists-widget6.component";
import {
  ListsWidget4Component
} from "../../_buscador/partials/content/widgets/lists/lists-widget4/lists-widget4.component";
import {
  MixedWidget8Component
} from "../../_buscador/partials/content/widgets/mixed/mixed-widget8/mixed-widget8.component";
import {
  TablesWidget5Component
} from "../../_buscador/partials/content/widgets/tables/tables-widget5/tables-widget5.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  imports: [
    MixedWidget2Component,
    ListsWidget5Component,
    MixedWidget10Component,
    MixedWidget11Component,
    ListsWidget3Component,
    TablesWidget10Component,
    ListsWidget2Component,
    ListsWidget6Component,
    ListsWidget4Component,
    MixedWidget8Component,
    TablesWidget5Component
  ]
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
