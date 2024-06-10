import { Component } from '@angular/core';
import { StorageKeys } from 'src/app/core/constants/enums';
import { UserDTO } from 'src/app/modules/users/models/user';
import { WebSocketService } from 'src/app/shared/services/web-socket/web-socket.service';

@Component({
	selector: 'app-principal-page',
	templateUrl: './principal-page.component.html',
	styleUrls: ['./principal-page.component.scss']
})
export class PrincipalPageComponent {

	userLogued!: UserDTO;
	constructor(private webSokcetService: WebSocketService) {

		this.getUserLogued();
		if (!this.userLogued)return;
		this.webSokcetService.connectSocket(this.userLogued?.userName)
	}

	getUserLogued():UserDTO | null {
		const jsonUser: string | null = sessionStorage.getItem(StorageKeys.INFORMATION_USER);;
		if (!jsonUser) return null;
		this.userLogued = JSON.parse(jsonUser);
		return this.userLogued;
	}
}
