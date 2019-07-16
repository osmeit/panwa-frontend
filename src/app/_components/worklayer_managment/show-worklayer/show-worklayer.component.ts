import { Component, OnInit } from '@angular/core';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { WorkLayer } from 'src/app/_models/work-layer';
import { WorkService } from 'src/app/_services/work.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-show-worklayer',
  templateUrl: './show-worklayer.component.html',
  styleUrls: ['./show-worklayer.component.css']
})
export class ShowWorklayerComponent implements OnInit {

  searchText;
  workLayers: WorkLayer[] = [];

  constructor(config: NgbTypeaheadConfig, private router: Router, private workService: WorkService) {
    config.showHint = true;
  }
  ngOnInit() {
    this.workService.getAll().pipe(first()).subscribe(works => {
      this.workLayers = works;
    });
  }

  redirect(path) {
    this.router.navigate([path]);
  }
}
