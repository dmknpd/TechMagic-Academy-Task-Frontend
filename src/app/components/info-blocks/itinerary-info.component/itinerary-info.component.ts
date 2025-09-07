import { Component, effect, inject, Input, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { InputComponent } from '../../input.component/input.component';
import { Itinerary, ItineraryFormData } from '../../../types/itinerary';
import { FormErrorsService } from '../../../services/form-errors.service';
import { ItineraryService } from '../../../services/api-service/itinerary.service';
import { noWhitespaceValidator } from '../../../validators/no-whitespace.validator';

@Component({
  selector: 'app-itinerary-info',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, InputComponent],
  templateUrl: './itinerary-info.component.html',
  styleUrl: '../info-block.css',
})
export class ItineraryInfoComponent {
  @Input() itineraryData!: Signal<Itinerary | null>;
  @Input() withControl: boolean = false;
  @Input() detailsPage: boolean = false;

  private router = inject(Router);
  private formErrors = inject(FormErrorsService);

  private itinerary = inject(ItineraryService);

  globalError = signal<string | null>(null);
  message = signal<string | null>(null);

  itineraryForm = new FormGroup({
    country: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
      noWhitespaceValidator(),
    ]),
    hotel: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(18),
      noWhitespaceValidator(),
    ]),
    climate: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(18),
      noWhitespaceValidator(),
    ]),
    price: new FormControl({ value: 0, disabled: true }, [Validators.required]),
    url: new FormControl({ value: '-', disabled: true }, [
      Validators.required,
      Validators.min(1),
      noWhitespaceValidator(),
    ]),
  });

  isEditEnabled = false;

  enableForm() {
    this.itineraryForm.enable();
    this.isEditEnabled = true;
  }

  disableForm() {
    this.itineraryForm.disable();
    this.isEditEnabled = false;
  }

  onEdit() {
    this.formErrors.clearFormErrors(this.itineraryForm.controls);
    this.globalError.set(null);
    if (this.itineraryForm.invalid) {
      this.itineraryForm.markAllAsTouched();
      return;
    }
    const clientId = this.itineraryData()?._id;
    if (!clientId) return;
    const formValue = this.itineraryForm.value;
    const itinerary = this.itineraryData();
    if (
      itinerary &&
      itinerary.country === formValue.country &&
      itinerary.hotel === formValue.hotel &&
      itinerary.price === formValue.price
    ) {
      this.disableForm();
      return;
    }
    this.itinerary.update(clientId, formValue as ItineraryFormData).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalError.set(null);
          this.message.set(response.message!);
          this.disableForm();
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

  onDelete() {
    const itineraryId = this.itineraryData()?._id;
    if (!itineraryId) return;
    const confirmDelete = confirm('Are you sure you want to delete this itinerary?');
    if (!confirmDelete) return;
    this.itinerary.delete(itineraryId).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigateByUrl('/itineraries', {
            state: { message: `Itinerary ${itineraryId} successfully deleted!` },
          });
        }
      },
      error: (err) => {
        console.error('delete error', err);
        if (err.error.message) {
          this.globalError.set(err.error.message);
        }
      },
    });
  }

  constructor() {
    effect(() => {
      const itinerary = this.itineraryData();

      if (itinerary) {
        this.itineraryForm.patchValue({
          country: itinerary.country,
          hotel: itinerary.hotel,
          climate: itinerary.climate,
          url: itinerary.url,
          price: itinerary.price,
        });
      }
    });
  }
}
