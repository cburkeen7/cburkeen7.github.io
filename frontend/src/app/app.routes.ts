import { Routes } from '@angular/router';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard.component';
import { Login } from './login/login';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Default route → login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login page (public)
  { path: 'login', component: Login },

  // Admin dashboard (PROTECTED)
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [AuthGuard]
  },

  // Wildcard → login
  { path: '**', redirectTo: 'login' }
];