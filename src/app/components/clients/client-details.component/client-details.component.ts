import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

import { ClientInfoComponent } from '../../tour/summary.component/info-block/client-info.component/client-info.component';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { Tour } from '../../../types/tour';

@Component({
  selector: 'app-client-details.component',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    ClientInfoComponent,
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css',
})
export class ClientDetailsComponent {
  private route = inject(ActivatedRoute);

  private client = inject(ClientService);

  private clientId = this.route.snapshot.paramMap.get('id');

  clientData = toSignal(
    this.client.getClientFullInfo(this.clientId!).pipe(
      map((response) => response.data ?? null),
      catchError((err) => {
        console.error('Error fetching client:', err);
        return of(null);
      })
    ),
    { initialValue: null }
  );

  displayedColumns = [
    'country',
    'hotel',
    'startDate',
    'duration',
    'discount',
    'price',
    'quantity',
    'totalPrice',
  ];

  message = history.state.message;

  constructor() {
    history.replaceState({}, '');
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
}
