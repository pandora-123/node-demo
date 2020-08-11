import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './adminModule/admin-login/admin-login.component';
import { ExternalUserListComponent } from './adminModule/external-user-list/external-user-list.component';
import { RegisterUserComponent } from './externalUser/register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    ExternalUserListComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
