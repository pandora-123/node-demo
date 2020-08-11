import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './adminModule/admin-login/admin-login.component';
import { ExternalUserListComponent } from './adminModule/external-user-list/external-user-list.component';
import { RegisterUserComponent } from './externalUser/register-user/register-user.component';


const routes: Routes = [
  { path: '', component: AdminLoginComponent},
  { path: 'login', component: AdminLoginComponent},
  { path: 'externar-user-list', component: ExternalUserListComponent},
  { path: 'user-register', component: RegisterUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AdminLoginComponent,
  ExternalUserListComponent,
  RegisterUserComponent]
