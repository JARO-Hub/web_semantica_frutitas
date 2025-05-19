import { Component } from '@angular/core';
import { Card4Component } from "../../../_buscador/partials/content/cards/card4/card4.component";
import { KeeniconComponent } from "../../../_buscador/shared/keenicon/keenicon.component";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  imports: [
    Card4Component,
    KeeniconComponent
  ]
})
export class DocumentsComponent {
  constructor() {}
}
