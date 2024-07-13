import { Component } from '@angular/core';
import { UserDTO } from '../../../models/user';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChatService } from 'src/app/shared/services/chat.service';
import { CreateChatRoom } from 'src/app/shared/models/create-chat-room-model';
import { CreateChatRoomResponse } from 'src/app/shared/models/create-chat-room-response';
import { ChatRoom } from 'src/app/shared/models/find-chat-room';
import { MessageDTO } from 'src/app/shared/models/message-dto';
import { Client } from '@stomp/stompjs';
import { ChatStateService } from 'src/app/shared/services/chat-state.service';
import { Subscription } from 'rxjs';

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
	subStateChat!: Subscription

	constructor(
		private config: DynamicDialogConfig,
		private ref: DynamicDialogRef,
		private chatService :ChatService,
		private chatStateService:ChatStateService
	) {
		this.getParametersModal();
		this.createOrFindChatRoom();
	}	
	
	ngOnInit(): void {
		this.subscribeMessages();
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

	subscribeMessages():void {
		this.subStateChat =  this.chatStateService.stateChat.subscribe((message) => {
			this.historyChat = this.historyChat.concat(message)
		})
	}	

	onCloseModal():void {
		this.subStateChat.unsubscribe();
		this.ref.close();
	}
}
