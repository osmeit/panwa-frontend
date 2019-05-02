import { BranchService } from './../../_services/branch.service';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Router} from "@angular/router"
import { Branch } from 'src/app/_models/branch';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
  providers: [NgbTypeaheadConfig]
})
export class BranchComponent implements OnInit {
  
  public model: any;
  branches: Branch[]= [];
  searchText;
  addres: string;
  obligations: string;
  
  constructor(config: NgbTypeaheadConfig,
     private router: Router,
     private branchService: BranchService) {
    config.showHint = true;
  }
  
  ngOnInit() {
    this.branchService.all().subscribe(br => {
      this.branches = br;      
    });
  }

  redirect(path) {
    this.router.navigate([path]);
  }

  AuthLvl(lvl: number){
    let user = JSON.parse(localStorage.getItem('currentUser'))    
    switch (user['role']) {
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

}
