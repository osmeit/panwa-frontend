import { User } from 'src/app/_models/User';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userRegForm: FormGroup;
  loading = false;
  submitted = false;  
  returnUrl: string;  
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.userRegForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email]
  });
  this.returnUrl = 'benutzer';
  }

  redirect(path) {
    this.router.navigate([path]);
  }

  get f() { return this.userRegForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.userRegForm.invalid) {
          return;
      }
      this.loading = true;
      
      var u = new User();
      u.firstName = this.f.firstname.value;
      u.lastName = this.f.lastname.value;
      u.email = this.f.email.value;
      
      this.userService.regRequest(u).subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
        
  }
}
