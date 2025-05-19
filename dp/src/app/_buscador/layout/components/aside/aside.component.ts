import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router, RouterModule } from "@angular/router";
import { Subscription } from 'rxjs';
import { KTHelpers } from 'src/app/_buscador/kt';
import { LayoutService } from '../../core/layout.service';
import { Tab, tabs } from './tabs';
import { TabsAsideComponent } from "./tabs-aside/tabs-aside.component";
import { InlineSVGModule } from "ng-inline-svg-2";
import {
  QuickLinksInnerComponent
} from "../../../partials/layout/extras/dropdown-inner/quick-links-inner/quick-links-inner.component";
import {
  NotificationsInnerComponent
} from "../../../partials/layout/extras/dropdown-inner/notifications-inner/notifications-inner.component";
import { UserInnerComponent } from "../../../partials/layout/extras/dropdown-inner/user-inner/user-inner.component";
import { TabsAsideInnerComponent } from "./tabs-aside/tabs-aside-inner.component";
import { NgFor, NgIf } from "@angular/common";
import { AppRoutingModule } from "../../../../app-routing.module";

@Component({

  selector: "app-aside",
  templateUrl: "./aside.component.html",
  styleUrls: ["./aside.component.scss"],
  imports: [
    TabsAsideComponent,
    InlineSVGModule,
    QuickLinksInnerComponent,
    NotificationsInnerComponent,
    UserInnerComponent,
    TabsAsideInnerComponent,
    NgIf,
    RouterModule
  ]
})
export class AsideComponent implements OnInit, OnDestroy {
  activeTab: Tab = tabs[0];
  asideMenuSecondary: boolean = true;
  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.asideMenuSecondary = this.layout.getProp(
      'aside.secondaryDisplay'
    ) as boolean;
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        KTHelpers.menuReinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  setActiveTab = (
    activeTabLink:
      | 'projects'
      | 'menu'
      | 'subscription'
      | 'tasks'
      | 'notifications'
      | 'authors'
  ) => {
    const tab = tabs.find((t) => t.link === activeTabLink);
    if (tab) {
      this.activeTab = tab;
      this.cd.detectChanges();
      KTHelpers.menuReinitialization();
    }
  };

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
