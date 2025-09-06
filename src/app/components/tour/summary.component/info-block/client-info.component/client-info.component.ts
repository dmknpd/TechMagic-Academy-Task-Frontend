import { Component, effect, inject, Input, Signal } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../../../input.component/input.component';
import { Client } from '../../../../../types/client';
import { TourService } from '../../../../../services/tour.service';

@Component({
  selector: 'app-client-info',
  imports: [InputComponent],
  templateUrl: './client-info.component.html',
  styleUrl: '../info-block.css',
})
export class ClientInfoComponent {
  @Input() clientData!: Signal<Client | null>;

  clientForm = new FormGroup({
    firstName: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    lastName: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    middleName: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    country: new FormControl({ value: '-', disabled: true }, [Validators.required]),
    city: new FormControl({ value: '-', disabled: true }, [Validators.required]),
    phone: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.pattern(/^\d{12}$/),
    ]),
    email: new FormControl({ value: '-', disabled: true }, [Validators.required, Validators.email]),
  });

  constructor() {
    effect(() => {
      const client = this.clientData();
      if (client) {
        this.clientForm.patchValue({
          firstName: client.firstName,
          lastName: client.lastName,
          middleName: client.middleName,
          country: client.address?.country,
          city: client.address?.city,
          phone: client.phone,
          email: client.email,
        });
      }
    });
  }
}
