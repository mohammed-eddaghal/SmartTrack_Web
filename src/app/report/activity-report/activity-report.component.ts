import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    if (this.deviceID == '0') {
      Swal.fire('Oops...', "veuillez choisir un véhicule", 'error');
    }
  }

}
