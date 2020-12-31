import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Device } from '../models/device.model';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices: Device[];
  nextPage: boolean;

  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllDevices(this.authService.user.accountID, 0)
      .pipe(
        map((data: any) => {
          this.nextPage = data['last'];
          return data['content'].map(device => new Device().deserialize(device));
        },
        )
      )
      .subscribe(
        result => {
          // console.log(result);
          this.devices = result;
          console.log(this.devices);
          console.log(this.nextPage);
        },
        error => null
      );
  }

}
