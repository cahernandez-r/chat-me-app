import { Component } from '@angular/core';
import { UserDTO } from '../../../models/user';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChatService } from 'src/app/shared/services/chat.service';
import { CreateChatRoom } from 'src/app/shared/models/create-chat-room-model';
import { CreateChatRoomResponse } from 'src/app/shared/models/create-chat-room-response';
import { ChatRoom } from 'src/app/shared/models/find-chat-room';
import { MessageDTO } from 'src/app/shared/models/message-dto';
import { Client } from '@stomp/stompjs';

@Component({
	selector: 'app-modal-chat',
	templateUrl: './modal-chat.component.html',
})
export class ModalChatComponent {

	userRecipient!: UserDTO;
	userSender!: UserDTO;
	uuidChat!: string;
	historyChat: MessageDTO [] = [];
	clientWS!: Client;

	constructor(
		private config: DynamicDialogConfig,
		private ref: DynamicDialogRef,
		private chatService :ChatService,
	) {
		this.getParametersModal();
		this.createOrFindChatRoom();
	}

	ngOnInit(): void {
		// this.activateConnectionToSocket();
	}
	

	getParametersModal():void {
		this.userRecipient = this.config.data?.recipient;
		this.userSender = this.config.data?.sender;
	}

	createOrFindChatRoom() {
		if (!this.userRecipient.id || !this.userSender.id){
			this.onCloseModal();
			return;
		}
		
		const objToSave: CreateChatRoom = {
			idRecipient: this.userRecipient.id,
			idSender: this.userSender.id
		};

		this.chatService.findChatRoom(this.userSender.id, this.userRecipient.id).subscribe( {
			next:(chatRoom: ChatRoom) => {
				if (!chatRoom.existChat) {

					this.chatService.createChatRoom(objToSave).subscribe(
						{
							next: (response: CreateChatRoomResponse) => {
								console.log(response)
								this.uuidChat = response.uuid
							}
						}
					)
				}
				this.historyChat = chatRoom.messages ?? [];
				this.uuidChat = chatRoom.uuidChat;
			}
		});
	}

	//Method to findChatRoom
	// onRecieveMessage():void {
	// 	this.clientWS.onConnect((message) =>
	// 	console.log(message)
	// 	)
	// }	

	onCloseModal():void {
		this.ref.close();
	}
}
