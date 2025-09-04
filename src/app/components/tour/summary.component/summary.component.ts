import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { ClientInfoComponent } from './info-block/client-info.component/client-info.component';
import { ItineraryInfoComponent } from './info-block/itinerary-info.component/itinerary-info.component';
import { TourInfoComponent } from './info-block/tour-info.component/tour-info.component';
import { TourService } from '../../../services/tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary.component',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ClientInfoComponent,
    ItineraryInfoComponent,
    TourInfoComponent,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  private router = inject(Router);

  private tour = inject(TourService);

  tourInfoData = this.tour.getTourInfo();

  priceSum = this.tour.priceSum;
  discountSum = this.tour.discountSum;
  totalSum = this.tour.priceTotal;

  onConfirm() {
    const confirmed = window.confirm('Are you sure you want to confirm?');
    if (!confirmed) return;

    this.router.navigateByUrl('/tour-list', { state: { msg: `Tour successfully created!` } });
    //   this.tour.createTour().subscribe({
    //     next: (response) => {
    //       if (response.success) {
    //         console.log(response);
    //         this.tour.reset();
    //         this.router.navigateByUrl('/tours', { state: { msg: `Tour successfully created!` } });
    //       }
    //     },
    //     error: (err) => {
    //       console.error('error', err);
    //     },
    //   });
  }
}
