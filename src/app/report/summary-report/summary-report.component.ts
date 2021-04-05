import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { AllSummaryReport } from 'src/app/models/summary.report.all.model';
import { AuthService } from 'src/app/services/auth.service';
import { Pager } from 'src/app/utilities/pager';

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
  
  // pager object
  pager: Pager = {
    pageCount: 0,
    currentPage: 0,
    size: 10,
    pages: []
  };

  constructor(private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();
  }

  setPage(page) {
    this.pager.currentPage = page;
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
      this.deviceID, this.startTime, this.endTime, web, this.pager.currentPage)
      .subscribe(
        response => {
          this.data = response['content'];
          this.pager.pageCount = response['totalPages'];
          this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
          console.log(this.data);
        },
        error => {
        }
      );
  }

}
