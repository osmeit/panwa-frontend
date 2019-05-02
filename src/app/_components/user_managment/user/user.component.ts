import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [NgbTypeaheadConfig]
})
export class UserComponent implements OnInit {

  public model: any;
  users: User[] = [];
  searchText;
  constructor(config: NgbTypeaheadConfig, private router: Router, private userService: UserService) {
    config.showHint = true;
  }

  ngOnInit() {
    this.userService.all().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }

  redirect(path) {
    this.router.navigate([path]);
  }

  changeActive(id) {
    this.userService.changeActive(id).subscribe(u => this.users.find(x => x.id === u.id).active = u.active);
  }

  resendEmail(id) {
    if (this.users.find(x => x.id === id).active) { return; }
    this.userService.resendEmail(id).subscribe(u => this.users.find(x => x.id === u.id).active = true);
  }

}
