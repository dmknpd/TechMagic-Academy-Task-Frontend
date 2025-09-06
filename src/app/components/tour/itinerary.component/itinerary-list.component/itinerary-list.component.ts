import { Component, computed, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ItineraryListItemComponent } from '../itinerary-list-item.component/itinerary-list-item.component';
import { ItineraryService } from '../../../../services/itinerary.service';
import { Itinerary } from '../../../../types/itinerary';
import { TourService } from '../../../../services/tour.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-itinerary-list',
  imports: [
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    ItineraryListItemComponent,
    RouterModule,
  ],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.css',
})
export class ItineraryListComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
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

  userRole = computed(() => this.auth.getUserRole());
  currentPath = computed(() => this.router.url);

  showAddItinerary = computed(() => {
    return this.userRole() === 'admin' && this.currentPath().startsWith('/itinerary');
  });
}
