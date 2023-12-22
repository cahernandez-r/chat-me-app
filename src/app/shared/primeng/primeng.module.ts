import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    AccordionModule,
    AvatarModule,
    FormsModule,
    DynamicDialogModule,
    ToastModule,
    TooltipModule,
    TranslateModule
  ],
})
export class PrimengModule { }