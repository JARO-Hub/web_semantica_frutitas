import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { DrawerChatComponent } from './drawer-chat/drawer-chat.component';
import {
  DropdownMenusModule,
  ChatInnerModule,
  CardsModule,
} from '../../../_buscador/partials';
import {SharedModule} from "../../../_buscador/shared/shared.module";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    DropdownMenusModule,
    ChatInnerModule,
    CardsModule,
    SharedModule,
    ChatComponent,
    PrivateChatComponent,
    GroupChatComponent,
    DrawerChatComponent,
  ],
})
export class ChatModule {}
