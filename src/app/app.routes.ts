import { Routes } from '@angular/router';

import { Login } from './components/auth/login/login';
import { Layout } from './layout/layout';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/noAuth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ClientComponent } from './components/tour/client.component/client.component';
import { ClientListComponent } from './components/clients/client-list.component/client-list.component';
import { CreateItineraryComponent } from './components/create-itinerary.component/create-itinerary.component';
import { canDeactivateGuard } from './guard/can-deactivate.guard';
import { ItineraryListComponent } from './components/tour/itinerary.component/itinerary-list.component/itinerary-list.component';
import { TourComponent } from './components/tour/tour.component/tour.component';
import { SummaryComponent } from './components/tour/summary.component/summary.component';
import { TourListComponent } from './components/tour-list.component/tour-list.component';
import { ClientDetailsComponent } from './components/clients/client-details.component/client-details.component';
import { Registration } from './components/auth/registration/registration';
import { adminGuard } from './guard/admin.guard';

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
          { path: 'itinerary', component: ItineraryListComponent },
          { path: 'itinerary/create', component: CreateItineraryComponent },
          { path: 'tour', component: TourComponent },
          { path: 'summary', component: SummaryComponent },
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

      {
        path: 'tour-list',
        component: TourListComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
