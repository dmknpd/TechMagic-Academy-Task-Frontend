import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Itinerary, ItineraryFormData } from '../../types/itinerary';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ItineraryService extends ApiService<Itinerary, ItineraryFormData> {
  protected override baseUrl = `${environment.backendHost}/api/itineraries`;
}
