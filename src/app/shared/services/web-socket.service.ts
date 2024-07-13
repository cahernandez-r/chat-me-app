import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { MessageRequest } from '../models/message-request';

@Injectable({
	providedIn: 'root',
})
export class WebSocketService {
	
	clientWS!: Client;
	constructor() {

	}

	connectSocket(userName: string | undefined | null) {
		if(!userName || this.clientWS) {
			console.error("Its not posible conect to websocket username is null");
			return;
		}
		this.clientWS = new Client({
			brokerURL: 'ws://localhost:7001/ws',
			onConnect: () => {
				console.log("connected")
			this.clientWS.subscribe( `/queue/messages-${userName}`, message =>
				console.log(`Received: ${message.body}`)
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
