import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginData, RegisterData } from '../types/auth';
import { ApiResponse } from '../types/auth';

const BASE_URL = `${environment.backendHost}/api/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private accessToken: string | null = null;
  private isRefreshing = false;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  isTokenRefreshing(): boolean {
    return this.isRefreshing;
  }

  login(data: LoginData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}/login`, data).pipe(
      tap((res) => {
        if (res.success && res.data?.accessToken) {
          this.setAccessToken(res.data.accessToken);
        }
      })
    );
  }

  register(data: RegisterData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}/register`, data, {
      withCredentials: true,
    });
  }

  refreshToken(): Observable<ApiResponse> {
    this.isRefreshing = true;
    return this.http.get<ApiResponse>(`${BASE_URL}/refresh`).pipe(
      tap((res) => {
        this.isRefreshing = false;
        if (res.success && res.data?.accessToken) {
          this.setAccessToken(res.data.accessToken);
        }
      })
    );
  }

  logout(): Observable<ApiResponse> {
    this.accessToken = null;

    return this.http.get<ApiResponse>(`${BASE_URL}/logout`);
  }
}
