import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TourService } from '../services/tour.service';

export const tourInfoGuard: CanActivateFn = () => {
  const tour = inject(TourService);
  const router = inject(Router);

  const itineraryData = tour.getItinerary();

  if (!itineraryData()) {
    router.navigateByUrl('/new-tour/itinerary');
    return false;
  }
  return true;
};
