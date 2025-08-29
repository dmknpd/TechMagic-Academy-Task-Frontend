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
  router = inject(Router);

  opened = true;

  isTourPages = false;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isTourPages = event.urlAfterRedirects.startsWith('/new-tour');
      }
    });
  }
}
