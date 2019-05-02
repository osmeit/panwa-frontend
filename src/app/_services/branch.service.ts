import { Branch } from './../_models/branch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor(private http: HttpClient, private g: Globals) {}

  all() {
    return this.http.get<Branch[]>(this.g.apiUrl + `branchs/getAll`);
  }

  getById(id) {
    return this.http.get<Branch>(this.g.apiUrl + 'branchs/' + id);
  }

  add(b: Branch) {
    return this.http.put<Branch>(this.g.apiUrl + 'branchs', b);
  }

  edit(b: Branch) {
    return this.http.put<Branch>(this.g.apiUrl + 'branchs/edit', b);
  }
}
