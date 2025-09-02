import { Component, inject } from '@angular/core';
import { ItineraryService } from '../../../services/itinerary.service';
import { ItineraryListComponent } from './itinerary-list.component/itinerary-list.component';

@Component({
  selector: 'app-itinerary',
  imports: [ItineraryListComponent],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.css',
})
export class ItineraryComponent {}
