import { Component, effect, inject, Input, Signal } from '@angular/core';
import { TourService } from '../../../../../services/tour.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { InputComponent } from '../../../../input.component/input.component';
import { TourInfoFormData } from '../../../../../types/tour';

@Component({
  selector: 'app-tour-info',
  imports: [InputComponent],
  templateUrl: './tour-info.component.html',
  styleUrl: '../info-block.css',
})
export class TourInfoComponent {
  @Input() tourInfoData!: Signal<TourInfoFormData | null>;

  tourForm = new FormGroup({
    startDate: new FormControl({ value: new Date(), disabled: true }, [Validators.required]),
    duration: new FormControl({ value: 0, disabled: true }, [Validators.required]),
    quantity: new FormControl({ value: 0, disabled: true }, [
      Validators.required,
      Validators.min(1),
    ]),
    discount: new FormControl({ value: 0, disabled: true }),
  });

  constructor() {
    effect(() => {
      const tourInfo = this.tourInfoData();
      if (tourInfo) {
        this.tourForm.patchValue({
          startDate: tourInfo.startDate,
          duration: tourInfo.duration,
          quantity: tourInfo.quantity,
          discount: tourInfo.discount,
        });
      }
    });
  }
}
