import { Component, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { ClientService } from '../../../../services/api-service/client.service';
import { InputComponent } from '../../../input.component/input.component';
import { TourService } from '../../../../services/tour.service';
import { Client } from '../../../../types/client';

@Component({
  selector: 'app-find-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    InputComponent,
  ],
  templateUrl: './find-client.component.html',
  styleUrl: './find-client.component.css',
})
export class FindClientComponent {
  private client = inject(ClientService);
  private tour = inject(TourService);
  private router = inject(Router);

  @Output() switchTab = new EventEmitter<void>();

  goToCreateClient() {
    this.switchTab.emit();
  }

  phoneControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^\d{12}$/)],
  });

  clientData = toSignal(
    this.phoneControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(() => this.phoneControl.valid),
      switchMap((phone) =>
        this.client.getByPhone(phone).pipe(
          catchError(() => of(null)),
          map((res) => (res?.success && res.data ? res.data : null))
        )
      )
    ),
    { initialValue: null }
  );

  notFound = signal(false);

  constructor() {
    effect(() => {
      const client = this.clientData();
      const phoneInput = this.phoneControl.value;

      if (!phoneInput) {
        this.notFound.set(false);
        return;
      }

      this.notFound.set(!client);
    });
  }

  selectClient() {
    const client = this.clientData();
    if (client) {
      this.tour.setClient(client);
      this.router.navigateByUrl('/new-tour/itinerary');
    }
  }
}
