import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../types/res';
import { Client, ClientFormData } from '../types/client';

const BASE_URL = `${environment.backendHost}/api/clients`;

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  searchByPhone(phone: string): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${BASE_URL}/search?phone=${phone}`);
  }

  getAllClients(): Observable<ApiResponse<Client[]>> {
    return this.http.get<ApiResponse<Client[]>>(`${BASE_URL}/`);
  }

  create(data: ClientFormData): Observable<ApiResponse<Client>> {
    return this.http.post<ApiResponse<Client>>(`${BASE_URL}/create`, data);
  }
}
