import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { TemperatureReport } from 'src/app/models/temperature.report.model';
import { AuthService } from 'src/app/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-temperature-report',
  templateUrl: './temperature-report.component.html',
  styleUrls: ['./temperature-report.component.css']
})
export class TemperatureReportComponent implements OnInit {

  @Input() deviceID: string;
  @Input() startTime: number;
  @Input() endTime: number;
  private chart: any;

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
      this.chart = am4core.create("temperatureChart", am4charts.XYChart);
      this.adminService.getTemperatureReport(this.startTime, this.endTime, this.deviceID)
      .pipe(
          map((data: TemperatureReport[]) => data.map(report => new TemperatureReport().deserialize(report)))
        ).subscribe(
        response => {
          this.chart.data = response;
        },
        error => {
        }
      );
      // Chart code goes in here
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);

        // Create axes

        var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "timestamp";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.disabled = true;

        //despite this var never used in the code it's necessay for the chart
        var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series = this.chart.series.push(new am4charts.LineSeries());
        series.stroke = am4core.color("#f9b74d"); //color of line
        series.dataFields.valueY = "engineTemp";
        series.dataFields.categoryX = "timestamp";
        series.name = "engineTemp";

        this.chart.scrollbarX = new am4core.Scrollbar();

        // Add simple bullet
        var circleBullet = series.bullets.push(new am4charts.CircleBullet());
        circleBullet.circle.radius = 4;
        circleBullet.circle.cursorOverStyle = am4core.MouseCursorStyle.pointer; //on hover change cursor style
        circleBullet.circle.showTooltipOn = true; //did nothing until now
        circleBullet.circle.fill = am4core.color("red");
        circleBullet.circle.stroke = am4core.color("red");
        circleBullet.tooltipText = "{timestamp}\n{engineTemp} °C";
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
