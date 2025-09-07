import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ItineraryInfoComponent } from '../../info-blocks/itinerary-info.component/itinerary-info.component';
import { ItineraryService } from '../../../services/itinerary.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-itinerary-details',
  imports: [MatCardModule, MatButtonModule, ItineraryInfoComponent],
  templateUrl: './itinerary-details.component.html',
  styleUrl: './itinerary-details.component.css',
})
export class ItineraryDetailsComponent {
  private route = inject(ActivatedRoute);

  private client = inject(ItineraryService);

  private itineraryId = this.route.snapshot.paramMap.get('id');

  itineraryData = toSignal(
    this.client.getItineraryById(this.itineraryId!).pipe(
      map((response) => response.data ?? null),
      catchError((err) => {
        console.error('Error fetching itinerary:', err);
        return of(null);
      })
    ),
    { initialValue: null }
  );

  message = history.state.message;

  constructor() {
    history.replaceState({}, '');
  }
}
