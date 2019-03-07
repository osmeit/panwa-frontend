import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
  }


  redirect(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
