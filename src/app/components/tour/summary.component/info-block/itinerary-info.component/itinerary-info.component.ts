import { Component, effect, inject, Input, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../input.component/input.component';
import { Itinerary } from '../../../../../types/itinerary';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-itinerary-info',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, InputComponent],
  templateUrl: './itinerary-info.component.html',
  styleUrl: '../info-block.css',
})
export class ItineraryInfoComponent {
  @Input() itineraryData!: Signal<Itinerary | null>;
  @Input() withControl: boolean = false;

  globalError = signal<string | null>(null);

  itineraryForm = new FormGroup({
    country: new FormControl({ value: '-', disabled: true }, [Validators.required]),
    hotel: new FormControl({ value: '-', disabled: true }, [Validators.required]),
    price: new FormControl({ value: 0, disabled: true }, [Validators.required]),
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
    // this.formErrors.clearFormErrors(this.clientForm.controls);
    // this.globalError.set(null);
    // if (this.clientForm.invalid) {
    //   this.clientForm.markAllAsTouched();
    //   return;
    // }
    // const clientId = this.clientData()?._id;
    // if (!clientId) return;
    // const formValue = this.clientForm.value;
    // const data: ClientFormData = {
    //   firstName: formValue.firstName!,
    //   lastName: formValue.lastName!,
    //   middleName: formValue.middleName!,
    //   phone: formValue.phone!,
    //   email: formValue.email!,
    //   address: {
    //     country: formValue.country!,
    //     city: formValue.city!,
    //   },
    // };
    // const client = this.clientData();
    // if (
    //   client &&
    //   client.firstName === data.firstName &&
    //   client.lastName === data.lastName &&
    //   client.middleName === data.middleName &&
    //   client.phone === data.phone &&
    //   client.email === data.email &&
    //   client.address?.country === data.address.country &&
    //   client.address?.city === data.address.city
    // ) {
    //   this.disableForm();
    //   return;
    // }
    // this.client.update(clientId, data as ClientFormData).subscribe({
    //   next: (response) => {
    //     if (response.success) {
    //       this.globalError.set(null);
    //       this.message.set(response.message!);
    //       this.disableForm();
    //     }
    //   },
    //   error: (err) => {
    //     console.error('error', err);
    //     if (err.error.errors) {
    //       this.formErrors.setFormErrors(this.clientForm.controls, err.error.errors);
    //     } else if (err.error.message) {
    //       this.globalError.set(err.error.message);
    //       return;
    //     }
    //   },
    // });
  }

  onDelete() {
    // const clientId = this.clientData()?._id;
    // if (!clientId) return;
    // const confirmDelete = confirm('Are you sure you want to delete this client?');
    // if (!confirmDelete) return;
    // this.client.delete(clientId).subscribe({
    //   next: (response) => {
    //     if (response.success) {
    //       this.message.set(response.message!);
    //       this.router.navigateByUrl('/clients', {
    //         state: { message: `Client ${clientId} successfully deleted!` },
    //       });
    //     }
    //   },
    //   error: (err) => {
    //     console.error('delete error', err);
    //     if (err.error.message) {
    //       this.globalError.set(err.error.message);
    //     }
    //   },
    // });
  }

  constructor() {
    effect(() => {
      const itinerary = this.itineraryData();
      console.log(itinerary);

      if (itinerary) {
        this.itineraryForm.patchValue({
          country: itinerary.country,
          hotel: itinerary.hotel,
          price: itinerary.price,
        });
      }
    });
  }
}
