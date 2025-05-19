import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NgClass } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg-2";

@Component({
  selector: "app-header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
  imports: [
    NgClass,
    InlineSVGModule,
    RouterLinkActive,
    RouterLink
  ]
})
export class HeaderMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  calculateMenuItemCssClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'active' : '';
  }
}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, url: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
};
