import { Component, HostBinding } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";

@Component({
  selector: "app-quick-links-inner",
  templateUrl: "./quick-links-inner.component.html",
  imports: [
    InlineSVGModule
  ]
})
export class QuickLinksInnerComponent {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  constructor() {}
}
