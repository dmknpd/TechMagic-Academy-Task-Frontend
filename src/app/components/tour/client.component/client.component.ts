import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError, of } from 'rxjs';

import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);

  clientForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
  });

  hintMessage: string | null = null;

  onSearch() {
    if (this.clientForm.invalid) {
      this.hintMessage = null;
      this.clientForm.markAllAsTouched();
      return;
    }
    const phone = this.clientForm.value.phone;

    if (phone) {
      this.clientService
        .searchByPhone(phone)
        .pipe(catchError(() => of(null)))
        .subscribe((response) => {
          if (!response?.success || !response?.data) {
            this.hintMessage = 'Client not found, you can create a new one';
          } else {
            const client = response.data;
            this.hintMessage =
              client.firstName && client.lastName
                ? `Client found: ${client.firstName} ${client.lastName}`
                : 'Client found, but name is missing';
          }
        });
    }
  }
}
