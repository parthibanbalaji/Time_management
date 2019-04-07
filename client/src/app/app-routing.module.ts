import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login-c/login.component';
import { LogoutComponent }  from './logout-c/logout.component';
import {AuthGuardLogin} from './general-services/auth-guard.service'


export const routes: Routes = [
  { path: 'register', loadChildren: './register/register.module#RegisterModule' },
  { path: '', component:LoginComponent },
  {path:'dashboard', loadChildren:'./dashboard/dashboard.module#DashboardModule',canActivate:[AuthGuardLogin]},
  {path:'logout',component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
