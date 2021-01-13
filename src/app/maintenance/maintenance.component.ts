import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Maintenance } from '../models/maintenance.model';
import { Vehicle } from '../models/vehicle.model';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  maintenances: Maintenance[];
  vehicles: Vehicle[];
  maintenance: Maintenance;
  adding: boolean;
  last: boolean;
  sortBy: string = "timestampStart";
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
    this.adminService.getAllMaintenances(this.authService.user.accountID, this.query, this.page, this.asc, this.sortBy, this.pager.size).pipe(
      map((data: any) => {
        this.last = data['last'];
        this.pager.pageCount = data['totalPages'];
        this.pager.currentPage = data['pageable']['pageNumber'];
        this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
        return data['content'].map(maintenance => new Maintenance().deserialize(maintenance));
      },
      )
    ).subscribe(
      result => {
        this.maintenances = result;
      },
      error => null
    );
    this.adminService.getAllDevicesShortDetail(this.authService.user.accountID, 0, this.authService.groupID).pipe(
      map((data: any) => data['content'].map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.spinner.hide();
        this.vehicles = response;
      },
      error => {
      }
    );
  }

  getPourcentageDays(timestampStart, timestampEnd) {
    var p = (timestampEnd - Math.floor(new Date().getTime() / 1000)) / (timestampEnd - timestampStart) * 100;
    return p < 0 ? 0 : p;
  }

  getRemainingDays(timestampEnd) {
    var p = (timestampEnd - Math.floor(new Date().getTime() / 1000)) / 86400;
    return p < 0 ? 0 : p;
  }

  getProgressClass(timestampStart, timestampEnd) {
    var p = this.getPourcentageDays(timestampStart, timestampEnd);
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

  sort(sortBy: string) {
    this.sortBy = sortBy;
    this.asc = !this.asc;
    this.adminService.getAllMaintenances(this.authService.user.accountID, this.query, this.page, this.asc, this.sortBy, this.pager.size).pipe(
      map((data: any) => {
        this.last = data['last'];
        this.pager.pageCount = data['totalPages'];
        this.pager.currentPage = data['pageable']['pageNumber'];
        this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
        return data['content'].map(maintenance => new Maintenance().deserialize(maintenance));
      },
      )
    ).subscribe(
      result => {
        this.maintenances = result;
      },
      error => null
    );
  }

  setPage(page: number) {
    this.page = page;
    this.adminService.getAllMaintenances(this.authService.user.accountID, this.query, this.page, this.asc, this.sortBy, this.pager.size).pipe(
      map((data: any) => {
        this.last = data['last'];
        this.pager.pageCount = data['totalPages'];
        this.pager.currentPage = data['pageable']['pageNumber'];
        this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
        return data['content'].map(maintenance => new Maintenance().deserialize(maintenance));
      },
      )
    ).subscribe(
      result => {
        this.maintenances = result;
      },
      error => null
    );
  }

  onSearsh(query: string) {
    this.query = query;
    this.adminService.getAllMaintenances(this.authService.user.accountID, this.query, this.page, this.asc, this.sortBy, this.pager.size).pipe(
      map((data: any) => {
        this.last = data['last'];
        this.pager.pageCount = data['totalPages'];
        this.pager.currentPage = data['pageable']['pageNumber'];
        this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
        return data['content'].map(maintenance => new Maintenance().deserialize(maintenance));
      },
      )
    ).subscribe(
      result => {
        this.maintenances = result;
      },
      error => null
    );
  }

  open(content, type: string, maintenance?: Maintenance) {
    if (maintenance == null) {
      this.maintenance = new Maintenance();
      this.maintenance.maintenance_Type = type;
      this.adding = true;
    }
    else {
      this.maintenance = new Maintenance().deserialize(maintenance);
      this.adding = false;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      // console.log(this.closeResult + " 1")
      if (maintenance?.timestampStart != this.maintenance.timestampStart) {
        this.maintenance.timestampStart = new Date(this.maintenance.timestampStart).getTime() / 1000;
      }
      if (maintenance?.timestampEnd != this.maintenance?.timestampEnd) {
        this.maintenance.timestampEnd = new Date(this.maintenance?.timestampEnd).getTime() / 1000;
      }
      if (this.adding) {
        this.adminService.addMaintenance(this.maintenance).subscribe(
          result => {
            console.log(result);
          },
          error => {
            console.log(error);
          }
        );
      }
      else {
        console.log('maintenance deviceID is: ' + this.maintenance);
        this.adminService.updateMaintenance(this.maintenance).subscribe(
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
}

export interface Pager {
  pageCount: number;
  currentPage: number;
  size: number;
  pages: number[];
}