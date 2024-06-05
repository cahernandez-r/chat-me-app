import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';

@Injectable({
	providedIn: 'root',
})
export class WebSocketService {
	
	clientWS!: Client;
	constructor() {
	}
	connectSocket(userName: string) {
		this.clientWS = new Client({
			brokerURL: 'ws://localhost:7001/ws',
			onConnect: () => {
			this.clientWS.subscribe( `/user/${userName}`, message =>
				console.log(`Received: ${message.body}`)
			  );
			  
			},
			onStompError:(e) => console.log(e)
		  });
		this.clientWS.activate();
	}

	sendMessage(message: string, user: string): void {
		this.clientWS.publish({ destination: `/user/${user}`, body: message });
	}
}
