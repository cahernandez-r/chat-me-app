import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatComponent } from './components/chat.component';
import { PrimengModule } from './primeng/primeng.module';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    ChatComponent
  ],
})
export class SharedModule {}
