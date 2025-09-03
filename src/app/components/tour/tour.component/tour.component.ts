import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

import { InputComponent } from '../../input.component/input.component';
import { TourService } from '../../../services/tour.service';
import { FormErrorsService } from '../../../services/form-errors.service';
import { TourInfoFormData } from '../../../types/tour';
import { duration, Moment } from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour.component',
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

  durationList = this.tour.getItineraryDurationList() ?? [];

  tourFormDate = new FormGroup({
    startDate: new FormControl<Moment | null>(null, [Validators.required]),
    duration: new FormControl(1, [Validators.required]),
  });

  tourFormPricing = new FormGroup({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    discount: new FormControl<number[] | null>(null),
  });

  allOptions = this.tour.getDiscountOptions();

  assignTourInfo() {
    if (this.tourFormDate.invalid || this.tourFormPricing.invalid) {
      this.tourFormDate.markAllAsTouched();
      this.tourFormPricing.markAllAsTouched();
      return;
    }

    const startDate = this.tourFormDate.value.startDate!.toDate();
    const duration = this.tourFormDate.value.duration!;

    const quantity = this.tourFormPricing.value.quantity!;
    const discount = this.tourFormPricing.value.discount;

    const formValue: TourInfoFormData = {
      startDate: startDate,
      duration: duration,
      quantity: quantity,
    };

    if (discount != null) {
      formValue.discount = discount;
    }

    this.tour.setTourInfo(formValue);
    this.router.navigateByUrl('/new-tour/summary');
  }
}
