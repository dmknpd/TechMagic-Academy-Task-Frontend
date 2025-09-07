import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Itinerary } from '../../../types/itinerary';

@Component({
  selector: 'app-itinerary-list-item',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './itinerary-list-item.component.html',
  styleUrl: './itinerary-list-item.component.css',
})
export class ItineraryListItemComponent {
  @Input() itinerary!: Itinerary;
}
