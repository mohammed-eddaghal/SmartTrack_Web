import { formatDate } from '@angular/common';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { SpeedPercentReportComponent } from './speed-percent-report/speed-percent-report.component';
import { SpeedReportComponent } from './speed-report/speed-report.component';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { TemperatureReportComponent } from './temperature-report/temperature-report.component';
import { saveAs } from 'file-saver';
import { HttpResponse } from '@angular/common/http';

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

  canExport = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private cvref: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.adminService.getVehicles(this.authService.User.accountID, this.authService.groupID, this.authService.User.search).pipe(
      map((data: Vehicle[]) => data.map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.vehicles = response;
      },
      error => {
      }
    );
  }

  exportAsCSV(form: NgForm) {
    if (form.value.filter == 0) {
      this.adminService.exportSummaryReport(this.authService.User.accountID, this.authService.User.userID, form.value['deviceID'],
        new Date(form.value['date_begin']).getTime() / 1000, new Date(form.value['date_end']).getTime() / 1000, 'true')
        .subscribe(data => {
          let fileName = "SummaryReport___";
          fileName += this.authService.User.accountID + "___";
          fileName += this.authService.User.userID ?? '' + "___";
          fileName += new Date(form.value['date_begin']).toUTCString() + "___";
          fileName += new Date(form.value['date_end']).toUTCString() + "___";
          fileName += '.csv';
          const blob1 = new Blob([<BlobPart>data], { type: 'text/csv' });
          console.log(blob1);
          saveAs(blob1, fileName);
        }) ;
    }
  }

  onSubmit(form: NgForm) {
    this.canExport = true;
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
      } else if (form.value.filter == 3) {
        this.cvref.clear();
        this.componentRef = this.cvref.createComponent(this.resolver.resolveComponentFactory(TemperatureReportComponent));
        this.componentRef.instance.deviceID = form.value['deviceID'];
        this.componentRef.instance.startTime = new Date(form.value['date_begin']).getTime() / 1000;
        this.componentRef.instance.endTime = new Date(form.value['date_end']).getTime() / 1000;
      } else if (form.value.filter == 4) {
        this.cvref.clear();
        this.componentRef = this.cvref.createComponent(this.resolver.resolveComponentFactory(SpeedReportComponent));
        this.componentRef.instance.deviceID = form.value['deviceID'];
        this.componentRef.instance.startTime = new Date(form.value['date_begin']).getTime() / 1000;
        this.componentRef.instance.endTime = new Date(form.value['date_end']).getTime() / 1000;
      } else if (form.value.filter == 5) {
        this.cvref.clear();
        this.componentRef = this.cvref.createComponent(this.resolver.resolveComponentFactory(SpeedPercentReportComponent));
        this.componentRef.instance.deviceID = form.value['deviceID'];
        this.componentRef.instance.startTime = new Date(form.value['date_begin']).getTime() / 1000;
        this.componentRef.instance.endTime = new Date(form.value['date_end']).getTime() / 1000;
      }
      this.oldestFormValue = form.value.filter;
    }
  }
}
