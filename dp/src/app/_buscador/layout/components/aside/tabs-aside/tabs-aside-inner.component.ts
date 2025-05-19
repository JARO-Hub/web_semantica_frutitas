import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { environment } from './../../../../../../environments/environment';

import { Tab, tabs } from '../tabs';
import { NavigationEnd, Router, NavigationCancel } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  MenuComponent,
  DrawerComponent,
  ToggleComponent,
  ScrollComponent,
} from '../../../../kt/components';
import { NgClass } from "@angular/common";
import { SubscriptionsTabComponent } from "../tabs/subscriptions-tab/subscriptions-tab.component";
import { MenuTabComponent } from "../tabs/menu-tab/menu-tab.component";
import { NotificationsTabComponent } from "../tabs/notifications-tab/notifications-tab.component";
import { AuthorsTabComponent } from "../tabs/authors-tab/authors-tab.component";
import { TasksTabComponent } from "../tabs/tasks-tab/tasks-tab.component";
import { ProjectsTabComponent } from "../tabs/projects-tab/projects-tab.component";
import { InlineSVGModule } from "ng-inline-svg-2";
@Component({
  selector: "app-tabs-aside-inner",
  templateUrl: "./tabs-aside-inner.component.html",
  imports: [
    NgClass,
    SubscriptionsTabComponent,
    MenuTabComponent,
    NotificationsTabComponent,
    AuthorsTabComponent,
    TasksTabComponent,
    ProjectsTabComponent,
    InlineSVGModule
  ]
})
export class TabsAsideInnerComponent implements OnDestroy {
  @Input() activeTab: Tab = tabs[0];
  appDocsUrl: string = environment.appPreviewDocsUrl;
  @ViewChild('ktTabsAsideScroll', { static: true })
  ktTabsAsideScroll: ElementRef;
  private unsubscribe: Subscription[] = [];

  constructor(private router: Router) {}

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.menuReinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization();
      DrawerComponent.reinitialization();
      ToggleComponent.reinitialization();
      ScrollComponent.reinitialization();
      if (this.ktTabsAsideScroll && this.ktTabsAsideScroll.nativeElement) {
        this.ktTabsAsideScroll.nativeElement.scrollTop = 0;
      }
    }, 50);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
