import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalPageComponent } from './pages/principal-page/principal-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { InformationHomePageComponent } from './pages/information-home-page/information-home-page.component';


@NgModule({
  declarations: [
    PrincipalPageComponent,
    MenuComponent,
    InformationHomePageComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    PrimengModule
  ]
})
export class PrincipalModule { }
