import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/_services/branch.service';
import { Branch } from 'src/app/_models/branch';
import { WorkService } from 'src/app/_services/work.service';
import { WorkLayer } from 'src/app/_models/work-layer';
import { WorkSet } from 'src/app/_models/work-set';

@Component({
  selector: 'app-branch-worklayer-select',
  templateUrl: './branch-worklayer-select.component.html',
  styleUrls: ['./branch-worklayer-select.component.css']
})
export class BranchWorklayerSelectComponent implements OnInit {

  branchid: Number;
  branch: Branch;
  workLayers: WorkLayer[];
  wl: WorkLayer;
  desc: String;
  isReady = false;
  returnUrl: any;
  constructor(
    private workService: WorkService,
    private route: ActivatedRoute,
    private router: Router,
    private branchService: BranchService
  ) { }

  ngOnInit() {
    this.wl = new WorkLayer();
    this.returnUrl = 'filiale';
    this.route.params.subscribe(params => {
      this.branch = new Branch();
      this.branchid = params['id'];
      this.branchService.getById(this.branchid).subscribe(branch => {
        this.branch = branch;
        this.wl = branch.workLayer;
        this.isReady = true;
      });
      this.workService.getAllWithSets().subscribe(workLayers => {
        this.workLayers = workLayers;
      });
    });
  }

  submit() {
    this.branch.workLayer = this.wl;
    this.branchService.editWorkLayer(this.branch).subscribe(
      data => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
      });
  }

  setWl(wl: WorkLayer) {
    this.wl = wl;
  }

  getDayString(ws: WorkSet) {
    switch (ws.day) {
      case 1:
        return 'Montag';
        break;
      case 2:
        return 'Dienstag';
        break;
      case 3:
        return 'Mittwoch';
        break;
      case 4:
        return 'Donnerstag';
        break;
      case 5:
        return 'Freitag';
        break;
      case 6:
        return 'Samstag';
        break;
      case 7:
        return 'Sonntag';
        break;
      default:
        return '';
        break;
    }
  }

  convertTime(time: String) {
    return time.substring(11, 16);
  }

}
