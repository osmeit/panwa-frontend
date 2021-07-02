import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';


@Injectable()
export class Globals {
  apiUrl: string =  environment.apiUrl;
  ownURL: string = environment.ownUrl;
}