import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { ClientService } from '../services/client.service';
import { AuthService } from '../services/auth.service';
import { Sidenav } from './sidenav/sidenav';
import { InfoSidebarComponent } from '../components/tour/info-sidebar.component/info-sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, MatIconModule, RouterOutlet, Sidenav, InfoSidebarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  auth = inject(AuthService);
  client = inject(ClientService);
  router = inject(Router);

  opened = true;

  isWelcomePage = false;
  isTourPages = false;

  constructor() {
    this.fetchAllClients();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = event.urlAfterRedirects === '/';
        this.isTourPages = event.urlAfterRedirects.startsWith('/new-tour');
      }
    });
  }

  fetchAllClients() {
    this.client.getAllClients().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
}
