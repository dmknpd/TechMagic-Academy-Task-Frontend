import { Component, inject } from '@angular/core';
import { TourService } from '../../../../../services/tour.service';

@Component({
  selector: 'app-tour-info',
  imports: [],
  templateUrl: './tour-info.component.html',
  styleUrl: '../info-block.css',
})
export class TourInfoComponent {
  private tour = inject(TourService);

  tourInfoData = this.tour.getTourInfo();
  discountSum = this.tour.discountSum;
}
