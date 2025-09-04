import { Component, inject } from '@angular/core';

import { TourService } from '../../../../../services/tour.service';

@Component({
  selector: 'app-client-info',
  imports: [],
  templateUrl: './client-info.component.html',
  styleUrl: '../info-block.css',
})
export class ClientInfoComponent {
  private tour = inject(TourService);

  clientData = this.tour.getClient();
}
