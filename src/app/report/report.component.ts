import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dateErrorHidden: boolean = true;

  defaultVehicle = 0;

  defaultFilter = 1;

  vehicles: Vehicle[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService
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
    console.log(form.value);
  }

}
