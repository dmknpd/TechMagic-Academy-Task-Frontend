import { Component, inject, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../types/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);

  globalError = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  private setServerErrors(errors: Record<string, string[]>) {
    for (const field in errors) {
      const control = this.loginForm.get(field);
      if (control) {
        control.setErrors({ serverError: errors[field] });
      }
    }
  }

  onLogin() {
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

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
