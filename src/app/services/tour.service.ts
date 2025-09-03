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

  private discountOptions = ['-5% Extra booking', '-10% Hot deal', '-5% Long stay'];

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
