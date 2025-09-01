import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Client } from '../types/client';

const BASE_URL = `${environment.backendHost}/api/tour`;

@Injectable({ providedIn: 'root' })
export class TourService {
  private client: Client | null = null;
  // private itinerary: Itinerary | null = null;

  setClient(client: Client) {
    this.client = client;
  }

  getClient() {
    return this.client;
  }

  // setItinerary(itinerary: Itinerary) {
  //   this.itinerary = itinerary;
  // }
  // createSale(): Observable<ApiResponse> {
  //   if (!this.client || !this.itinerary) throw new Error('Недостаточно данных');
  //   return this.http.post<ApiResponse>('/api/sales', {
  //     client: this.client,
  //     itinerary: this.itinerary
  //   });
  // }
}
