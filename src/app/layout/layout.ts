import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { ClientService } from '../services/client.service';
import { AuthService } from '../services/auth.service';
import { Sidenav } from './sidenav/sidenav';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, MatIconModule, RouterOutlet, Sidenav],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  auth = inject(AuthService);
  client = inject(ClientService);
  router = inject(Router);

  opened = true;

  isWelcomePage = false;

  constructor() {
    this.fetchAllClients();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = event.urlAfterRedirects === '/';
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
