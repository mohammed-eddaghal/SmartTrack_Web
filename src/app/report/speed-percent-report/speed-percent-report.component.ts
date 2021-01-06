import { isPlatformBrowser } from '@angular/common';
import { Input } from '@angular/core';
import { Inject } from '@angular/core';
import { NgZone } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { SpeedPercentReport } from 'src/app/models/speed.percent.report.model';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-speed-percent-report',
  templateUrl: './speed-percent-report.component.html',
  styleUrls: ['./speed-percent-report.component.css']
})
export class SpeedPercentReportComponent implements OnInit {
  @Input() deviceID: string;
  @Input() startTime: number;
  @Input() endTime: number;
  private chart: any;
  private data: SpeedPercentReport[];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
  }

  loadData() {
    if (this.deviceID == '0') {
      Swal.fire('Oops...', "veuillez choisir un véhicule", 'error');
    } else {
      this.browserOnly(() => {
        if (this.chart) {
          this.chart.dispose();
        }
      });
      this.chart = am4core.create("speedPercentChart", am4charts.PieChart);
      this.adminService.getSpeedPercentReport(this.startTime, this.endTime, this.deviceID)
        .subscribe(
          response => {
            this.data = [];
            for (var i = 0; i < Object.keys(response).length; i++) {
              this.data.push(new SpeedPercentReport(Object.keys(response)[i], response[Object.keys(response)[i]]));
            }
            this.chart.data = this.data;
          },
          error => {
          }
        );
      // Chart code goes in here
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
        // Add and configure Series
        let pieSeries = this.chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "range";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;


        // Let's cut a hole in our Pie chart the size of 40% the radius
        this.chart.innerRadius = am4core.percent(40);

        // Put a thick white border around each Slice
        pieSeries.slices.template.stroke = am4core.color("#4a2abb");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;


        // Add a legend
        this.chart.legend = new am4charts.Legend();

        //disable logo appearance
        this.chart.logo.__disabled = true;
      });
    }
  }


  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.loadData();
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
