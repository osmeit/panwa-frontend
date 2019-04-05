import { Globals } from './../../globals';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { retry } from 'rxjs/operators';
import { User } from 'src/app/_models/User';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  user: User;
  g: Globals
  constructor(private router: Router,
    private authenticationService: AuthenticationService
    ) {  }

  ngOnInit() {
  }

  AuthLvl(lvl: number){
    this.user = JSON.parse(localStorage.getItem('currentUser'))    
    switch (this.user['role']) {
      case "Admin":
        return true;

      case "Moderator":
        if(lvl <= 1) return true;
        return false; 
        
      case "User":
        if(lvl == 0) return true;
        return false;
    
      default:
        break;
    }
  }
  redirect(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
