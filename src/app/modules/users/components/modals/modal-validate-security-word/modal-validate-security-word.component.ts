import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/user';
import { MessageService } from 'primeng/api';
import { SeverityMessages } from 'src/app/core/constants/enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-validate-security-word',
  templateUrl: './modal-validate-security-word.component.html',
  styleUrls: ['./modal-validate-security-word.component.scss']
})
export class ModalValidateSecurityWordComponent implements OnInit{

  securityWord: string = "";
  userExists: boolean = false;
  userName: string = "";
  loading: boolean = false;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private userService: UserService,
    private messageService: MessageService,
    private translate: TranslateService
    ) {
  }

  ngOnInit(): void {
    this.getDataDilog();
  }

  getDataDilog(): void {
    if (this.config.data) {
      this.userExists = this.config.data.userExists;
      this.userName = this.config.data.userName;
    }
  }

  validateCreateSecurityWord():void {
    this.loading = true;
    if (this.userExists) {
      this.validateSecurityWord();
      return;
    }
    this.createUser();
  }

  createUser():void {
    const userToCreate: UserDTO = {
      userName: this.userName,
      securityWord: this.securityWord
    }

    this.userService.createUser(userToCreate).subscribe({
      next:(response: UserDTO) => {
        this.showMessage(SeverityMessages.SUCCESS, this.translate.instant('messages.info.INFO001'));

      },
      error:(e) => console.log(e)

    }).add(() => this.loading = false);
  }

  validateSecurityWord():void {
    this.userService.validateSecurityWord(this.userName, this.securityWord).subscribe({
      next:(response: boolean) => {
        //Close modal an redirect if is true
      },
      error:(e) => console.log(e)

    }).add(() => this.loading = false);
  }

  close():void {
    this.ref.close();
  }

  showMessage(severity: string, message: string):void {
    this.messageService.add({
      severity: severity,
      detail: message,
    });
  }
}
