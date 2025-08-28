import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const BASE_URL = `${environment.backendHost}/api/clients`;

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  searchByPhone(phone: string): Observable<any> {
    return this.http.get(`${BASE_URL}/search?phone=${phone}`);
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${BASE_URL}/`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/create`, data);
  }
}
