import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { NavMenuComponent } from './_components/nav-menu/nav-menu.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { VacationComponent } from './_components/vacation/vacation.component';
import { SickComponent } from './_components/sick/sick.component';
import { UserComponent } from './_components/user/user.component';
import { BranchComponent } from './_components/branch/branch.component';
import { BranchDetailComponent } from './_components/branch-detail/branch-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavMenuComponent,
    ProfileComponent,
    VacationComponent,
    SickComponent,
    UserComponent,
    BranchComponent,
    BranchDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:  [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
