import { BranchUser } from '../../../_models/branchUser';
import { Branch } from 'src/app/_models/branch';
import { UserService } from '../../../_services/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/_models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/_services/branch.service';

@Component({
  selector: 'app-branch-user-select',
  templateUrl: './branch-user-select.component.html',
  styleUrls: ['./branch-user-select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BranchUserSelectComponent implements OnInit {
  users: User[];
  branchid: Number;
  branch: Branch;
  checked: boolean;
  bu: BranchUser;
  loading = false;
  searchText;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private branchService: BranchService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.branchid = params['id'];
      this.branchService.getById(this.branchid).subscribe(branch => {
        this.branch = branch;
        this.userService.getAllWithBranches(branch.id).subscribe(users => {
          this.users = users;
          this.users.forEach(element => {
            element.branchs.forEach(item => {
              if (item.branchId === this.branchid) { element.password = '1'; }
            });
          });
        });
      });
    });
  }

  changeWork(user: User) {
    if (!this.loading) {
      this.bu = new BranchUser();
      this.loading = true;
      this.bu.userId = user.id;
      this.bu.branchId = this.branchid;
    this.userService.addOrRemoveBranch(this.bu)
    .subscribe(
      () => {
          user.password === '1' ? user.password = '0' : user.password = '1';
          this.loading = false;
      },
      () => {
          user.password === '1' ? user.password = '0' : user.password = '1';
          this.loading = false;
      });
    }
  }
}
