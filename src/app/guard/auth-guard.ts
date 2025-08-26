import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.getAccessToken()) {
    return true;
  }

  return auth.refreshToken().pipe(
    switchMap((res) => {
      if (res.success && res.data?.accessToken) {
        return of(true);
      } else {
        router.navigate(['/login']);
        return of(false);
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
