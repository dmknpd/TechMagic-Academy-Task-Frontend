import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Client } from '../types/client';
import { Itinerary } from '../types/itinerary';
import { TourInfoFormData } from '../types/tour';

const BASE_URL = `${environment.backendHost}/api/tour`;

@Injectable({ providedIn: 'root' })
export class TourService {
  private client = signal<Client | null>(null);
  private itinerary = signal<Itinerary | null>(null);
  private tourInfo = signal<TourInfoFormData | null>(null);

  private discountOptions = [
    { name: '-5% Extra booking', value: 5 },
    { name: '-10% Hot deal', value: 10 },
    { name: '-5% Long stay', value: 5 },
  ];

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

  //discount
  getDiscountOptions() {
    return this.discountOptions;
  }

  discountSum = computed(() => {
    const discounts = this.tourInfo()?.discount ?? [];
    return discounts.reduce((acc, num) => acc + num, 0);
  });

  //price

  priceSum = computed(() => {
    const price = this.itinerary()?.price ?? 0;
    const duration = this.tourInfo()?.duration ?? 1;
    const quantity = this.tourInfo()?.quantity ?? 1;

    return price * duration * quantity;
  });

  priceTotal = computed(() => {
    const price = this.priceSum();
    const discount = this.discountSum();

    return price - (price * discount) / 100;
  });

  allDataFilled = computed(() => {
    return !!this.client() && !!this.itinerary() && !!this.tourInfo();
  });

  // createSale(): Observable<ApiResponse> {
  //   if (!this.client || !this.itinerary) throw new Error('Недостаточно данных');
  //   return this.http.post<ApiResponse>('/api/sales', {
  //     client: this.client,
  //     itinerary: this.itinerary
  //   });
  // }
}
