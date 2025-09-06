import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { catchError, switchMap, throwError, Observable, finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

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

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loading = inject(LoadingService);
  const auth = inject(AuthService);

  const token = auth.getAccessToken();
  const clonedReq = cloneRequestWithToken(req, token);

  loading.show();

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !auth.isTokenRefreshing()) {
        return auth.refreshToken().pipe(
          switchMap(() => {
            const retryReq = cloneRequestWithToken(req, auth.getAccessToken());
            return next(retryReq);
          }),
          catchError(() => throwError(() => error))
        );
      }
      return throwError(() => error);
    }),
    finalize(() => loading.hide())
  );
};
