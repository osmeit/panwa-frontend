
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
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



import { AuthGuard } from './_guards/auth.guard';
import { Role } from './_models/role';
import { ShowWorklayerComponent } from './_components/worklayer_managment/show-worklayer/show-worklayer.component';
import { AddWorklayerComponent } from './_components/worklayer_managment/add-worklayer/add-worklayer.component';
import { BranchWorklayerSelectComponent } from './_components/branch_managment/branch-worklayer-select/branch-worklayer-select.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register/:code',
    component: UserRegComponent
  },
  {
    path: 'profile_edit',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Moderator] }
  },
  {
    path: 'urlaub',
    component: VacationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'krank',
    component: SickComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'benutzer',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'benutzer/add',
    component: UserAddComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Moderator] }
  },
  {
    path: 'benutzer/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Moderator] }
  },
  {
    path: 'benutzer/:id',
    component: UserInfoComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Moderator] }
  },
  {
    path: 'filiale',
    component: BranchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'filiale/add',
    component: BranchAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'filiale/edit/:id',
    component: BranchEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'filiale/user-select/:id',
    component: BranchUserSelectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'filiale/worklayer-select/:id',
    component: BranchWorklayerSelectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'worklayers',
    component: ShowWorklayerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'worklayers/add',
    component: AddWorklayerComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
