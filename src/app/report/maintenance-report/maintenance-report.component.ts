import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-report',
  templateUrl: './maintenance-report.component.html',
  styleUrls: ['./maintenance-report.component.css']
})
export class MaintenanceReportComponent implements OnInit {

  @Input() startTime: number;
  @Input() endTime: number;

  data: [] = [];
  web: string = 'true';


  constructor(private adminService: AdminService, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }



  loadData() {
    this.spinner.show();
    this.adminService.getMaintenanceReport(this.authService.User.accountID, this.authService.User.userID, this.startTime, this.endTime)
      .subscribe(
        (response: []) => {
          console.log(response);
          this.data = response;
          this.spinner.hide();
        },
        error => {
          Swal.fire('Oops...', error, 'error');
        }
      );
  }

}
