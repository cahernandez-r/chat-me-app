import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../services/user.service';
import { ModalValidateSecurityWordComponent } from '../modals/modal-validate-security-word/modal-validate-security-word.component';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent {

  userName: string = "";
  loading: boolean = false;

  constructor(private router: Router, private dialogService: DialogService, private userService: UserService) {

  }

  createUserOrLogin():void {
    this.loading = true;
    this.validateUserExists(this.userName);
  }

  validateUserExists(userName: string):void {
    this.userService.validateUserExists(userName).subscribe({

      next:(response: boolean) => {
        this.openModalSecurityWord(response);
      },
      error:(e) => console.log(e)

    }).add(() => this.loading = false);
  }

  openModalSecurityWord(userExistsInBd: boolean): void {
    const ref: DynamicDialogRef = this.dialogService.open(ModalValidateSecurityWordComponent, {
      //header: "Validate security word",
      width: "30%",
      height: "35%",
      closable: false,
      data: {
        userExists: userExistsInBd,
        userName: this.userName
      }
    });

    this.onCloseModal(ref);
  }

  onCloseModal(ref: DynamicDialogRef):void {
    ref.onClose.subscribe((response) => {
      if (response) {
        //navigate home app
        this.router.navigate(['home'])
      }
    });
  }
}
