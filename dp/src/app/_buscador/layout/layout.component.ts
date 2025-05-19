import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { LayoutService } from './core/layout.service';
import { LayoutInitService } from './core/layout-init.service';
import { NgClass, NgIf } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { ContentComponent } from "./components/content/content.component";
import { AsideComponent } from "./components/aside/aside.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ScriptsInitComponent } from "./components/scripts-init/scripts-init.component";
import { LayoutScrollTopComponent } from "../partials/layout/extras/scroll-top/scroll-top.component";
import { ActivityDrawerComponent } from "../partials/layout/drawers/activity-drawer/activity-drawer.component";
import { MessengerDrawerComponent } from "../partials/layout/drawers/messenger-drawer/messenger-drawer.component";
import { EngagesComponent } from "../partials/layout/engages/engages.component";
import { MainModalComponent } from "../partials/layout/modals/main-modal/main-modal.component";
import { InviteUsersModalComponent } from "../partials/layout/modals/invite-users-modal/invite-users-modal.component";
import { UpgradePlanModalComponent } from "../partials/layout/modals/upgrade-plan-modal/upgrade-plan-modal.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  imports: [
    NgClass,
    HeaderComponent,
    ContentComponent,
    AsideComponent,
    FooterComponent,
    ScriptsInitComponent,
    LayoutScrollTopComponent,
    ActivityDrawerComponent,
    MessengerDrawerComponent,
    EngagesComponent,
    MainModalComponent,
    InviteUsersModalComponent,
    UpgradePlanModalComponent,
    NgIf,
    RouterOutlet
  ]
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // Public variables
  selfLayout = 'default';
  asideSelfDisplay: true;
  asideMenuStatic: true;
  contentClasses = '';
  contentContainerClasses = '';
  toolbarDisplay = true;
  contentExtended: false;
  asideCSSClasses: string;
  asideHTMLAttributes: any = {};
  headerMobileClasses = '';
  headerMobileAttributes = {};
  footerDisplay: boolean;
  footerCSSClasses: string;
  headerCSSClasses: string;
  headerHTMLAttributes: any = {};
  // offcanvases
  extrasSearchOffcanvasDisplay = false;
  extrasNotificationsOffcanvasDisplay = false;
  extrasQuickActionsOffcanvasDisplay = false;
  extrasCartOffcanvasDisplay = false;
  extrasUserOffcanvasDisplay = false;
  extrasQuickPanelDisplay = false;
  extrasScrollTopDisplay = false;
  asideDisplay: boolean;
  @ViewChild('ktAside', { static: true }) ktAside: ElementRef;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  constructor(
    private initService: LayoutInitService,
    private layout: LayoutService
  ) {
    this.initService.init();
  }

  ngOnInit(): void {
    // build view by layout config settings
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.toolbarDisplay = this.layout.getProp('toolbar.display') as boolean;
    this.contentContainerClasses = this.layout.getStringCSSClasses('contentContainer');
    this.asideCSSClasses = this.layout.getStringCSSClasses('aside');
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('headerMenu');
    this.footerCSSClasses = this.layout.getStringCSSClasses('footer')
  }

  ngAfterViewInit(): void {
    if (this.ktHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.ktHeader.nativeElement.attributes[key] =
            this.headerHTMLAttributes[key];
        }
      }
    }
  }
}
