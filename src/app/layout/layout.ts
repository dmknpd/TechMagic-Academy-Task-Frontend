import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { ClientService } from '../services/client.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, MatIconModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  auth = inject(AuthService);
  client = inject(ClientService);
  router = inject(Router);

  opened = true;

  isWelcomePage = true;
  userEmail = this.auth.getUserEmail();

  constructor() {
    this.fetchAllClients();
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

  onLogout() {
    this.auth.logout().subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.log('error: ', error);
      },
    });
  }
}
