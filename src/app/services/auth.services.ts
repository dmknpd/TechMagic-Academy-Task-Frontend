import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginData, RegisterData } from '../types/auth';
import { LoginResponse } from '../types/auth';

const BASE_URL = `${environment.backendHost}/api`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}/auth/login`, data, { withCredentials: true });
  }

  register(data: RegisterData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}/auth/register`, data, {
      withCredentials: true,
    });
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${BASE_URL}/auth/refresh`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
  }
}
