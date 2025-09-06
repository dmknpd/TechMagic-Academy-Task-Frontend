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

  getAll(): Observable<ApiResponse<Itinerary[]>> {
    return this.http.get<ApiResponse<Itinerary[]>>(BASE_URL);
  }

  getItineraryById(id: string): Observable<ApiResponse<Itinerary>> {
    return this.http.get<ApiResponse<Itinerary>>(`${BASE_URL}/${id}`);
  }

  create(data: ItineraryFormData): Observable<ApiResponse<Itinerary>> {
    return this.http.post<ApiResponse<Itinerary>>(`${BASE_URL}/create`, data);
  }

  update(id: string, data: ItineraryFormData): Observable<ApiResponse<Itinerary>> {
    return this.http.put<ApiResponse<Itinerary>>(`${BASE_URL}/${id}/edit`, data);
  }

  delete(id: string): Observable<ApiResponse<{ id: string }>> {
    return this.http.delete<ApiResponse<{ id: string }>>(`${BASE_URL}/${id}/delete`);
  }
}
