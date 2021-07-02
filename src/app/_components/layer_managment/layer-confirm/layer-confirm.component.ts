import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Layer } from 'src/app/_models/layer';
import { LayerService } from 'src/app/_services/layer.service';

@Component({
  selector: 'app-layer-confirm',
  templateUrl: './layer-confirm.component.html',
  styleUrls: ['./layer-confirm.component.css']
})
export class LayerConfirmComponent implements OnInit {
  layerId: any;
  layer: Layer;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private layerService: LayerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.layerId = params['id'];
      this.layerService.getLayerById(this.layerId).subscribe(data => {
        this.layer = data;
        console.log(data);
      });
  });
  }

  save(){
    this.layerService.confirmWork(this.layer).subscribe(data => {this.redirect('/')}, error => {});
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }
  getDate(date) {
    let format = "dd.MM.yyyy";
    let locale = "en-US";
    return formatDate(date, format, locale);
  }
  getTime(time: string) {
    return time.split("T")[1].substr(0, 5);
  }
}
