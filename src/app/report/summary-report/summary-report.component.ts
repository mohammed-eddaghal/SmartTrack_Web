import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.css']
})
export class SummaryReportComponent implements OnInit {

  @Input() deviceID: string;
  @Input() startTime: number;
  @Input() endTime: number;

  data: any;

  constructor(private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {

    var web: string = 'false';
    
    if(this.deviceID == '0') {
      web = 'true';
    } else {
      web = 'false';
    }

    this.adminService.getSummaryReport(this.authService.user.accountID, this.authService.user.userID,
      this.deviceID, this.startTime, this.endTime, web)
      .subscribe(
        response => {
          this.data = response;
          console.log(response);
        },
        error => {
        }
      );
  }

}
