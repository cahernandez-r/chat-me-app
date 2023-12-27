import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { FindPeopleComponent } from '../users/components/find-people/find-people.component';

const routes: Routes = [
  {
    path: "",
    component: PrincipalPageComponent,
    children: [
      {
        path: "find-people",
        component: FindPeopleComponent
      },
      {
        path: "chats",
        loadChildren: () => import('../chats/chats.module').then(m => m.ChatsModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
