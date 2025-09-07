import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Sidenav } from './sidenav/sidenav';
import { SummarySidebarComponent } from '../components/tour/summary.component/summary-sidebar.component/summary-sidebar.component';
import { LoadingService } from '../services/loading.service';
import { LoaderComponent } from '../components/loader.component/loader.component';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatIconModule,
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
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

  mode: 'side' | 'over' = window.innerWidth >= 1500 ? 'side' : 'over';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.mode = window.innerWidth >= 1500 ? 'side' : 'over';
    this.isOpen = window.innerWidth >= 1500;
  }

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isTourPages = url.startsWith('/new-tour') && !url.startsWith('/new-tour/summary');
      }
    });
  }
}
