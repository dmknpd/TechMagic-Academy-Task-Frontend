import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  private clientService = inject(ClientService);
  private snackBar = inject(MatSnackBar);

  phone = '';
  client = signal<any | null>(null);
  notFound = signal(false);

  onSearch() {
    if (!this.phone) return;

    this.clientService.searchByPhone(this.phone).subscribe({
      next: (res) => {
        if (res) {
          this.client.set(res);
          this.notFound.set(false);
        } else {
          this.client.set(null);
          this.notFound.set(true);
        }
      },
      error: () => {
        this.client.set(null);
        this.notFound.set(true);
      },
    });
  }

  onCreateClient() {
    const data = { phone: this.phone };
    this.clientService.create(data).subscribe({
      next: (res) => {
        this.client.set(res);
        this.notFound.set(false);
        this.snackBar.open('Клиент создан!', 'OK', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Ошибка при создании клиента', 'OK', { duration: 3000 });
      },
    });
  }
}
