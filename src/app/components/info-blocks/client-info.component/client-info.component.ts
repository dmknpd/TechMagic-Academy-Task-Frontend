import { Component, effect, inject, Input, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

import { InputComponent } from '../../input.component/input.component';
import { Client, ClientFormData } from '../../../types/client';
import { ClientService } from '../../../services/client.service';
import { FormErrorsService } from '../../../services/form-errors.service';
import { noWhitespaceValidator } from '../../../validators/no-whitespace.validator';

@Component({
  selector: 'app-client-info',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, InputComponent],
  templateUrl: './client-info.component.html',
  styleUrl: '../info-block.css',
})
export class ClientInfoComponent {
  @Input() clientData!: Signal<Client | null>;
  @Input() withControl: boolean = false;

  private router = inject(Router);
  private formErrors = inject(FormErrorsService);
  private client = inject(ClientService);

  globalError = signal<string | null>(null);
  message = signal<string | null>(null);

  clientForm = new FormGroup({
    firstName: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    lastName: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    middleName: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    country: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    city: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    phone: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.pattern(/^\d{12}$/),
    ]),
    email: new FormControl({ value: '-', disabled: true }, [Validators.required, Validators.email]),
  });

  isEditEnabled = false;

  enableForm() {
    this.clientForm.enable();
    this.isEditEnabled = true;
  }

  disableForm() {
    this.clientForm.disable();
    this.isEditEnabled = false;
  }

  onEdit() {
    this.formErrors.clearFormErrors(this.clientForm.controls);
    this.globalError.set(null);

    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }
    const clientId = this.clientData()?._id;
    if (!clientId) return;

    const formValue = this.clientForm.value;
    const data: ClientFormData = {
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
      middleName: formValue.middleName!,
      phone: formValue.phone!,
      email: formValue.email!,
      address: {
        country: formValue.country!,
        city: formValue.city!,
      },
    };

    const client = this.clientData();
    if (
      client &&
      client.firstName === data.firstName &&
      client.lastName === data.lastName &&
      client.middleName === data.middleName &&
      client.phone === data.phone &&
      client.email === data.email &&
      client.address?.country === data.address.country &&
      client.address?.city === data.address.city
    ) {
      this.disableForm();
      return;
    }

    this.client.update(clientId, data as ClientFormData).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);

          this.message.set(response.message!);

          this.disableForm();
        }
      },
      error: (err) => {
        console.error('error', err);

        if (err.error.errors) {
          this.formErrors.setFormErrors(this.clientForm.controls, err.error.errors);
        } else if (err.error.message) {
          this.globalError.set(err.error.message);
          return;
        }
      },
    });
  }

  onDelete() {
    const clientId = this.clientData()?._id;
    if (!clientId) return;

    const confirmDelete = confirm('Are you sure you want to delete this client?');
    if (!confirmDelete) return;

    this.client.delete(clientId).subscribe({
      next: (response) => {
        if (response.success) {
          this.message.set(response.message!);

          this.router.navigateByUrl('/clients', {
            state: { message: `Client ${clientId} successfully deleted!` },
          });
        }
      },
      error: (err) => {
        console.error('delete error', err);
        if (err.error.message) {
          this.globalError.set(err.error.message);
        }
      },
    });
  }

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
