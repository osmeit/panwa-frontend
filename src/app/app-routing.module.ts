import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { VacationComponent } from './_components/vacation/vacation.component';
import { SickComponent } from './_components/sick/sick.component';
import { UserComponent } from './_components/user/user.component';
import { BranchComponent } from './_components/branch/branch.component';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      //canActivate: [AuthGuard]
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'profile_edit',
    component: ProfileComponent
  },
  {
    path: 'urlaub',
    component: VacationComponent
  },
  {
    path: 'krank',
    component: SickComponent
  },
  {
    path: 'benutzer',
    component: UserComponent
  },
  {
    path: 'filiale',
    component: BranchComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
