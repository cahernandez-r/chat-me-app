import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/core/constants/api-urls';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private http: HttpClient) { }

  fetchAllResourcesMenu():Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(backendUrl(`resources/findAll`))
  }
}
