import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard.component';
// import { LoginComponent } from './components/login/login.component'; will be used later when login functionality is implemented 

// Define and export routes
export const routes: Routes = [
  { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' }, // default route
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: '**', redirectTo: 'admin-dashboard' } // wildcard route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}