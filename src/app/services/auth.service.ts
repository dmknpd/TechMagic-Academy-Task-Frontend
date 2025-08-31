import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { environment } from '../../environments/environment';
import { LoginData, RegisterData } from '../types/auth';
import { ApiResponse } from '../types/res';

const BASE_URL = `${environment.backendHost}/api/auth`;

interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private accessToken = signal<string | null>(null);
  private userEmail = signal<string | null>(null);

  private isRefreshing = false;

  setAccessToken(token: string) {
    this.accessToken.set(token);

    const decoded = this.decodeToken(token);
    if (decoded) {
      this.userEmail.set(decoded.email);
    }
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  getUserEmail(): string | null {
    return this.userEmail();
  }

  isTokenRefreshing(): boolean {
    return this.isRefreshing;
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  login(data: LoginData): Observable<ApiResponse<{ accessToken: string }>> {
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

  refreshToken(): Observable<ApiResponse<{ accessToken: string }>> {
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
    this.accessToken.set(null);

    return this.http.get<ApiResponse>(`${BASE_URL}/logout`);
  }
}
