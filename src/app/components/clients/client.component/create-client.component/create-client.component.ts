import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

import { ClientService } from '../../../../services/api-service/client.service';
import { FormErrorsService } from '../../../../services/form-errors.service';
import { ClientFormData } from '../../../../types/client';
import { InputComponent } from '../../../input.component/input.component';
import { TourService } from '../../../../services/tour.service';
import { noWhitespaceValidator } from '../../../../validators/no-whitespace.validator';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent {
  private client = inject(ClientService);
  private tour = inject(TourService);
  private router = inject(Router);
  private formErrors = inject(FormErrorsService);

  globalError = signal<string | null>(null);
  message = signal<string | null>(null);

  clientFormName = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    middleName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
  });

  clientFormAddress = new FormGroup({
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
  });

  clientFormContacts = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onCreate(stepper: MatStepper) {
    this.formErrors.clearFormErrors(this.clientFormName.controls);
    this.formErrors.clearFormErrors(this.clientFormAddress.controls);
    this.formErrors.clearFormErrors(this.clientFormContacts.controls);
    this.globalError.set(null);

    if (
      this.clientFormName.invalid ||
      this.clientFormAddress.invalid ||
      this.clientFormContacts.invalid
    ) {
      this.clientFormName.markAllAsTouched();
      this.clientFormAddress.markAllAsTouched();
      this.clientFormContacts.markAllAsTouched();
      return;
    }

    const formValue: ClientFormData = {
      ...this.clientFormName.value,
      ...this.clientFormContacts.value,
      address: this.clientFormAddress.value,
    } as ClientFormData;

    this.client.create(formValue).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.globalError.set(null);

          stepper.reset();

          this.clientFormName.reset();
          this.clientFormAddress.reset();
          this.clientFormContacts.reset();

          this.message.set(response.message!);

          this.tour.setClient(response.data);
          this.router.navigateByUrl('/new-tour/itinerary');
        }
      },
      error: (err) => {
        if (err.error.errors) {
          this.formErrors.setFormErrors(this.clientFormName.controls, err.error.errors);
          this.formErrors.setFormErrors(this.clientFormAddress.controls, err.error.errors);
          this.formErrors.setFormErrors(this.clientFormContacts.controls, err.error.errors);
        } else if (err.error.message) {
          this.globalError.set(err.error.message);
        }
      },
    });
  }
}
