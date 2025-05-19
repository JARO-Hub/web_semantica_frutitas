import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NgStyle } from "@angular/common";

// const BODY_CLASSES = ['bgi-size-cover', 'bgi-position-center', 'bgi-no-repeat'];

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "<body[root]>",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  imports: [
    RouterOutlet,
    NgStyle
  ]
})
export class AuthComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    // BODY_CLASSES.forEach((c) => document.body.classList.add(c));
  }

  ngOnDestroy() {
    // BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
  }
}
