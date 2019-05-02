import { User } from 'src/app/_models/User';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/_models/role';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number;
  userEditForm: FormGroup;
  loading = false;
  submitted = false;  
  returnUrl: string;  
  error = '';
  user: User;
  checkUser: User;
  codeValid: boolean;
  role: Role;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

    ngOnInit() {
      this.returnUrl = 'benutzer';
      this.route.params.subscribe(params => {
        this.id = params['id'];
    });
    this.userService.getById(this.id).subscribe(
      data => {
        this.userEditForm = this.formBuilder.group({
          firstname: [data.firstName, Validators.required],
          lastname: [data.lastName, Validators.required],
          username: [data.username, Validators.required],
          address: [data.address, Validators.required],
          city: [data.city, Validators.required],
          postcode: [data.postcode, Validators.required],
          phone: [data.phone, Validators.required],
          email: [data.email, Validators.email],
          role: [data.role, Validators.required]
      });
          this.codeValid = true;
          this.user = data;
          
      },
      error => {
          this.codeValid = false;
      });
    
  
    }

    get f() { return this.userEditForm.controls; }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.userEditForm.invalid) {
          return;
      }
      this.loading = true;
      
      var u = new User();
          u.firstName = this.f.firstname.value;
          u.lastName = this.f.lastname.value;
          u.username = this.f.username.value;
          u.address = this.f.address.value;
          u.city = this.f.city.value;
          u.postcode = this.f.postcode.value;
          u.phone = this.f.phone.value;
          u.email = this.f.email.value;
          u.role = this.f.role.value;
          u.id = this.id;
      
      this.userService.edit(u).subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
        
    }

}
