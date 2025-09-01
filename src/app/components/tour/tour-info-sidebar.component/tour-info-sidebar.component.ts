import { Component, inject, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-tour-info-sidebar',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './tour-info-sidebar.component.html',
  styleUrl: './tour-info-sidebar.component.css',
})
export class TourInfoSidebarComponent {
  private tour = inject(TourService);

  isHidden = false;

  clientData = this.tour.getClient();
}
