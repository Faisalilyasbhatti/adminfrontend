import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from '../auth/login/guard/login.guard';
import { AuthorizationGuard } from '../auth/authorization/guard/authorization.guard';
import { DashboardComponent } from '../module/dashboard/component/dashboard.component';
import { PageNotFoundComponent } from '../module/dashboard/component/page-not-found.component';
import { LoginComponent } from '../auth/login/component/login.component';
import { ChangePasswordComponent } from '../auth/login/component/change-password.component';
import { UserListComponent } from '../module/user/component/list/user-list.component';
import { UserDetailComponent } from '../module/user/component/detail/user-detail.component';
import { RoleListComponent } from '../module/role/component/list/role-list.component';
import { RoleDetailComponent } from '../module/role/component/detail/role-detail.component';
import { MerchantListComponent } from '../module/merchant/component/list/merchant-list/merchant-list.component';
import { MerchantDetailComponent } from '../module/merchant/component/detail/merchant-detail.component';
import { MerchantDetailResolver } from '../module/merchant/resolver/merchant-detail.resolver';
import { PendingMerchantListComponent } from '../module/merchant/component/list/merchant-list/pending-merchant-list.component';


const routes: Routes = [

  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [LoggedInGuard, AuthorizationGuard],
    data : { permission : 'DAO-UP'}
  },

  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "user/list",
    component: UserListComponent,
    canActivate: [LoggedInGuard, AuthorizationGuard],
    data: { permission: 'DAO-UL'}
  },
  {
    path: "user/detail",
    component: UserDetailComponent,
    canActivate: [LoggedInGuard, AuthorizationGuard],
    data: { permission: 'DAO-UD'}
  },
  {
    path: "role/detail",
    component: RoleDetailComponent,
    canActivate: [LoggedInGuard, AuthorizationGuard],
    data: { permission: 'DAO-RD'}
  },
  {
    path: "role/list",
    component: RoleListComponent,
    canActivate: [LoggedInGuard, AuthorizationGuard],
    data: { permission: 'DAO-RL'}
  },
  {
    path: "merchant/list",
    component: MerchantListComponent,
    canActivate: [LoggedInGuard, AuthorizationGuard],
    data: { permission: 'DAO-ML'}
  },
  {
    path: "pending/merchant/list",
    component: PendingMerchantListComponent,
    canActivate: [LoggedInGuard, AuthorizationGuard],
    data: { permission: 'DAO-ML'}
  },
  {
    path: "merchant/detail",
    component: MerchantDetailComponent,
    canActivate: [LoggedInGuard, AuthorizationGuard],
    resolve: [MerchantDetailResolver],
    data: { permission: 'DAO-MU'}
  },
  {
    path:'',
    redirectTo:"dashboard",
    pathMatch:"full"
  },
  {
    path:"**",
    component: PageNotFoundComponent
  }
];

export const routing = RouterModule.forChild(routes);
