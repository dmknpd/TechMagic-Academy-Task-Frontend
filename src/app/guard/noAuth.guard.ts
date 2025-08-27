import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getAccessToken();

  if (token) {
    router.navigate(['/dashboard']);
    return false;
  }

  return auth.refreshToken().pipe(
    switchMap((res) => {
      if (res.success && res.data?.accessToken) {
        router.navigate(['/']);
        return of(false);
      } else {
        return of(true);
      }
    }),
    catchError(() => {
      return of(true);
    })
  );
};
