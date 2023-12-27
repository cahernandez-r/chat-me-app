import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { PrincipalChatsComponent } from './pages/principal-chats/principal-chats.component';


@NgModule({
  declarations: [
    PrincipalChatsComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule
  ]
})
export class ChatsModule { }
