import { Component, OnInit } from '@angular/core';
import { Card1Component } from "../../../../_buscador/partials/content/cards/card1/card1.component";

@Component({
  selector: "app-drawer-chat",
  templateUrl: "./drawer-chat.component.html",
  styleUrls: ["./drawer-chat.component.scss"],
  imports: [
    Card1Component
  ]
})
export class DrawerChatComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
