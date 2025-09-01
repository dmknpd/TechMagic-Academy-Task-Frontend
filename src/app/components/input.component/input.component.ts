import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() isPasswordField = false;
  @Input() isPhoneField = false;

  hidePassword = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
    this.type = this.hidePassword ? 'password' : 'text';
  }

  errorKeys(): string[] {
    if (!this.control || !this.control.errors) return [];
    return Object.keys(this.control.errors);
  }

  getErrorMessage(key: string, error: any): string {
    switch (key) {
      case 'required':
        return `${this.label} is required`;
      case 'minlength':
        return `${this.label} must be at least ${error.requiredLength} characters`;
      case 'maxlength':
        return `${this.label} must be at most ${error.requiredLength} characters`;
      case 'email':
        return `Enter a valid email`;
      case 'pattern':
        return `Enter valid ${this.label}`;
      case 'serverError':
        return Array.isArray(error) ? error.join(', ') : String(error);
      default:
        return '';
    }
  }
}
