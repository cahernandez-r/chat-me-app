import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';


@NgModule({
  declarations: [
    PrincipalPageComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    PrimengModule
  ]
})
export class PrincipalModule { }
