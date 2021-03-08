import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { AllSummaryReport } from 'src/app/models/summary.report.all.model';
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

  data: AllSummaryReport[];

  constructor(private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    var web: string = 'false';
    
    if(this.deviceID == '0') {
      web = 'true';
    } else {
      web = 'false';
    }

    this.adminService.getSummaryReport(this.authService.User.accountID, this.authService.User.userID,
      this.deviceID, this.startTime, this.endTime, web)
      .pipe(
        map((data: AllSummaryReport[]) => data.map(report => new AllSummaryReport().deserialize(report)))
      ).subscribe(
        response => {
          this.data = response;
          console.log(this.data);
        },
        error => {
        }
      );
  }

}
