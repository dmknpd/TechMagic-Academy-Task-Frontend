import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../types/res';
import { Client, ClientFormData } from '../../types/client';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends ApiService<Client, ClientFormData> {
  protected override baseUrl = `${environment.backendHost}/api/clients`;

  getByPhone(phone: string): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${this.baseUrl}/search?phone=${phone}`);
  }

  getFullInfo(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}/details`);
  }
}
