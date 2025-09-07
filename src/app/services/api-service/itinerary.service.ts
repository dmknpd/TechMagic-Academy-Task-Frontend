import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../types/res';
import { Itinerary, ItineraryFormData } from '../../types/itinerary';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ItineraryService extends ApiService<Itinerary, ItineraryFormData> {
  protected override baseUrl = `${environment.backendHost}/api/itineraries`;
}
