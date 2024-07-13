import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { MessageRequest } from '../models/message-request';
import { ChatStateService } from './chat-state.service';
import { MessageDTO } from '../models/message-dto';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
	providedIn: 'root',
})
export class WebSocketService {
	
	clientWS!: Client;
	constructor(private chatStateService: ChatStateService) {

	}

	connectSocket(userName: string | undefined | null) {
		const urlWhitoutPrefix = environment.url_back_end.replace(/^https?:\/\//, '')
		if(!userName || this.clientWS) {
			console.error("Its not posible conect to websocket username is null");
			return;
		}
		this.clientWS = new Client({
			brokerURL: `ws://${urlWhitoutPrefix}ws`,
			onConnect: () => {
			this.clientWS.subscribe( `/queue/messages-${userName}`, message =>{
				this.chatStateService.setStateChat(JSON.parse(message.body) as MessageDTO)

				}
			  );
			  
			},
			onStompError:(e) => console.log(e)
		  });
		this.clientWS.activate();
	}
	

	sendMessage(payload: MessageRequest, recipient: string): void {
		this.clientWS.publish({ destination: `/app/chat-${recipient}`, body: JSON.stringify(payload) });
	}
}
