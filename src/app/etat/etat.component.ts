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
  constructor(public authService: AuthService,
    private subUserService: SubUserService,
    private adminService: AdminService,
    private ngZone: NgZone,
    private pagerService: PagerService) { }

  ngOnInit(): void {
    var test = { "accountID": "admin", "userID": "", "search": "" };
    if (!this.authService.isAdmin) {
      //this.subUserService.etatUser(test).subscribe(
      this.subUserService.etatUser(this.authService.user).subscribe(
        (response: Etat[]) => {
          //normalement x ghtafficta liha return d api
          this.etats = response
          if (this.etats.length == 0) {
            alert("n'y a pas des etats pour vous");
          } else {
            for (const iterator of this.etats) {
              console.log(iterator);
              console.log("////////////")
            }
          }
          this.setPage(1);
        }, error => {
          alert("mochkil f etat parti subuser")
        })
    } else {
      //this.adminService.etatAdmin(test).subscribe(
      this.adminService.etatAdmin(this.authService.user).subscribe(
        (response: Etat[]) => {
          //normalement x ghtafficta liha return d api
          this.etats = response
          if (this.etats.length == 0) {
            alert("n'y a pas des etats pour vous");
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
          alert("mochkil f etat parti admin")
        })
    }



  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.etats.length, page, 5);

    // get current page of items
    this.pagedItems = this.etats.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  checkType(value: any): number {
    if (typeof (value) === 'string') {
      if (value === '+24h') {
        this.etatLogo="../assets/status/stop_small.png"
        return 1;
      } else {
        this.etatLogo="../assets/status/marker_blue_parking.png"
        return 0;
      }
    }
    this.etatLogo="../assets/status/marker_green_n.png" 
    return -1;
  }

}