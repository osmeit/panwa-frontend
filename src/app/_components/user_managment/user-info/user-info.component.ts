import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userData: boolean;
  userBranches: boolean;
  u: User;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.userData = true;
    this.userBranches = true;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.userService.getUserWithAllBranches(this.id).subscribe(
      data => {
        this.u = data;
        console.log(this.u);
    });
  }

  changeStateOfUserDataBool() {
    this.userData = !this.userData;
  }

  changeStateOfUserBranchesBool() {
    this.userBranches = !this.userBranches;
  }
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
