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
  private tour = inject(TourService);
  private formErrors = inject(FormErrorsService);

  globalError = signal<string | null>(null);
  message = signal<string | null>(null);

  durationList = this.tour.getItineraryDurationList() ?? [];

  tourFormDate = new FormGroup({
    startDate: new FormControl(null, [Validators.required]),
    duration: new FormControl(null, [Validators.required]),
  });

  tourFormPricing = new FormGroup({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    discount: new FormControl(0, [Validators.required]),
  });

  // onItineraryCreate(stepper: MatStepper) {
  //   this.formErrors.clearFormErrors(this.tourFormDate.controls);
  //   this.formErrors.clearFormErrors(this.tourFormPricing.controls);

  //   this.globalError.set(null);

  //   if (this.tourFormDate.invalid || this.tourFormPricing.invalid) {
  //     this.tourFormDate.markAllAsTouched();
  //     this.tourFormPricing.markAllAsTouched();
  //     return;
  //   }
  //   const formValue: ItineraryFormData = {
  //     ...this.tourFormDate.value,
  //     ...this.tourFormPricing.value,
  //   } as ItineraryFormData;

  //   this.itinerary.create(formValue).subscribe({
  //     next: (response) => {
  //       if (response.success) {
  //         this.globalError.set(null);

  //         stepper.reset();

  //         this.itineraryFormCountry.reset();
  //         this.itineraryFormHotel.reset();
  //         this.itineraryFormPrice.reset();

  //         this.message.set(response.message!);

  //         console.log(response);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('error', err);
  //       if (err.error.errors) {
  //         this.formErrors.setFormErrors(this.itineraryFormCountry.controls, err.error.errors);
  //         this.formErrors.setFormErrors(this.itineraryFormHotel.controls, err.error.errors);
  //         this.formErrors.setFormErrors(this.itineraryFormPrice.controls, err.error.errors);
  //       } else if (err.error.message) {
  //         this.globalError.set(err.error.message);
  //         return;
  //       }
  //     },
  //   });
  // }
}
