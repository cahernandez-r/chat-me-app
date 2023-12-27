import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalChatsComponent } from './pages/principal-chats/principal-chats.component';

const routes: Routes = [
  {
    path: "",
    component: PrincipalChatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
