import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormErrorsService } from '../../services/form-errors.service';
import { ItineraryService } from '../../services/itinerary.service';
import { ItineraryFormData } from '../../types/itinerary';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from '../input.component/input.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-itinerary.component',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './create-itinerary.component.html',
  styleUrl: './create-itinerary.component.css',
})
export class CreateItineraryComponent {
  private router = inject(Router);

  private itinerary = inject(ItineraryService);
  private formErrors = inject(FormErrorsService);

  globalError = signal<string | null>(null);
  message = signal<string | null>(null);

  itineraryFormCountry = new FormGroup({
    country: new FormControl('', [Validators.required]),
    climate: new FormControl('', [Validators.required]),
  });

  itineraryFormHotel = new FormGroup({
    hotel: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  onItineraryCreate(stepper: MatStepper) {
    this.formErrors.clearFormErrors(this.itineraryFormCountry.controls);
    this.formErrors.clearFormErrors(this.itineraryFormHotel.controls);

    this.globalError.set(null);

    if (this.itineraryFormCountry.invalid || this.itineraryFormHotel.invalid) {
      this.itineraryFormCountry.markAllAsTouched();
      this.itineraryFormHotel.markAllAsTouched();

      return;
    }
    const formValue: ItineraryFormData = {
      ...this.itineraryFormCountry.value,
      ...this.itineraryFormHotel.value,
    } as ItineraryFormData;

    this.itinerary.create(formValue).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);

          stepper.reset();

          this.itineraryFormCountry.reset();
          this.itineraryFormHotel.reset();

          this.message.set(response.message!);

          this.router.navigateByUrl('/new-tour/itinerary');
        }
      },
      error: (err) => {
        console.error('error', err);
        if (err.error.errors) {
          this.formErrors.setFormErrors(this.itineraryFormCountry.controls, err.error.errors);
          this.formErrors.setFormErrors(this.itineraryFormHotel.controls, err.error.errors);
        } else if (err.error.message) {
          this.globalError.set(err.error.message);
          return;
        }
      },
    });
  }
}
