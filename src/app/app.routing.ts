import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './module/dashboard/component/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  // { path: 'reset-password', component: ResetPasswordComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
