import { Injectable } from "@angular/core";
import { Layer } from "../_models/layer";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../globals";
import { User } from "../_models/User";

@Injectable({
  providedIn: "root",
})
export class LayerService {
  constructor(private http: HttpClient, private g: Globals) {}

  getLayersForBrnachWithOffset(Branchid, weekOffsett) {
    return this.http.get<Layer[]>(
      this.g.apiUrl + "layer/" + Branchid + "/" + weekOffsett
    );
  }

  getLayerById(id) {
    return this.http.get<Layer>(this.g.apiUrl + "layer/" + id);
  }

  getOwnLayers(userId, count) {
    return this.http.get<Layer[]>(
      this.g.apiUrl + "layer/own/" + userId + "/" + count
    );
  }

  getWeekOfYear(offset){
    return this.http.get<Number>(
      this.g.apiUrl + "layer/woy/" + offset
    );
  }

  setLayerToUserByUserId(l: Layer, userId) {
    return this.http.put<User>(this.g.apiUrl + "layer/" + userId, l);
  }

  confirmWork(l: Layer) {
    return this.http.put<Layer>(this.g.apiUrl + "layer", l);
  }
}
