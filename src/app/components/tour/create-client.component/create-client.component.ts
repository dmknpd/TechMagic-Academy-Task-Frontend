import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Client } from '../../../types/client';
import { ClientService } from '../../../services/client.service';
import { InputComponent } from '../../input.component/input.component';

@Component({
  selector: 'app-create-client.component',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css',
})
export class CreateClientComponent {
  client = inject(ClientService);
  router = inject(Router);

  globalError = signal<string | null>(null);

  clientForm = new FormGroup({
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
  });

  private setServerErrors(errors: Record<string, string[]>) {
    for (const field in errors) {
      const control = this.clientForm.get(field);
      if (control) {
        control.setErrors({ serverError: errors[field] });
      }
    }
  }

  onLogin() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const formValue = this.clientForm.value;
    this.client.create(formValue as Client).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);
          // this.router.navigateByUrl('/');
        } else {
          if (response.errors) this.setServerErrors(response.errors);
          if (response.message) this.globalError.set(response.message);
        }
      },
      error: (err) => {
        console.error('error', err);

        if (err.error) {
          if (err.error.errors) {
            this.setServerErrors(err.error.errors);
          } else if (err.error.message) {
            this.globalError.set(err.error.message);
            return;
          }
        }
      },
    });
  }
}
