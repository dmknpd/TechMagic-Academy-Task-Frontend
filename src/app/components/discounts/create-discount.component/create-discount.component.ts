import { Component, inject, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { InputComponent } from '../../input.component/input.component';
import { FormErrorsService } from '../../../services/form-errors.service';
import { noWhitespaceValidator } from '../../../validators/no-whitespace.validator';
import { DiscountFormData } from '../../../types/discount';
import { DiscountService } from '../../../services/api-service/discount.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-discount',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './create-discount.component.html',
  styleUrl: './create-discount.component.css',
})
export class CreateDiscountComponent {
  private router = inject(Router);

  private discount = inject(DiscountService);
  private formErrors = inject(FormErrorsService);

  globalError = signal<string | null>(null);
  message = signal<string | null>(null);

  discountForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      noWhitespaceValidator(),
    ]),
    value: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      noWhitespaceValidator(),
    ]),
  });

  onRegistration() {
    this.formErrors.clearFormErrors(this.discountForm.controls);
    this.globalError.set(null);

    if (this.discountForm.invalid) {
      this.discountForm.markAllAsTouched();
      return;
    }

    const formValue = this.discountForm.value;
    this.discount.create(formValue as DiscountFormData).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);

          this.message.set(response.message!);

          this.discountForm.reset({ name: '', value: 0, description: '' });

          this.router.navigateByUrl('/discounts', {
            state: { message: `Discount ${response.data?.name} successfully created!` },
          });
        }

        setTimeout(() => {
          this.message.set(null);
        }, 3000);
      },
      error: (err) => {
        console.error('error', err);

        if (err.error.errors) {
          this.formErrors.setFormErrors(this.discountForm.controls, err.error.errors);
        } else if (err.error.message) {
          this.globalError.set(err.error.message);
          return;
        }
      },
    });
  }
}
