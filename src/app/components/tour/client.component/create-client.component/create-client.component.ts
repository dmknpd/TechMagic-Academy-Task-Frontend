import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

import { ClientService } from '../../../../services/client.service';
import { FormErrorsService } from '../../../../services/form-errors.service';
import { Client } from '../../../../types/client';
import { InputComponent } from '../../../input.component/input.component';

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
  private router = inject(Router);
  private formErrors = inject(FormErrorsService);

  globalError = signal<string | null>(null);

  clientFormName = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    middleName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
  });

  clientFormContacts = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  clientFormAddress = new FormGroup({
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  onCreate() {
    const combinedForm = new FormGroup({
      ...this.clientFormName.controls,
      ...this.clientFormContacts.controls,
      ...this.clientFormAddress.controls,
    });

    this.formErrors.clearFormErrors(combinedForm.controls);
    this.globalError.set(null);

    if (combinedForm.invalid) {
      combinedForm.markAllAsTouched();
      return;
    }

    const formValue = combinedForm.value as Client;

    this.client.create(formValue).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);
          // this.router.navigateByUrl('/');
        }
      },
      error: (err) => {
        if (err.error.errors) {
          this.formErrors.setFormErrors(combinedForm.controls, err.error.errors);
        } else if (err.error.message) {
          this.globalError.set(err.error.message);
        }
      },
    });
  }
}
