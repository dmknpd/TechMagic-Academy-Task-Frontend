import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../services/auth.service';
import { Sidenav } from './sidenav/sidenav';
import { SummarySidebarComponent } from '../components/tour/summary.component/summary-sidebar.component/summary-sidebar.component';
import { LoadingService } from '../services/loading.service';
import { LoaderComponent } from '../components/loader.component/loader.component';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatIconModule,
    RouterOutlet,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    Sidenav,
    SummarySidebarComponent,
    LoaderComponent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private router = inject(Router);
  private loading = inject(LoadingService);

  isOpen = true;
  isTourPages = false;

  isLoading = this.loading.getLoading();

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isTourPages = url.startsWith('/new-tour') && !url.startsWith('/new-tour/summary');
      }
    });
  }
}
