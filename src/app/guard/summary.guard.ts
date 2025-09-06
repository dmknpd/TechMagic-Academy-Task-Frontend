import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TourService } from '../services/tour.service';

export const summaryGuard: CanActivateFn = () => {
  const tour = inject(TourService);
  const router = inject(Router);

  const tourInfoData = tour.getTourInfo();

  if (!tourInfoData()) {
    router.navigateByUrl('/new-tour/itinerary');
    return false;
  }
  return true;
};
