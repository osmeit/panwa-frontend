import { BranchService } from '../../../_services/branch.service';
import { Branch } from '../../../_models/branch';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit {
  branchAddForm: FormGroup;
  returnUrl: string;
  users: User[];
  filteredusers: User[];
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private branchService: BranchService
  ) {}

  ngOnInit() {
    this.branchAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      addres: ['', Validators.required],
      obligations: ['', Validators.required],
      contactUser: ['', Validators.required]
    });
    this.returnUrl = 'filiale';
    this.userService.all().subscribe(data => {
      data.forEach(element => {
        element.password =
          element.firstName + ' ' + element.lastName + ' ' + element.email;
      });
      this.users = data;
    });
  }

  filterUsersSingle(event) {
    const query = event.query;
    this.filteredusers = this.filterUsers(query);
  }

  filterUsers(query): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.firstName.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(user);
      } else if (
        user.lastName.toLowerCase().indexOf(query.toLowerCase()) === 0
      ) {
        filtered.push(user);
      } else if (user.email.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(user);
      }
    }
    return filtered;
  }

  get f() {
    return this.branchAddForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.branchAddForm.invalid) {
      return;
    }
    this.loading = true;

    const u = new User();
    const b = new Branch();
    b.name = this.f.name.value;
    b.addres = this.f.addres.value;
    b.obligations = this.f.obligations.value;
    u.id = this.f.contactUser.value.id;
    b.contactUser = u;
    this.branchService.add(b).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loading = false;
      }
    );
  }
}
