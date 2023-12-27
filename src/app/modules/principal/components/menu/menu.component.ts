import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  items: MenuItem[] | undefined;

    ngOnInit() {
      this.items = [
        {
          label: 'Find people',
          icon: 'pi pi-search',
        },
        {
          label: 'My Chats',
          icon: 'pi pi-comments',
        },
      ];
    }
}
