import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../types/res';

export abstract class ApiService<ModelData, FormData> {
  protected http = inject(HttpClient);

  protected abstract baseUrl: string;

  getAll(): Observable<ApiResponse<ModelData[]>> {
    return this.http.get<ApiResponse<ModelData[]>>(this.baseUrl);
  }

  getById(id: string): Observable<ApiResponse<ModelData>> {
    return this.http.get<ApiResponse<ModelData>>(`${this.baseUrl}/${id}`);
  }

  create(data: FormData): Observable<ApiResponse<ModelData>> {
    return this.http.post<ApiResponse<ModelData>>(`${this.baseUrl}/`, data);
  }

  update(id: string, data: FormData): Observable<ApiResponse<ModelData>> {
    return this.http.put<ApiResponse<ModelData>>(`${this.baseUrl}/${id}/edit`, data);
  }

  delete(id: string): Observable<ApiResponse<{ id: string }>> {
    return this.http.delete<ApiResponse<{ id: string }>>(`${this.baseUrl}/${id}/delete`);
  }
}
