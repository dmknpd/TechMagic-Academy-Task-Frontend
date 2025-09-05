import { Component, inject } from '@angular/core';
import { TourService } from '../../../../../services/tour.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { InputComponent } from '../../../../input.component/input.component';

@Component({
  selector: 'app-tour-info',
  imports: [InputComponent],
  templateUrl: './tour-info.component.html',
  styleUrl: '../info-block.css',
})
export class TourInfoComponent {
  private tour = inject(TourService);

  tourInfoData = this.tour.getTourInfo();
  discountSum = this.tour.discountSum;

  tourForm = new FormGroup({
    startDate: new FormControl({ value: new Date(1757065412746), disabled: true }, [
      Validators.required,
    ]),
    duration: new FormControl({ value: 1, disabled: true }, [Validators.required]),
    quantity: new FormControl({ value: 1, disabled: true }, [
      Validators.required,
      Validators.min(1),
    ]),
    discount: new FormControl({ value: 15, disabled: true }),
  });
}
