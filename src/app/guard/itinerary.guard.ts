import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TourService } from '../services/tour.service';

export const itineraryGuard: CanActivateFn = () => {
  const tour = inject(TourService);
  const router = inject(Router);

  const tourData = tour.getClient();

  if (!tourData()) {
    router.navigateByUrl('/new-tour/client');
    return false;
  }
  return true;
};
