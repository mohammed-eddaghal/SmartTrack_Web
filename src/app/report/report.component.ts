import { formatDate } from '@angular/common';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { SpeedReportComponent } from './speed-report/speed-report.component';
import { SummaryReportComponent } from './summary-report/summary-report.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dateErrorHidden: boolean = true;

  defaultVehicle = 0;

  defaultFilter = 0;

  vehicles: Vehicle[] = [];

  oldestFormValue: number;

  componentRef: ComponentRef<any>;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private cvref: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.adminService.getVehicles(this.authService.user.accountID, this.authService.user.userID, this.authService.user.search).pipe(
      map((data: Vehicle[]) => data.map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.vehicles = response;
      },
      error => {
      }
    );
  }

  onSubmit(form: NgForm) {
    if (this?.oldestFormValue == form.value.filter) {
      this.componentRef.instance.deviceID = form.value['deviceID'];
      this.componentRef.instance.startTime = new Date(form.value['date_begin']).getTime() / 1000;
      this.componentRef.instance.endTime = new Date(form.value['date_end']).getTime() / 1000;
      this.componentRef.instance.loadData();
    } else {
      if (form.value.filter == 0) {
        this.cvref.clear();
        this.componentRef = this.cvref.createComponent(this.resolver.resolveComponentFactory(SummaryReportComponent));
        this.componentRef.instance.deviceID = form.value['deviceID'];
        this.componentRef.instance.startTime = new Date(form.value['date_begin']).getTime() / 1000;
        this.componentRef.instance.endTime = new Date(form.value['date_end']).getTime() / 1000;
      } else if (form.value.filter == 4) {
        this.cvref.clear();
        this.componentRef = this.cvref.createComponent(this.resolver.resolveComponentFactory(SpeedReportComponent));
        this.componentRef.instance.deviceID = form.value['deviceID'];
        this.componentRef.instance.startTime = new Date(form.value['date_begin']).getTime() / 1000;
        this.componentRef.instance.endTime = new Date(form.value['date_end']).getTime() / 1000;
      }
      this.oldestFormValue = form.value.filter;
    }
  }
}
