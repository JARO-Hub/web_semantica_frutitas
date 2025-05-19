import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  imports: [
    RouterOutlet
  ],
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
