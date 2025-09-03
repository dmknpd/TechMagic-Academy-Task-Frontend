import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Client } from '../types/client';
import { Itinerary } from '../types/itinerary';

const BASE_URL = `${environment.backendHost}/api/tour`;

@Injectable({ providedIn: 'root' })
export class TourService {
  private client = signal<Client | null>(null);
  private itinerary = signal<Itinerary | null>(null);

  private discountOptions = [
    { name: '-5% Extra booking', value: 5 },
    { name: '-10% Hot deal', value: 10 },
    { name: '-5% Long stay', value: 5 },
  ];

  setClient(client: Client): void {
    this.client.set(client);
  }

  getClient() {
    return this.client;
  }

  setItinerary(itinerary: Itinerary) {
    this.itinerary.set(itinerary);
  }

  getItinerary() {
    return this.itinerary;
  }

  getItineraryDurationList() {
    return this.itinerary()?.duration;
  }

  getDiscountOptions() {
    return this.discountOptions;
  }

  // createSale(): Observable<ApiResponse> {
  //   if (!this.client || !this.itinerary) throw new Error('Недостаточно данных');
  //   return this.http.post<ApiResponse>('/api/sales', {
  //     client: this.client,
  //     itinerary: this.itinerary
  //   });
  // }
}
