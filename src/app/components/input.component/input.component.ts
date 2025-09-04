import { Component, computed, inject, Input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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

export interface ChipOption {
  name: string;
  value: number;
}

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
    MatAutocompleteModule,
    MatChipsModule,
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
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'chips' = 'text';
  @Input() isPasswordField = false;
  @Input() isPhoneField = false;
  @Input() selectList: any[] = [];

  minDate: Date = new Date();
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

  // chips
  @Input() chips: ChipOption[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly inputControl = new FormControl('');

  private announcer = inject(LiveAnnouncer);

  selectedOptions: ChipOption[] = [];

  private syncControl() {
    this.control.setValue(this.selectedOptions.map((o) => o.value));
  }

  add(event: MatChipInputEvent) {
    const input = (event.value || '').trim().toLowerCase();
    if (!input) return;

    const found = this.chips.find((c) => c.name.toLowerCase() === input);
    if (found && !this.selectedOptions.some((o) => o.name === found.name)) {
      this.selectedOptions.push(found);
      this.syncControl();
    }
    this.inputControl.setValue('');
  }

  remove(index: number) {
    this.selectedOptions.splice(index, 1);
    this.syncControl();
    this.announcer.announce(`Removed chip`);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const found = this.chips.find((c) => c.name === event.option.viewValue);
    if (found && !this.selectedOptions.some((o) => o.name === found.name)) {
      this.selectedOptions.push(found);
      this.syncControl();
    }
    this.inputControl.setValue('');
    event.option.deselect();
  }

  filteredOptions(): ChipOption[] {
    const val = (this.inputControl.value || '').toLowerCase();
    const selectedNames = this.selectedOptions.map((o) => o.name);

    return this.chips.filter(
      (c) => !selectedNames.includes(c.name) && (!val || c.name.toLowerCase().includes(val))
    );
  }
}
