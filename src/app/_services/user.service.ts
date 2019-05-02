import { BranchUser } from './../_models/branchUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from '../globals';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private g: Globals) {
  }

  all() {
    return this.http.get<User[]>(this.g.apiUrl + `users/getAll`);
  }

  getById(id: number) {
    return this.http.get<User>(this.g.apiUrl + `users/` + id);
  }

  changeActive(id) {
    return this.http.get<User>(this.g.apiUrl + 'users/changeActive/' + id);
  }

  regRequest(u: User) {
    return this.http.put<User>(this.g.apiUrl + 'users/regRequest', u);
  }

  edit(u: User) {
    return this.http.put<User>(this.g.apiUrl + 'users/edit', u);
  }

  checkAuthCode(code: string) {
    return this.http.get<User>(this.g.apiUrl + 'users/checkAuthCode/' + code);
  }

  completReg(u: User) {
    return this.http.put<User>(this.g.apiUrl + 'users/completReg', u);
  }

  resendEmail(id: string) {
    return this.http.get<User>(this.g.apiUrl + 'users/resendMail/' + id);
  }

  getAllWithBranches(id) {
    return this.http.get<User[]>(this.g.apiUrl + 'users/getWithBranches/' + id);
  }

  addOrRemoveBranch(bu: BranchUser) {
    return this.http.post<any>(this.g.apiUrl + `users/addOrRemoveBranch`, bu);
  }
}


