import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

import { Client } from '../../../types/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-list.component',
  imports: [CommonModule, MatTableModule, MatCardModule, MatDividerModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent {
  private client = inject(ClientService);

  clients: Client[] = [];
  displayedColumns = ['lastName', 'firstName', 'middleName', 'phone', 'email', 'country', 'city'];

  constructor() {
    this.fetchAllClients();
  }

  fetchAllClients() {
    this.client
      .getAllClients()
      .pipe(
        catchError((err) => {
          console.error('Error fetching clients:', err);
          return of([]);
        })
      )
      .subscribe((response: any) => {
        if (response.success && response.data) {
          this.clients = response.data;
        }
      });
  }
}
