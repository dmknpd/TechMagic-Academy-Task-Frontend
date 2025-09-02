import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Layout } from './layout/layout';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/noAuth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ClientComponent } from './components/tour/client.component/client.component';
import { ClientListComponent } from './components/client-list.component/client-list.component';
import { CreateItineraryComponent } from './components/create-itinerary.component/create-itinerary.component';
import { canDeactivateGuard } from './guard/can-deactivate.guard';
import { ItineraryListComponent } from './components/tour/itinerary.component/itinerary-list.component/itinerary-list.component';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [noAuthGuard] },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', component: WelcomeComponent },
      {
        path: 'new-tour',
        canDeactivate: [canDeactivateGuard],
        children: [
          { path: '', redirectTo: 'client', pathMatch: 'full' },
          { path: 'client', component: ClientComponent },
          { path: 'itinerary', component: ItineraryListComponent },
          { path: 'itinerary/create', component: CreateItineraryComponent },
        ],
      },
      {
        path: 'client-list',
        component: ClientListComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
