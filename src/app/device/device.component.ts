import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
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
  device: Device;
  nextPage: boolean;
  adding: boolean;

  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.adminService.getAllDevices(this.authService.user.accountID, 0, this.authService.groupID)
      .pipe(
        map((data: any) => {
          console.log('data is ', data);
          // this.nextPage = data['last'];
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
          this.spinner.hide();
        },
        error => null
      );
  }



  getPourcentageDays(device) {
    var p = (device.remainingTime) / (device.licenseExpire - device.creationTime) * 100;
    return p < 0 ? 0 : p;
  }

  getProgressClass(device) {
    var p = this.getPourcentageDays(device);
    switch (true) {
      case p < 25:
        return 'progress-bar progress-bar-striped  bg-danger';
      case p < 75:
        return 'progress-bar progress-bar-striped  bg-warning';
      case p < 100:
        return 'progress-bar progress-bar-striped  bg-success';
      default:
        return 'progress-bar progress-bar-striped bg-info';
    }
  }

  open(content, device?: any) {
    if (device == null) {
      this.device = new Device();
      this.adding = true;
    }
    else {
      this.device = device;
      this.adding = false;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      // console.log(this.closeResult + " 1")

      if (device == null) {
        this.device.deviceID = {
          deviceID: this.device.imeiNumber,
          accountID: this.authService.user.accountID
        };
        this.device.uniqueID = this.device.imeiNumber;
        this.device.licenseExpire = new Date(this.device.licenseExpire).getTime()/1000;
        this.device.creationTime = new Date(Date.now()).getTime() / 1000;
        this.adminService.addDevice(this.device, 'g1').subscribe(
          result => {
            console.log(result);
          },
          error => {
            console.log(error);
          }
        );
      }
      else {
        this.device.licenseExpire = new Date(this.device.licenseExpire).getTime()/1000;
        this.adminService.updateDevice(this.device).subscribe(
          result => {
            console.log(result);
          },
          error => {
            console.log(error);
          }
        );
      }

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // console.log(this.closeResult + " 2");
      // console.log(Date.now())
    });
  }

  delete(deviceID) {
    this.adminService.deleteDevice(deviceID, 'g1').subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }
}
