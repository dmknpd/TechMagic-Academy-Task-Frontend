import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { ItineraryListItemComponent } from '../itinerary-list-item.component/itinerary-list-item.component';

@Component({
  selector: 'app-itinerary-list',
  imports: [MatGridListModule, ItineraryListItemComponent],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.css',
})
export class ItineraryListComponent {}
