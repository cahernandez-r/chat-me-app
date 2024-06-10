import { Component } from '@angular/core';
import { UserDTO } from '../../../models/user';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-modal-chat',
	templateUrl: './modal-chat.component.html',
})
export class ModalChatComponent {

	userRecipient!: UserDTO;
	userSender!: UserDTO;

	constructor(
		private config: DynamicDialogConfig,
		private ref: DynamicDialogRef
	) {
		this.getParametersModal();
	}

	getParametersModal():void {
		this.userRecipient = this.config.data?.recipient;
		this.userSender = this.config.data?.sender;
	}

	onCloseModal():void {
		this.ref.close();
	}
}
