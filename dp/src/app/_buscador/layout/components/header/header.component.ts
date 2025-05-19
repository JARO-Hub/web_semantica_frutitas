import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../core/layout.service';
import { MenuComponent } from '../../../kt/components';
import { PageTitleComponent } from "./page-title/page-title.component";
import { NgClass, NgIf } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg-2";
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  imports: [
    PageTitleComponent,
    NgClass,
    InlineSVGModule,
    TopbarComponent
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerContainerCssClasses: string = '';
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef;

  private unsubscribe: Subscription[] = [];

  constructor(private layout: LayoutService, private router: Router) {
    this.routingChanges();
  }

  ngOnInit(): void {
    this.headerContainerCssClasses =
      this.layout.getStringCSSClasses('headerContainer');
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        MenuComponent.reinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {}
}
