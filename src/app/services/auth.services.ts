import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const BASE_URL = `${environment.backendHost}/api`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login`, data, { withCredentials: true });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/register`, data, { withCredentials: true });
  }

  refreshToken(): Observable<any> {
    return this.http.get(`${BASE_URL}/auth/refresh`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
  }
}
