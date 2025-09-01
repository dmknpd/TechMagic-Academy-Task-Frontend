import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormErrorsService } from '../../../../services/form-errors.service';
import { ItineraryService } from '../../../../services/itinerary.service';
import { ItineraryFormData } from '../../../../types/itinerary';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from '../../../input.component/input.component';

@Component({
  selector: 'app-create-itinerary.component',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  templateUrl: './create-itinerary.component.html',
  styleUrl: './create-itinerary.component.css',
})
export class CreateItineraryComponent {
  private itinerary = inject(ItineraryService);
  private formErrors = inject(FormErrorsService);

  globalError = signal<string | null>(null);

  itineraryForm = new FormGroup({
    country: new FormControl('', [Validators.required]),
    climate: new FormControl('', [Validators.required]),
    duration: new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
    hotel: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
  });

  onItineraryCreate() {
    this.formErrors.clearFormErrors(this.itineraryForm.controls);
    this.globalError.set(null);

    if (this.itineraryForm.invalid) {
      this.itineraryForm.markAllAsTouched();
      return;
    }

    const formValue: ItineraryFormData = this.itineraryForm.value as ItineraryFormData;
    this.itinerary.create(formValue).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);
        }
      },
      error: (err) => {
        console.error('error', err);

        if (err.error.errors) {
          this.formErrors.setFormErrors(this.itineraryForm.controls, err.error.errors);
        } else if (err.error.message) {
          this.globalError.set(err.error.message);
          return;
        }
      },
    });
  }
}
