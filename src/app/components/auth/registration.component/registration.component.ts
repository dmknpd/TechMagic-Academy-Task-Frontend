import { Component, inject, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { RegisterData } from '../../../types/auth';
import { InputComponent } from '../../input.component/input.component';
import { FormErrorsService } from '../../../services/form-errors.service';
import { confirmPasswordValidator } from '../../../validators/confirm-password.validator';
import { noWhitespaceValidator } from '../../../validators/no-whitespace.validator';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  private auth = inject(AuthService);
  private formErrors = inject(FormErrorsService);

  globalError = signal<string | null>(null);
  message = signal<string | null>(null);

  registrationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      noWhitespaceValidator(),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      noWhitespaceValidator(),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      noWhitespaceValidator(),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      confirmPasswordValidator('password'),
    ]),
  });

  onRegistration() {
    this.formErrors.clearFormErrors(this.registrationForm.controls);
    this.globalError.set(null);

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const formValue = this.registrationForm.value;
    this.auth.register(formValue as RegisterData).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);

          this.message.set(response.message!);

          this.registrationForm.reset({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        }

        setTimeout(() => {
          this.message.set(null);
        }, 3000);
      },
      error: (err) => {
        console.error('error', err);

        if (err.error.errors) {
          this.formErrors.setFormErrors(this.registrationForm.controls, err.error.errors);
        } else if (err.error.message) {
          this.globalError.set(err.error.message);
          return;
        }
      },
    });
  }
}
