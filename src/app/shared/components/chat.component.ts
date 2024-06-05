import { Component } from '@angular/core';
import { WebSocketService } from '../services/web-socket/web-socket.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

	nameReceiver: string = "fabio";
	message: string = "";
	historyChat: any[] = [];

	constructor(private webSocketService: WebSocketService) {
	}

	onSendMessage(): void {
		this.historyChat.push({ message: this.message, transmitter: true }, { message: "Soy el otro mensaje", transmitter: false });
		this.webSocketService.sendMessage(this.message, "deiner");
		this.message = ""
	}
}
