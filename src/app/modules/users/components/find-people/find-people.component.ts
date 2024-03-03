import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user';
import { StorageKeys } from 'src/app/core/constants/enums';
import { FindPeopleResponse } from '../../models/find-people-result';
import { FilterDataView } from '../../models/filter-data-view';

@Component({
  selector: 'app-find-people',
  templateUrl: './find-people.component.html',
  styleUrls: ['./find-people.component.scss']
})
export class FindPeopleComponent implements OnInit {

  users: UserDTO[] = [];
  totalRecords: number = 0;
  first: number = 0;
  selectedSize: number = 5;
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

  }

  lazyEventFindPeople(event: any) {
    this.first = event.first;
    const selectedSize = event.rows;
    const selectedPage = Math.floor(this.first / this.selectedSize);
    const objectPagination: FilterDataView = {
      pageNumber: selectedPage,
      pageSize: selectedSize
    }
    this.findPeople(objectPagination);
  }

  findPeople(filter: FilterDataView):void {
    const jsonUser: string | null = sessionStorage.getItem(StorageKeys.INFORMATION_USER);
    if (!jsonUser) return;
    const userInfo: UserDTO = JSON.parse(jsonUser);
    
    this.sendRequestFetchPeople(userInfo, filter);
  }

  sendRequestFetchPeople(userInfo: UserDTO, filter: FilterDataView):void {
    if (!userInfo.userName) return;
    this.userService.findPeople(userInfo.userName, filter).subscribe({
      next : (response: FindPeopleResponse) => {
        if (response.totalElements && response.users) {
          this.users = response.users;
          this.totalRecords = response.totalElements;
        }
      }
    });
  }
}
