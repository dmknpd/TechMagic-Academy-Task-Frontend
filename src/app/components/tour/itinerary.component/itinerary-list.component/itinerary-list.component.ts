import { Component, effect, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { ItineraryListItemComponent } from '../itinerary-list-item.component/itinerary-list-item.component';
import { ItineraryService } from '../../../../services/itinerary.service';
import { Itinerary } from '../../../../types/itinerary';

@Component({
  selector: 'app-itinerary-list',
  imports: [MatGridListModule, ItineraryListItemComponent],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.css',
})
export class ItineraryListComponent {
  private itinerary = inject(ItineraryService);

  itineraryDataList = toSignal(this.itinerary.getAll().pipe(map((res) => res.data ?? [])), {
    initialValue: [],
  });

  constructor() {
    effect(() => {
      const list = this.itineraryDataList();
      console.log('Текущий массив итинерариев:', list);
    });
  }
}
