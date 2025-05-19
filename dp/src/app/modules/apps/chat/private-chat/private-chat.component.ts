import { Component, HostBinding, OnInit } from '@angular/core';
import { ChatInnerComponent } from "../../../../_buscador/partials/content/chat-inner/chat-inner.component";
import {
  DropdownMenu1Component
} from "../../../../_buscador/partials/content/dropdown-menus/dropdown-menu1/dropdown-menu1.component";
import { KeeniconComponent } from "../../../../_buscador/shared/keenicon/keenicon.component";

@Component({
  selector: "app-private-chat",
  templateUrl: "./private-chat.component.html",
  styleUrls: ["./private-chat.component.scss"],
  imports: [
    ChatInnerComponent,
    DropdownMenu1Component,
    KeeniconComponent
  ]
})
export class PrivateChatComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column flex-lg-row';

  constructor() {}

  ngOnInit(): void {}
}
