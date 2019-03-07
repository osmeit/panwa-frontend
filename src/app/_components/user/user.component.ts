import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';


const states = ['test', 'abcd', 'klapperhof', 'longerich', 'buchfrost', 'monheim'];


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [NgbTypeaheadConfig]
})
export class UserComponent implements OnInit {

  public model: any;

  constructor(config: NgbTypeaheadConfig, private router: Router) {
    // customize default values of typeaheads used by this component tree
    config.showHint = true;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )

  ngOnInit() {
  }

  red() {
    this.router.navigate(['filiale/id']);
  }

}
