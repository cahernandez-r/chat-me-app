import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/core/constants/api-urls';
import { UserDTO } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  validateUserExists(userName: string):Observable<boolean> {
    return this.http.get<boolean>(backendUrl(`users/validateExistsUserName/${userName}`))
  }

  validateSecurityWord(userName: string, securityWord: string):Observable<boolean> {
    return this.http.get<boolean>(backendUrl(`users/validateSecurityWord/${userName}/${securityWord}`));
  }

  createUser(userToCreate: UserDTO):Observable<UserDTO> {
    return this.http.post<UserDTO>(
      backendUrl(`users/createUser`),
      userToCreate);
  }
}
