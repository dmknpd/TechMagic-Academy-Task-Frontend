import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';

import { ClientService } from '../../../services/client.service';
import { Client } from '../../../types/client';

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
    RouterModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  private client = inject(ClientService);

  clientForm = new FormGroup({
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{12}$/)],
    }),
  });

  clientData: Client | null = null;
  notFound = false;

  constructor() {
    this.clientForm.controls['phone'].valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter(() => this.clientForm.valid),
        switchMap((phone) =>
          this.client.searchByPhone(phone).pipe(
            catchError(() => {
              return of(null);
            })
          )
        )
      )
      .subscribe((response) => {
        this.clientData = null;
        this.notFound = false;

        if (response && response.success && response.data) {
          this.clientData = response.data;
        } else {
          this.notFound = true;
        }
      });
  }
}
