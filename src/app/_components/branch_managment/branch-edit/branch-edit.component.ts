import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/_services/branch.service';
import { User } from 'src/app/_models/User';
import { Branch } from 'src/app/_models/branch';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {
  branchAddForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    addres: ['', Validators.required],
    obligations: ['', Validators.required],
    contactUser: ['', Validators.required]
  });
  returnUrl: string;
  users: User[];
  filteredusers: User[];
  submitted = false;
  loading = false;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private branchService: BranchService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.branchService.getById(this.id).subscribe(data => {
      data.contactUser.password =
        data.contactUser.firstName +
        ' ' +
        data.contactUser.lastName +
        ' ' +
        data.contactUser.email;
      this.branchAddForm = this.formBuilder.group({
        name: [data.name, Validators.required],
        addres: [data.addres, Validators.required],
        obligations: [data.obligations, Validators.required],
        contactUser: [data.contactUser, Validators.required]
      });
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
    b.id = this.id;
    this.branchService.edit(b).subscribe(
      data => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
          this.loading = false;
      });
  }
}
