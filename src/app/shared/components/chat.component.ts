import { Component, Input } from '@angular/core';
import { WebSocketService } from '../services/web-socket/web-socket.service';
import { UserDTO } from 'src/app/modules/users/models/user';
import { MessageRequest } from '../models/message-request';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

	@Input()
	historyChat: MessageRequest[] = [];
	@Input()
	userRecipient!: UserDTO;
	@Input()
	userSender!: UserDTO;
	@Input()
	uuidChat!: string;
	
	message: string = "";

	constructor(private webSocketService: WebSocketService) {
	}

	onSendMessage(): void {
		if (!this.userSender.userName)return;
		this.historyChat.push({ message: this.message, idSender: this.userSender.id, idRecipient: this.userRecipient.id }, { message: "Soy el otro mensaje", idSender: this.userRecipient.id, idRecipient: this.userSender.id});
		const messageRequest: MessageRequest = {
			idRecipient: this.userRecipient.id,
			idSender: this.userSender.id,
			message: this.message,
			uuidChat: "",
		}
		if (this.userSender && this.userRecipient){
			this.webSocketService.sendMessage(messageRequest, this.userRecipient.userName ?? "", this.userSender.userName);
			this.message = ""
		}
	}
}
