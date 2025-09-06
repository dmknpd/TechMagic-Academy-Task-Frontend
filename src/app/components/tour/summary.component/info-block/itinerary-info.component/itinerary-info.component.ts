import { Component, effect, inject, Input, Signal } from '@angular/core';
import { TourService } from '../../../../../services/tour.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../../../input.component/input.component';
import { Itinerary } from '../../../../../types/itinerary';

@Component({
  selector: 'app-itinerary-info',
  imports: [InputComponent],
  templateUrl: './itinerary-info.component.html',
  styleUrl: '../info-block.css',
})
export class ItineraryInfoComponent {
  @Input() itineraryData!: Signal<Itinerary | null>;

  itineraryForm = new FormGroup({
    country: new FormControl({ value: '-', disabled: true }, [Validators.required]),
    hotel: new FormControl({ value: '-', disabled: true }, [Validators.required]),
    price: new FormControl({ value: 0, disabled: true }, [Validators.required]),
  });

  constructor() {
    effect(() => {
      const client = this.itineraryData();
      if (client) {
        this.itineraryForm.patchValue({
          country: client.country,
          hotel: client.hotel,
          price: client.price,
        });
      }
    });
  }
}
