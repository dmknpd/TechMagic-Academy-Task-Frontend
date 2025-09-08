import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Client } from '../types/client';
import { Itinerary } from '../types/itinerary';
import { Tour, TourInfoFormData } from '../types/tour';
import { ApiResponse } from '../types/res';

const BASE_URL = `${environment.backendHost}/api/tours`;

@Injectable({ providedIn: 'root' })
export class TourService {
  private http = inject(HttpClient);

  private client = signal<Client | null>(null);
  private itinerary = signal<Itinerary | null>(null);
  private tourInfo = signal<TourInfoFormData | null>(null);

  //client
  setClient(client: Client): void {
    this.client.set(client);
  }

  getClient() {
    return this.client;
  }

  //itinerary
  setItinerary(itinerary: Itinerary) {
    this.itinerary.set(itinerary);
  }

  getItinerary() {
    return this.itinerary;
  }

  getItineraryDurationList() {
    return this.itinerary()?.duration;
  }

  //tourInfo
  setTourInfo(tour: TourInfoFormData) {
    this.tourInfo.set(tour);
  }

  getTourInfo() {
    return this.tourInfo;
  }

  //price

  priceSum = computed(() => {
    const price = this.itinerary()?.price ?? 0;
    const duration = this.tourInfo()?.duration ?? 1;
    const quantity = this.tourInfo()?.quantity ?? 1;

    return price * duration * quantity;
  });

  priceTotal = computed(() => {
    const price = this.priceSum();
    const discount = this.tourInfo()?.discount ?? 0;

    return price - (price * discount) / 100;
  });

  //Fields checked
  allDataFilled = computed(() => {
    return !!this.client() && !!this.itinerary() && !!this.tourInfo();
  });

  //Reset
  reset() {
    this.client.set(null);
    this.itinerary.set(null);
    this.tourInfo.set(null);
  }

  //API

  createTour(): Observable<ApiResponse<Tour>> {
    if (!this.client()) throw new Error('Client is not set');
    if (!this.itinerary()) throw new Error('Itinerary is not set');
    if (!this.tourInfo()) throw new Error('Tour info is not set');

    return this.http.post<ApiResponse<Tour>>(`${BASE_URL}/`, {
      itineraryId: this.itinerary()?._id,
      clientId: this.client()?._id,
      startDate: this.tourInfo()?.startDate,
      duration: this.tourInfo()?.duration,
      quantity: this.tourInfo()?.quantity,
      discount: this.tourInfo()?.discount,
    });
  }

  delete(id: string): Observable<ApiResponse<{ id: string }>> {
    return this.http.delete<ApiResponse<{ id: string }>>(`${BASE_URL}/${id}/delete`);
  }
}
