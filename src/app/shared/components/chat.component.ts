import { Component, Input } from '@angular/core';
import { WebSocketService } from '../services/web-socket/web-socket.service';
import { UserDTO } from 'src/app/modules/users/models/user';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

	@Input()
	historyChat: any[] = [];
	@Input()
	userRecipient!: UserDTO;
	userLogued!: UserDTO;
	message: string = "";

	constructor(private webSocketService: WebSocketService) {
	}

	onSendMessage(): void {
		this.historyChat.push({ message: this.message, transmitter: true }, { message: "Soy el otro mensaje", transmitter: false });
		this.webSocketService.sendMessage(this.message, "deiner");
		this.message = ""
	}
}
