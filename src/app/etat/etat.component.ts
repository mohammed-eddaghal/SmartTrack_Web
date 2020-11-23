import { Etat } from './../models/etat';
import { AdminService } from './../services/admin.service';
import { SubUserService } from './../services/subuser.service';
import { AuthService } from './../services/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { PagerService } from '../services/pager.service';

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent implements OnInit {
  x: any;

  carLogo: String = '../assets/vehicle/car.png';
  signalLogo: String = '../assets/signal/signal-12.png';
  etatLogo: String;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  etats: Etat[];
  shershEtat:Etat[];

  constructor(public authService: AuthService,
    private subUserService: SubUserService,
    private adminService: AdminService,
    //private ngZone: NgZone,
    private pagerService: PagerService) { }

  ngOnInit(): void {
    var test = { "accountID": "admin", "userID": "", "search": "" };
    test=this.authService.user;
    if (!this.authService.isAdmin) {
     // test=this.authService.user;
      //this.subUserService.etatUser(test).subscribe(
      this.subUserService.etatUser(this.authService.user).subscribe(
        (response: Etat[]) => {
          //normalement x ghtafficta liha return d api
          this.shershEtat=this.etats = response
          if (this.etats.length == 0) {
            // alert("n'y a pas des etats pour vous");
          } else {
            for (const iterator of this.etats) {
              console.log(iterator);
              console.log("////////////")
            }
          }
          this.setPage(1);
        }, error => {
          // alert("mochkil f etat parti subuser")
        })
    } else {
      //this.adminService.etatAdmin(test).subscribe(
      this.adminService.etatAdmin(this.authService.user).subscribe(
        (response: Etat[]) => {
          //normalement x ghtafficta liha return d api
          this.shershEtat=this.etats = response
          if (this.etats.length == 0) {
            // alert("n'y a pas des etats pour vous");
          } else {
            for (const iterator of this.etats) {
              console.log(iterator);
              console.log("////////////")
              console.log(typeof iterator.activity_time)
              console.log(typeof (iterator.activity_time) === 'string')
            }
          }
          this.setPage(1);
        }, error => {
          // alert("mochkil f etat parti admin")
        })
    }



  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.shershEtat.length, page, 5);

    // get current page of items
    this.pagedItems = this.shershEtat.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onSearsh(query){
    this.shershEtat=(query)?this.etats.filter(
      car=>car.vehicleModel.toLowerCase().includes(query)):this.etats;
      this.setPage(1);
    console.log(this.shershEtat);
  }



  checkType(value: any,heading:number,speed:number): number {
    if (typeof (value) === 'string') {
      if (value === '+24h') {
        this.etatLogo="../assets/status/r_marker_blue.png"
        return 1;
      } else {
        this.etatLogo="../assets/status/marker_blue_parking.png"
        return 0;
      }
    }
    if(speed<3)
      this.etatLogo="../assets/status/stop_small.png";
    else if(speed<60){
      if(heading==0)
        this.etatLogo="../assets/status/marker_green.png";
      else if(heading<90)
        this.etatLogo="../assets/status/marker_green_ne.png";
      else if(heading==90)
        this.etatLogo="../assets/status/marker_green_e.png";
      else if(heading<180)
        this.etatLogo="../assets/status/marker_green_se.png";
      else if(heading==180)
        this.etatLogo="../assets/status/marker_green_s.png";
      else if(heading<270)
        this.etatLogo="../assets/status/marker_green_sw.png";
      else if(heading==270)
        this.etatLogo="../assets/status/marker_green_w.png";
      else if(heading<360)
        this.etatLogo="../assets/status/marker_green_nw.png";
      else
        this.etatLogo="../assets/status/marker_green_n.png";
    }else if(speed<100){
      if(heading==0)
        this.etatLogo="../assets/status/marker_grey.png";
      else if(heading<90)
        this.etatLogo="../assets/status/marker_grey_ne.png";
      else if(heading==90)
        this.etatLogo="../assets/status/marker_grey_e.png";
      else if(heading<180)
        this.etatLogo="../assets/status/marker_grey_se.png";
      else if(heading==180)
        this.etatLogo="../assets/status/marker_grey_s.png";
      else if(heading<270)
        this.etatLogo="../assets/status/marker_grey_sw.png";
      else if(heading==270)
        this.etatLogo="../assets/status/marker_grey_w.png";
      else if(heading<360)
        this.etatLogo="../assets/status/marker_grey_nw.png";
      else
        this.etatLogo="../assets/status/marker_grey_n.png";
    }else{
      if(heading==0)
        this.etatLogo="../assets/status/marker_yellow.png";
      else if(heading<90)
        this.etatLogo="../assets/status/marker_yellow_ne.png";
      else if(heading==90)
        this.etatLogo="../assets/status/marker_yellow_e.png";
      else if(heading<180)
        this.etatLogo="../assets/status/marker_yellow_se.png";
      else if(heading==180)
        this.etatLogo="../assets/status/marker_yellow_s.png";
      else if(heading<270)
        this.etatLogo="../assets/status/marker_yellow_sw.png";
      else if(heading==270)
        this.etatLogo="../assets/status/marker_yellow_w.png";
      else if(heading<360)
        this.etatLogo="../assets/status/marker_yellow_nw.png";
      else
        this.etatLogo="../assets/status/marker_yellow_n.png";
    }
    return -1;
  }


}
