import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../types/res';
import { Itinerary, ItineraryFormData } from '../types/itinerary';

const BASE_URL = `${environment.backendHost}/api/itineraries`;

@Injectable({ providedIn: 'root' })
export class ItineraryService {
  private http = inject(HttpClient);

  getAll(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>(BASE_URL);
  }

  getByCountry(country: string): Observable<Itinerary> {
    return this.http.get<Itinerary>(`${BASE_URL}/${country}`);
  }

  create(data: ItineraryFormData): Observable<ApiResponse<Itinerary>> {
    return this.http.post<ApiResponse<Itinerary>>(`${BASE_URL}/create`, data);
  }
}
