import { Component, effect, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

import { ItineraryListItemComponent } from '../itinerary-list-item.component/itinerary-list-item.component';
import { ItineraryService } from '../../../../services/itinerary.service';
import { Itinerary } from '../../../../types/itinerary';
import { TourService } from '../../../../services/tour.service';

@Component({
  selector: 'app-itinerary-list',
  imports: [MatGridListModule, ItineraryListItemComponent],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.css',
})
export class ItineraryListComponent {
  private router = inject(Router);
  private itinerary = inject(ItineraryService);
  private tour = inject(TourService);

  itineraryDataList = toSignal(
    this.itinerary.getAll().pipe(
      map((response) => response.data ?? []),
      catchError((err) => {
        console.error('Error fetching itineraries:', err);
        return of([]);
      })
    ),
    { initialValue: [] }
  );

  selectItinerary(itinerary: Itinerary) {
    if (itinerary) {
      this.tour.setItinerary(itinerary);
      this.router.navigateByUrl('/new-tour/tour');
    }
  }
}
