import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const BASE_URL = `${environment.backendHost}/api/itinerary`;

@Injectable({ providedIn: 'root' })
export class ItineraryService {
  // private http = inject(HttpClient);
  // private BASE_URL = '/api/itineraries';
  // getAll(): Observable<Itinerary[]> {
  //   return this.http.get<Itinerary[]>(this.BASE_URL);
  // }
  // getById(id: string): Observable<Itinerary> {
  //   return this.http.get<Itinerary>(`${this.BASE_URL}/${id}`);
  // }
}
