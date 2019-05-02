import { User } from 'src/app/_models/User';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {
  authCode: string;
  userRegForm: FormGroup;
  loading = false;
  submitted = false;  
  returnUrl: string;  
  error = '';
  checkUser: User;
  codeValid: boolean;

  constructor(
    titleService: Title, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {
    titleService.setTitle("PANWA - Registrierung abschließen");    
   }

  ngOnInit() {
    this.returnUrl = 'login';
    this.route.params.subscribe(params => {
      this.authCode = params['code'];
  });
  this.userService.checkAuthCode(this.authCode).subscribe(
    data => {
      this.userRegForm = this.formBuilder.group({
        firstname: [data.firstName, Validators.required],
        lastname: [data.lastName, Validators.required],
        username: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postcode: ['', Validators.required],
        phone: ['', Validators.required],
        email: [data.email, Validators.email],
        password: ['', Validators.required],
        new_password: ['', Validators.required]
    });
        this.codeValid = true;
    },
    error => {
        this.codeValid = false;
    });
  

  }


get f() { return this.userRegForm.controls; }

onSubmit() {
  this.submitted = true;

  if(this.f.password.value != this.f.new_password.value){      
    this.error = 'pw';
    return;
  } else this.error = '';
  
  if(this.f.password.value.length<6){
    this.error = 'pwl';
    return;
  } else this.error ='';
  
  // stop here if form is invalid
  if (this.userRegForm.invalid) {
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
      u.password = this.f.password.value;
  
  this.userService.completReg(u).subscribe(
    data => {
        this.router.navigate([this.returnUrl]);
    },
    error => {
        this.error = error;
        this.loading = false;
    });
    
}

}
