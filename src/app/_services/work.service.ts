import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Globals } from '../globals';
import { WorkLayer } from '../_models/work-layer';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private http: HttpClient, private g: Globals) {
  }

  getAll() {
    return this.http.get<WorkLayer[]>(this.g.apiUrl + `work/getAll`);
  }

  getAllWithSets() {
    return this.http.get<WorkLayer[]>(this.g.apiUrl + `work/getAllWithSets`);
  }

  add(wl: WorkLayer) {
    return this.http.put<WorkLayer>(this.g.apiUrl + 'work/add', wl);
  }
}
