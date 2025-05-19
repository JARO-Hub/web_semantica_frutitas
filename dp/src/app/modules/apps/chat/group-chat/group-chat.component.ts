import { Component, HostBinding, OnInit } from '@angular/core';
import { ChatInnerComponent } from "../../../../_buscador/partials/content/chat-inner/chat-inner.component";
import {
  DropdownMenu1Component
} from "../../../../_buscador/partials/content/dropdown-menus/dropdown-menu1/dropdown-menu1.component";

@Component({
  selector: "app-group-chat",
  templateUrl: "./group-chat.component.html",
  styleUrls: ["./group-chat.component.scss"],
  imports: [
    ChatInnerComponent,
    DropdownMenu1Component
  ]
})
export class GroupChatComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column flex-lg-row';

  constructor() {}

  ngOnInit(): void {}
}
