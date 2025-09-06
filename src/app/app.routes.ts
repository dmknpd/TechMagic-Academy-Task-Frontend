import { Routes } from '@angular/router';

import { Login } from './components/auth/login/login';
import { Layout } from './layout/layout';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/no-auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ClientComponent } from './components/tour/client.component/client.component';
import { ClientListComponent } from './components/clients/client-list.component/client-list.component';
import { CreateItineraryComponent } from './components/create-itinerary.component/create-itinerary.component';
import { ItineraryListComponent } from './components/tour/itinerary.component/itinerary-list.component/itinerary-list.component';
import { TourComponent } from './components/tour/tour.component/tour.component';
import { SummaryComponent } from './components/tour/summary.component/summary.component';
import { ClientDetailsComponent } from './components/clients/client-details.component/client-details.component';
import { Registration } from './components/auth/registration/registration';
import { adminGuard } from './guard/admin.guard';
import { itineraryGuard } from './guard/itinerary.guard';
import { tourInfoGuard } from './guard/tour-info.guard';
import { summaryGuard } from './guard/summary.guard';
import { ItineraryDetailsComponent } from './components/itinerary-details.component/itinerary-details.component';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [noAuthGuard] },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'registration', component: Registration, canActivate: [adminGuard] },
      // new-tour
      {
        path: 'new-tour',
        children: [
          { path: '', redirectTo: 'client', pathMatch: 'full' },
          { path: 'client', component: ClientComponent },
          { path: 'itinerary', component: ItineraryListComponent, canActivate: [itineraryGuard] },
          { path: 'tour', component: TourComponent, canActivate: [tourInfoGuard] },
          { path: 'summary', component: SummaryComponent, canActivate: [summaryGuard] },
        ],
      },

      //clients
      {
        path: 'clients',
        children: [
          { path: '', component: ClientListComponent },
          { path: ':id', component: ClientDetailsComponent },
        ],
      },

      // itinerary
      {
        path: 'itinerary',
        children: [
          { path: '', component: ItineraryListComponent },
          { path: ':id', component: ItineraryDetailsComponent },
          { path: 'create', component: CreateItineraryComponent, canActivate: [adminGuard] },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
