import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

import { InputComponent } from '../../input.component/input.component';
import { TourService } from '../../../services/tour.service';
import { TourInfoFormData } from '../../../types/tour';
import { Moment } from 'moment';
import { Router } from '@angular/router';
import { DiscountService } from '../../../services/api-service/discount.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-tour',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css',
})
export class TourComponent {
  private router = inject(Router);

  private tour = inject(TourService);
  private discount = inject(DiscountService);

  durationList = this.tour.getItineraryDurationList() ?? [];

  tourFormDate = new FormGroup({
    startDate: new FormControl<Moment | null>(null, [Validators.required]),
    duration: new FormControl(1, [Validators.required]),
  });

  tourFormPricing = new FormGroup({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    discount: new FormControl<number[] | null>(null),
  });

  allDiscountOptions = toSignal(
    this.discount.getAll().pipe(
      map((response) => response.data ?? []),
      catchError((err) => {
        console.error('Error fetching discounts:', err);
        return of([]);
      })
    ),
    { initialValue: [] }
  );

  assignTourInfo() {
    if (this.tourFormDate.invalid || this.tourFormPricing.invalid) {
      this.tourFormDate.markAllAsTouched();
      this.tourFormPricing.markAllAsTouched();
      return;
    }

    const startDate = this.tourFormDate.value.startDate!.toDate();
    const duration = this.tourFormDate.value.duration!;

    const quantity = this.tourFormPricing.value.quantity!;
    const discountArray = this.tourFormPricing.value.discount;

    const formValue: TourInfoFormData = {
      startDate: startDate,
      duration: duration,
      quantity: quantity,
    };

    if (discountArray != null) {
      let discount = discountArray.reduce((sum, val) => sum + val, 0);
      formValue.discount = discount;
    }

    this.tour.setTourInfo(formValue);
    this.router.navigateByUrl('/new-tour/summary');
  }
}
