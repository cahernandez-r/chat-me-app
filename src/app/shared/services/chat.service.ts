import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/core/constants/api-urls';
import { CreateChatRoom } from '../models/create-chat-room-model';
import { CreateChatRoomResponse } from '../models/create-chat-room-response';
import { ChatRoom } from '../models/find-chat-room';

@Injectable({
	providedIn: 'root',
})
export class ChatService {

    constructor(private http: HttpClient) {

    }

    findChatRoom(idSender: number, idRecipient: number): Observable<ChatRoom> {
        return this.http.get<ChatRoom>(backendUrl(`chats/exists/${idSender}/${idRecipient}`)
        );
    }

    createChatRoom(request: CreateChatRoom): Observable<CreateChatRoomResponse> {
        return this.http.post<CreateChatRoomResponse>(backendUrl(`chats/save`),
            request
        );
    }
}
