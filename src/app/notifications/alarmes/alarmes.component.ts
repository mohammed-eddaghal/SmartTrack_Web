import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { TimelineLite, Expo, Back, Power1 } from 'gsap'
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { map } from 'rxjs/operators';
import { Vehicle } from 'src/app/models/vehicle.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Alarm } from '../../models/alarm.model';

@Component({
  selector: 'app-alarmes',
  templateUrl: './alarmes.component.html',
  styleUrls: ['./alarmes.component.css']
})
export class AlarmesComponent implements OnInit {

  vehicles: Vehicle[];
  alarm: Alarm;
  tlOld: TimelineLite;
  oldestDeviceIDSelected: string = "";

  constructor(private adminService: AdminService, private authService: AuthService) { }

  ngOnInit(): void {
    this.adminService.getAllDevicesShortDetail(this.authService.user.accountID, 0, this.authService.groupID).pipe(
      map((data: any) => data['content'].map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.vehicles = response;
      },
      error => {
      }
    );
  }

  // ngAfterViewChecked() {
  //   const tl: TimelineLite = new TimelineLite({ defaults: { duration: 1 } });
  //       tl.set('.alarm-config', {
  //         autoAlpha: 0,
  //         height: 0
  //       });
  // }

  getAlarmConfig(deviceID: string) {
    if (this.oldestDeviceIDSelected == "" || this.oldestDeviceIDSelected != deviceID) {
      this.oldestDeviceIDSelected = deviceID;
      if(!this.tlOld?.reversed()) {
        this.tlOld?.reverse();
      }
      this.adminService.getAlarmConfig(this.authService.user.accountID, deviceID, this.authService.user.userID).pipe(
        map((alarm: any) => new Alarm().deserialize(alarm))
      ).subscribe(
        response => {
          this.alarm = response;
          console.log(this.alarm);
        },
        error => {
        }
      );
      const tl: TimelineLite = new TimelineLite({ defaults: { duration: .5 } });
      const elementID = document.getElementById(deviceID);
      tl.to(elementID, {
        autoAlpha: 1,
        height: 140,
        ease: Expo.easeInOut
      });
      this.tlOld = tl;
    } else {
      this.tlOld?.reversed(!this.tlOld.reversed());
    }
  }

  animateAlarmConfig() {
    // const tl: TimelineLite = new TimelineLite({ defaults: { duration: 1 } });
    // // const rule = CSSRulePlugin.getRule(".alarm-config::after"); //get the rule
    // tl.to(".alarm-config", { opacity: 1, ease: Expo.easeInOut });
    // tl.from(".alarm-config", { opacity: 0, ease: Expo.easeInOut });
    // if (tl.reversed(false)) {
    //   // tl.reversed(false);
    //   tl.play();
    //   tl.reversed(true);
    // } else {
    //   tl.reverse();
    //   tl.reversed(false);
    // }

    //these two lines below for testing purposes
    //t.reversed(!t.reversed()); // swaps the reversed state
    //t.resume(); // starts playback, honouring reversed if it's true
  }
}
