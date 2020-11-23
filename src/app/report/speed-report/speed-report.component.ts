import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-speed-report',
  templateUrl: './speed-report.component.html',
  styleUrls: ['./speed-report.component.css']
})
export class SpeedReportComponent implements OnInit {

  @Input() data: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
