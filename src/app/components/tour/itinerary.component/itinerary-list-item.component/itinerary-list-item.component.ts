import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-itinerary-list-item',
  imports: [MatGridListModule],
  templateUrl: './itinerary-list-item.component.html',
  styleUrl: './itinerary-list-item.component.css',
})
export class ItineraryListItemComponent {}
