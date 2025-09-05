import { Component, inject } from '@angular/core';
import { TourService } from '../../../../../services/tour.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../../../input.component/input.component';

@Component({
  selector: 'app-itinerary-info',
  imports: [InputComponent],
  templateUrl: './itinerary-info.component.html',
  styleUrl: '../info-block.css',
})
export class ItineraryInfoComponent {
  private tour = inject(TourService);

  itineraryData = this.tour.getItinerary();

  itineraryForm = new FormGroup({
    country: new FormControl({ value: 'Italy', disabled: true }, [Validators.required]),
    hotel: new FormControl({ value: 'Raddyson resort', disabled: true }, [Validators.required]),
    price: new FormControl({ value: 1000, disabled: true }, [Validators.required]),
  });
}
