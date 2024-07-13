import { Component, Input } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { UserDTO } from 'src/app/modules/users/models/user';
import { MessageRequest } from '../models/message-request';
import { MessageDTO } from '../models/message-dto';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

	@Input()
	historyChat: MessageDTO[] = [];
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
		const messageRequest: MessageRequest = {
			idRecipient: this.userRecipient.id,
			idSender: this.userSender.id,
			message: this.message,
			uuidChat: this.uuidChat,
		}
		if (this.userSender && this.userRecipient){
			this.webSocketService.sendMessage(messageRequest, this.userRecipient.userName ?? "");
			this.historyChat.push({ ...messageRequest as MessageDTO})
			this.message = ""
		}
	}
}
