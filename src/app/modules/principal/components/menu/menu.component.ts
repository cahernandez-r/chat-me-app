import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrincipalService } from '../../services/principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  items: MenuItem[] | undefined;

  constructor(
    private principalService: PrincipalService,
    private router: Router) {

  }

  ngOnInit() {
    this.fetchItemsMenu();
  }

  fetchItemsMenu():void {
    this.principalService.fetchAllResourcesMenu().subscribe({
      next: (response: MenuItem[]) => {
        response.forEach((resource) => resource.routerLink = `/${this.router.url.split('/')[1]}${resource.routerLink}`)
        this.items = response;
      },
      error: (e) => console.log(e)
    });
  }
}
