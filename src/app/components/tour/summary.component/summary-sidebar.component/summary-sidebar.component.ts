import { Component, inject, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { ClientInfoComponent } from '../info-block/client-info.component/client-info.component';
import { ItineraryInfoComponent } from '../info-block/itinerary-info.component/itinerary-info.component';
import { TourInfoComponent } from '../info-block/tour-info.component/tour-info.component';
import { TourService } from '../../../../services/tour.service';

@Component({
  selector: 'app-tour-info-sidebar',
  imports: [
    MatIconModule,
    MatButtonModule,
    ClientInfoComponent,
    ItineraryInfoComponent,
    TourInfoComponent,
    RouterModule,
  ],
  templateUrl: './summary-sidebar.component.html',
  styleUrl: './summary-sidebar.component.css',
})
export class SummarySidebarComponent {
  private tour = inject(TourService);

  isHidden = false;

  isAllDataFiled = this.tour.allDataFilled;
}
