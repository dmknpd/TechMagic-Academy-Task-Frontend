import { Component, inject } from '@angular/core';

import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-tour-info-sidebar',
  imports: [],
  templateUrl: './tour-info-sidebar.component.html',
  styleUrl: './tour-info-sidebar.component.css',
})
export class TourInfoSidebarComponent {
  private tour = inject(TourService);
}
