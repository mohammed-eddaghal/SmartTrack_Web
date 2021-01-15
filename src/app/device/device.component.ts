import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Device } from '../models/device.model';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { Pager } from '../utilities/pager';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices: Device[];
  device: Device;
  adding: boolean;
  last: boolean;
  sortBy: string = "creationTime";
  asc: boolean = true;
  query: string = '';
  page: number = 0;
  // pager object
  pager: Pager = {
    pageCount: 0,
    currentPage: 0,
    size: 10,
    pages: []
  };

  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.adminService.getAllDevices(this.authService.user.accountID, this.query, this.page, this.asc, this.sortBy, this.pager.size, this.authService.groupID)
      .pipe(
        map((data: any) => {
          this.last = data['last'];
          this.pager.pageCount = data['totalPages'];
          this.pager.currentPage = data['pageable']['pageNumber'];
          this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
          return data['content'].map(device => new Device().deserialize(device));
        },
        )
      )
      .subscribe(
        result => {
          this.devices = result;
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

  setPage(page: number) {
    this.page = page;
    this.adminService.getAllDevices(this.authService.user.accountID, this.query, this.page, this.asc, this.sortBy, this.pager.size, this.authService.groupID)
      .pipe(
        map((data: any) => {
          this.last = data['last'];
          this.pager.pageCount = data['totalPages'];
          this.pager.currentPage = data['pageable']['pageNumber'];
          this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
          return data['content'].map(device => new Device().deserialize(device));
        },
        )
      )
      .subscribe(
        result => {
          this.devices = result;
          this.spinner.hide();
        },
        error => null
      );
  }

  onSearsh(query: string) {
    this.query = query;
    this.adminService.getAllDevices(this.authService.user.accountID, this.query, this.page, this.asc, this.sortBy, this.pager.size, this.authService.groupID)
      .pipe(
        map((data: any) => {
          this.last = data['last'];
          this.pager.pageCount = data['totalPages'];
          this.pager.currentPage = data['pageable']['pageNumber'];
          this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
          return data['content'].map(device => new Device().deserialize(device));
        },
        )
      )
      .subscribe(
        result => {
          this.devices = result;
          this.spinner.hide();
        },
        error => null
      );
  }

  open(content, device?: any) {
    if (device == null) {
      this.device = new Device();
      this.adding = true;
    }
    else {
      this.device = new Device().deserialize(device);
      this.adding = false;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      // console.log(this.closeResult + " 1")

      if (device == null) {
        this.device.deviceID = this.device.imeiNumber;
        this.device.accountID = this.authService.user.accountID;
        this.device.uniqueID = this.device.imeiNumber;
        this.device.licenseExpire = new Date(this.device.licenseExpire).getTime() / 1000;
        this.device.creationTime = new Date(Date.now()).getTime() / 1000;
        this.adminService.addDevice(this.device, 'g1').subscribe(
          result => {
            console.log(result);
            this.updatePage();
          },
          error => {
            console.log(error);
          }
        );
      }
      else {
        if (device?.licenseExpire != this.device.licenseExpire) {
          this.device.licenseExpire = new Date(this.device.licenseExpire).getTime() / 1000;
        }
        this.adminService.updateDevice(this.device).subscribe(
          result => {
            console.log(result);
            this.updatePage();
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

  delete(deviceID, accountID) {
    var deviceID;

    deviceID = {
      deviceID: deviceID,
      accountID: accountID
    };

    this.adminService.deleteDevice(deviceID, this.authService.groupID).subscribe(
      result => {
        console.log(result);
        this.updatePage();
      },
      error => {
        console.log(error);
      }
    );
  }

  updatePage() {
    this.adminService.getAllDevices(this.authService.user.accountID, this.query, this.page, this.asc, this.sortBy, this.pager.size, this.authService.groupID)
      .pipe(
        map((data: any) => {
          this.last = data['last'];
          this.pager.pageCount = data['totalPages'];
          this.pager.currentPage = data['pageable']['pageNumber'];
          this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
          return data['content'].map(device => new Device().deserialize(device));
        },
        )
      )
      .subscribe(
        result => {
          this.devices = result;
          this.spinner.hide();
        },
        error => null
      );
  }
}
