import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivityReport } from 'src/app/models/activity.report.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.css']
})
export class ActivityReportComponent implements OnInit {

  @Input() deviceID: string;
  @Input() startTime: number;
  @Input() endTime: number;

  activities: ActivityReport[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    if (this.deviceID == '0') {
      Swal.fire('Oops...', "veuillez choisir un véhicule", 'error');
    }
    this.loadData();
  }

  loadData() {
    this.adminService.getActivityReport(this.deviceID, this.startTime, this.endTime).subscribe(
      (response: ActivityReport[]) => {
        this.activities = response;
        console.log(response);
      }, error => null,
    );
  }

}
