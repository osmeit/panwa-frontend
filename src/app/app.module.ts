import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {InputSwitchModule} from 'primeng/inputswitch';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';


import { BranchService } from './_services/branch.service';
import { UserService } from 'src/app/_services/user.service';

import { Globals } from './globals';

import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { NavMenuComponent } from './_components/nav-menu/nav-menu.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { VacationComponent } from './_components/vacation/vacation.component';
import { SickComponent } from './_components/sick/sick.component';
import { UserComponent } from './_components/user_managment/user/user.component';
import { BranchComponent } from './_components/branch_managment/branch/branch.component';
import { UserAddComponent } from './_components/user_managment/user-add/user-add.component';
import { UserRegComponent } from './_components/user_managment/user-reg/user-reg.component';
import { UserInfoComponent } from './_components/user_managment/user-info/user-info.component';
import { UserEditComponent } from './_components/user_managment/user-edit/user-edit.component';
import { BranchAddComponent } from './_components/branch_managment/branch-add/branch-add.component';
import { BranchEditComponent } from './_components/branch_managment/branch-edit/branch-edit.component';
import { BranchUserSelectComponent } from './_components/branch_managment/branch-user-select/branch-user-select.component';

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
    UserAddComponent,
    UserRegComponent,
    UserInfoComponent,
    UserEditComponent,
    BranchAddComponent,
    BranchEditComponent,
    BranchUserSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    EditorModule,
    AutoCompleteModule,
    InputSwitchModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    Globals,
    UserService,
    BranchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
