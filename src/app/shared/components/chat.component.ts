import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  nameReceiver: string = "fabio";
  message: string = "";
  historyChat:  any[] = [];


  onSendMessage():void {
    this.historyChat.push({message: this.message, transmitter: true}, {message: "Soy el otro mensaje", transmitter: false});
    this.message = ""
  }
}
