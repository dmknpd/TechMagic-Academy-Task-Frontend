import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

import { ClientInfoComponent } from '../../info-blocks/client-info.component/client-info.component';
import { ClientService } from '../../../services/api-service/client.service';
import { Tour } from '../../../types/tour';
import { TourService } from '../../../services/tour.service';
import { ClientFullInfo } from '../../../types/client';

@Component({
  selector: 'app-client-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    ClientInfoComponent,
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css',
})
export class ClientDetailsComponent {
  private route = inject(ActivatedRoute);

  private client = inject(ClientService);
  private tour = inject(TourService);

  private clientId = this.route.snapshot.paramMap.get('id');

  clientData = signal<ClientFullInfo | null>(null);

  displayedColumns = [
    'country',
    'hotel',
    'startDate',
    'duration',
    'discount',
    'price',
    'quantity',
    'totalPrice',
    'actions',
  ];

  message = history.state.message;
  globalError = signal<string | null>(null);

  constructor() {
    this.refreshClientData();
    history.replaceState({}, '');
  }

  refreshClientData() {
    this.client.getFullInfo(this.clientId!).subscribe({
      next: (response) => this.clientData.set(response.data ?? null),
      error: (err) => {
        console.error(err);
        this.clientData.set(null);
      },
    });
  }

  getTotalPrice(tour: any) {
    const price = tour.itineraryId?.price;
    const quantity = tour.quantity;
    const duration = tour.duration;
    const discount = tour.discount;
    const total = price * quantity * duration;
    const totalAfterDiscount = total - (total * discount) / 100;
    return totalAfterDiscount;
  }

  formateDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  onDelete(tour: Tour) {
    const tourId = tour._id;
    if (!tourId) return;

    if (!confirm('Are you sure you want to delete this tour?')) return;

    this.tour.delete(tourId).subscribe({
      next: (response) => {
        if (response.success) {
          this.message = response.message;

          const client = this.clientData();
          if (client) {
            const updated = {
              ...client,
              tours: client.tours.filter((t: Tour) => t._id !== tourId),
            };
            this.clientData.set(updated);
          }
        }
      },
      error: (err) => {
        console.error('delete error', err);
        if (err.error.message) {
          this.globalError.set(err.error.message);
        }
      },
    });
  }
}
