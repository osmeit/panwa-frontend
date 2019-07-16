import { Component, OnInit } from '@angular/core';
import { WorkLayer } from 'src/app/_models/work-layer';
import { WorkSet } from 'src/app/_models/work-set';
import { Router } from '@angular/router';
import { WorkService } from 'src/app/_services/work.service';

@Component({
  selector: 'app-add-worklayer',
  templateUrl: './add-worklayer.component.html',
  styleUrls: ['./add-worklayer.component.css']
})
export class AddWorklayerComponent implements OnInit {

  workLayer: WorkLayer;
  returnUrl: string;
  submitted = false;
  loading = false;
  days;
  constructor(private router: Router, private workService: WorkService) { }

  ngOnInit() {
    this.returnUrl = 'worklayers';
    this.days = [
    {id: 1, name: 'Montag'},
    {id: 2, name: 'Dienstag'},
    {id: 3, name: 'Mittwoch'},
    {id: 4, name: 'Donnerstag'},
    {id: 5, name: 'Freitag'},
    {id: 4, name: 'Samstag'},
    {id: 4, name: 'Sonntag'},
  ];
    this.workLayer = new WorkLayer();
    this.workLayer.workSet = [];
    this.workLayer.workSet.push(new WorkSet());
  }

  addWorkSet() {
    this.workLayer.workSet.push(new WorkSet());
  }

  onSubmit() {
    this.workLayer.workSet.forEach(element => {
      element.startTime = '0001.01.01 ' + element.startPicker.hour + ':' + element.startPicker.minute + ':00';
      element.endTime = '0001.01.01 ' + element.endPicker.hour + ':' + element.endPicker.minute + ':00';
    });

    this.workService.add(this.workLayer).subscribe(
      data => {
        console.log(data);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        // this.loading = false;
      }
    );
  }

}
