import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { catchError, switchMap, throwError, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

const cloneRequestWithToken = (
  req: HttpRequest<unknown>,
  token: string | null
): HttpRequest<unknown> => {
  return token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
    : req.clone({ withCredentials: true });
};

const handleTokenRefresh = (
  auth: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  originalError: HttpErrorResponse
): Observable<HttpEvent<unknown>> => {
  return auth.refreshToken().pipe(
    switchMap((res) => {
      if (res.success && res.data?.accessToken) {
        auth.setAccessToken(res.data.accessToken);
        const retryReq = cloneRequestWithToken(req, res.data.accessToken);
        return next(retryReq);
      }
      return throwError(() => originalError);
    })
  );
};

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);

  const token = auth.getAccessToken();
  const clonedReq = cloneRequestWithToken(req, token);

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !auth.isTokenRefreshing()) {
        return handleTokenRefresh(auth, req, next, error);
      }
      return throwError(() => error);
    })
  );
};
