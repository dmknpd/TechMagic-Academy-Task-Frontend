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

  getClientByPhone(phone: string): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${BASE_URL}/search?phone=${phone}`);
  }

  getClientFullInfo(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/${id}/details`);
  }

  getAllClients(): Observable<ApiResponse<Client[]>> {
    return this.http.get<ApiResponse<Client[]>>(`${BASE_URL}/`);
  }

  create(data: ClientFormData): Observable<ApiResponse<Client>> {
    return this.http.post<ApiResponse<Client>>(`${BASE_URL}/create`, data);
  }

  update(id: string, data: ClientFormData): Observable<ApiResponse<Client>> {
    return this.http.put<ApiResponse<Client>>(`${BASE_URL}/${id}/edit`, data);
  }

  delete(id: string): Observable<ApiResponse<{ id: string }>> {
    return this.http.delete<ApiResponse<{ id: string }>>(`${BASE_URL}/${id}/delete`);
  }
}
