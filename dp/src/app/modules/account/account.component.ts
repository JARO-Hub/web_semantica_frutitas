import { Component, OnInit } from '@angular/core';
import { KeeniconComponent } from "../../_buscador/shared/keenicon/keenicon.component";
import {
  DropdownMenu1Component
} from "../../_buscador/partials/content/dropdown-menus/dropdown-menu1/dropdown-menu1.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  imports: [
    KeeniconComponent,
    DropdownMenu1Component,
    RouterOutlet
  ]
})
export class AccountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
