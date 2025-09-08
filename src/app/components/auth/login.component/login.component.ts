import { Component, inject, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { LoginData } from '../../../types/auth';
import { InputComponent } from '../../input.component/input.component';
import { FormErrorsService } from '../../../services/form-errors.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private formErrors = inject(FormErrorsService);

  globalError = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onLogin() {
    this.formErrors.clearFormErrors(this.loginForm.controls);
    this.globalError.set(null);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.value;
    this.auth.login(formValue as LoginData).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => {
        console.error('error', err);

        if (err.error.errors) {
          this.formErrors.setFormErrors(this.loginForm.controls, err.error.errors);
        } else if (err.error.message) {
          this.globalError.set(err.error.message);
          return;
        }
      },
    });
  }
}
