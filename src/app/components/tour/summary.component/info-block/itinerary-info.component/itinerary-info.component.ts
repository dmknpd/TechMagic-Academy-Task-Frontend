import { Component, inject } from '@angular/core';
import { TourService } from '../../../../../services/tour.service';

@Component({
  selector: 'app-itinerary-info',
  imports: [],
  templateUrl: './itinerary-info.component.html',
  styleUrl: '../info-block.css',
})
export class ItineraryInfoComponent {
  private tour = inject(TourService);

  itineraryData = this.tour.getItinerary();
}
