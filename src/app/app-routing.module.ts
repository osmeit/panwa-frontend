import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { VacationComponent } from './_components/vacation/vacation.component';
import { SickComponent } from './_components/sick/sick.component';
import { UserComponent } from './_components/user/user.component';
import { BranchComponent } from './_components/branch/branch.component';
import { BranchDetailComponent } from './_components/branch-detail/branch-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { Role } from './_models/role';

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
    path: 'filiale',
    component: BranchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'filiale/id',
    component: BranchDetailComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
