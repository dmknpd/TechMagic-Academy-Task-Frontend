import { Component, inject } from '@angular/core';

import { TourService } from '../../../../../services/tour.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../../../input.component/input.component';

@Component({
  selector: 'app-client-info',
  imports: [InputComponent],
  templateUrl: './client-info.component.html',
  styleUrl: '../info-block.css',
})
export class ClientInfoComponent {
  private tour = inject(TourService);

  clientData = this.tour.getClient();

  clientForm = new FormGroup({
    firstName: new FormControl({ value: 'Sochenko', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    lastName: new FormControl({ value: 'Dmytro', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    middleName: new FormControl({ value: 'Viktorovych', disabled: true }, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    country: new FormControl({ value: 'Ukraine', disabled: true }, [Validators.required]),
    city: new FormControl({ value: 'Kyiv', disabled: true }, [Validators.required]),
    phone: new FormControl({ value: '380501234567', disabled: true }, [
      Validators.required,
      Validators.pattern(/^\d{12}$/),
    ]),
    email: new FormControl({ value: 'masil@mail.com', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
  });
}
