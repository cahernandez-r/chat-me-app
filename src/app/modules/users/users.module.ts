import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { ModalValidateSecurityWordComponent } from './components/modals/modal-validate-security-word/modal-validate-security-word.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { FindPeopleComponent } from './components/find-people/find-people.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalChatComponent } from './components/modals/modal-chat/modal-chat.component';


@NgModule({
  declarations: [
    CreateUsersComponent,
    ModalValidateSecurityWordComponent,
    FindPeopleComponent,
    ModalChatComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PrimengModule,
    SharedModule
  ],
  providers: [
    DialogService,
    MessageService,
    HttpClient
  ]
})
export class UsersModule { }
