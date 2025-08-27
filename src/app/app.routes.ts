import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/noAuth.guard';
import { Welcome } from './components/welcome/welcome';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [noAuthGuard] },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [{ path: '', component: Welcome }],
  },
];
