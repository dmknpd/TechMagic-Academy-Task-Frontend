import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Layout } from './layout/layout';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/noAuth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ClientComponent } from './components/tour/client.component/client.component';
import { ItineraryComponent } from './components/tour/itinerary.component/itinerary.component';
import { ClientListComponent } from './components/client-list.component/client-list.component';

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
        children: [
          { path: '', redirectTo: 'client', pathMatch: 'full' },
          { path: 'client', component: ClientComponent },
          { path: 'itinerary', component: ItineraryComponent },
          // { path: 'confirm', component: SaleConfirmComponent },
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
