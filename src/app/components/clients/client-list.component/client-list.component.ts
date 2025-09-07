import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

import { ClientService } from '../../../services/api-service/client.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent {
  private client = inject(ClientService);

  displayedColumns = ['lastName', 'firstName', 'middleName', 'phone', 'email', 'country', 'city'];

  clients = toSignal(
    this.client.getAll().pipe(
      map((response) => response.data ?? []),
      catchError((err) => {
        console.error('Error fetching clients:', err);
        return of([]);
      })
    ),
    { initialValue: [] }
  );

  message = history.state.message;

  constructor() {
    history.replaceState({}, '');
  }
}
