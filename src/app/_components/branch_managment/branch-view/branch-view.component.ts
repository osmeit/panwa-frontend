import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Globals } from "src/app/globals";
import { Layer } from "src/app/_models/layer";
import { User } from "src/app/_models/User";
import { LayerService } from "src/app/_services/layer.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-branch-view",
  templateUrl: "./branch-view.component.html",
  styleUrls: ["./branch-view.component.css"],
})
export class BranchViewComponent implements OnInit {
  activeWeek: Number = 0;
  currentOffset: number = 0;
  layers: Layer[];
  usedLayer: Layer;
  branchId: Number;
  leftactive: boolean = true;
  rightactive: boolean = true;
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  userinfo: User;
  closeResult = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private layerService: LayerService,
    private modalService: NgbModal
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUser.subscribe((user) => {
      this.userinfo = user;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.branchId = params["id"];
    });
    this.updateCalenderWeek(0);
  }

  updateCalenderWeek(offsetChange) {
    let usingOffset = this.currentOffset + offsetChange;
    this.layerService.getWeekOfYear(usingOffset).subscribe((x) => {
      this.layerService
        .getLayersForBrnachWithOffset(this.branchId, usingOffset)
        .subscribe((data) => {
          console.log(data);
          if (data.length > 0) {
            this.activeWeek = x;
            this.layers = data;
            this.currentOffset += offsetChange;
            this.rightactive = this.leftactive = true;
          } else if (offsetChange > 0) {
            this.rightactive = false;
          } else if (offsetChange < 0) {
            this.leftactive = false;
          }
        });
    });
  }

  open(content, l: Layer) {
    this.usedLayer = l;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(result);
          if (result === "Save click") {
            this.layerService
              .setLayerToUserByUserId(l, this.userinfo.id)
              .subscribe((data) => {
                l.user = data;
              });
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
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
