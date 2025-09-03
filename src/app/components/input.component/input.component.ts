import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-input',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' = 'text';
  @Input() isPasswordField = false;
  @Input() isPhoneField = false;
  @Input() selectList: any[] = [];

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
      case 'min':
        return `Enter a valid number greater than ${error.min}`;
      case 'max':
        return `Enter a valid number smaller than ${error.max}`;
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
