import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageDTO } from '../models/message-dto';

@Injectable({
	providedIn: 'root',
})
export class ChatStateService {

  private $stateChat : BehaviorSubject<MessageDTO> = new BehaviorSubject({} as MessageDTO)

  get stateChat(): Observable<MessageDTO> {
    return this.$stateChat.asObservable();
  }

  setStateChat(message: MessageDTO):void {
    this.$stateChat.next(message);
  }
}
