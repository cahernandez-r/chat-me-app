import { Component } from '@angular/core';
import { UserDTO } from '../../../models/user';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-modal-chat',
	templateUrl: './modal-chat.component.html',
})
export class ModalChatComponent {

	userRecipient!: UserDTO;

	constructor(private config: DynamicDialogConfig) {
		this.getParametersModal();
	}

	getParametersModal():void {
		this.userRecipient = this.config.data?.recipient;
	}
}
