import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Router} from "@angular/router"

//satic for test -> redirekt to branch
const states = ['test','abcd','klapperhof','longerich','buchfrost','monheim'];

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
  providers: [NgbTypeaheadConfig]
})
export class BranchComponent implements OnInit {
  
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

  red(){
    this.router.navigate(['filiale/id']);
  }
}
