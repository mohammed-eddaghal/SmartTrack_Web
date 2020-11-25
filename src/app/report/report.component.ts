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
    console.log('filter value is ', form.value['filter']);
    if (form.value['filter'] === 0) {
      this.cvref.clear();
      const componentRef: ComponentRef<SummaryReportComponent> =
        this.cvref.createComponent(this.resolver.resolveComponentFactory(SummaryReportComponent));
      componentRef.instance.deviceID = form.value['deviceID'];
      componentRef.instance.startTime = new Date(form.value['date_begin']).getTime() / 1000;
      componentRef.instance.endTime = new Date(form.value['date_end']).getTime() / 1000;
      console.log('data sent is: ', componentRef.instance.deviceID, componentRef.instance.startTime, componentRef.instance.endTime);
    }
  }
  loadSpeedReport() {
    this.cvref.clear();
    const componentRef: ComponentRef<SpeedReportComponent> = this.cvref.createComponent(this.resolver.resolveComponentFactory(SpeedReportComponent));
    componentRef.instance.data = "this is a data passed dynamically";
    console.log('speed report');
  }
}
