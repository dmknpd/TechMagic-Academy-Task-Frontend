import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';

import { ClientInfoComponent } from '../../tour/summary.component/info-block/client-info.component/client-info.component';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-details.component',
  imports: [MatCardModule, MatButtonModule, MatDividerModule, ClientInfoComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css',
})
export class ClientDetailsComponent {
  private route = inject(ActivatedRoute);

  private client = inject(ClientService);

  private clientId = this.route.snapshot.paramMap.get('id');

  clientData = toSignal(
    this.client.getClientFullInfo(this.clientId!).pipe(
      map((response) => {
        console.log(response.data);
        return response.data ?? null;
      }),
      catchError((err) => {
        console.error('Error fetching client:', err);
        return of(null);
      })
    ),
    { initialValue: null }
  );
}
