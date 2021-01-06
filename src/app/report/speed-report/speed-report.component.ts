import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { SpeedReport } from 'src/app/models/speed.report.model';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Icon, Map, Marker } from 'leaflet';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { load } from '@amcharts/amcharts4/.internal/core/utils/Net';

@Component({
  selector: 'app-speed-report',
  templateUrl: './speed-report.component.html',
  styleUrls: ['./speed-report.component.css']
})
export class SpeedReportComponent implements OnInit {

  @Input() deviceID: string;
  @Input() startTime: number;
  @Input() endTime: number;
  private chart: any;
  private data: SpeedReport[];
  private map: Map;
  private zoom: number;

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
      this.chart = am4core.create("speedChart", am4charts.XYChart);
      this.adminService.getSpeedReport(this.authService.user.accountID, this.authService.user.userID,
        this.startTime, this.endTime, this.deviceID)
        .pipe(
          map((data: SpeedReport[]) => data.map(report => new SpeedReport().deserialize(report)))
        ).subscribe(
          response => {
            this.data = response;
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
        series.dataFields.valueY = "speedKPH";
        series.dataFields.categoryX = "timestamp";
        series.name = "speedKPH";

        this.chart.scrollbarX = new am4core.Scrollbar();

        // Add simple bullet
        var circleBullet = series.bullets.push(new am4charts.CircleBullet());
        circleBullet.circle.radius = 4;
        circleBullet.circle.cursorOverStyle = am4core.MouseCursorStyle.pointer; //on hover change cursor style
        circleBullet.circle.showTooltipOn = true; //did nothing until now
        circleBullet.circle.fill = am4core.color("orange");
        circleBullet.circle.stroke = am4core.color("orange");
        circleBullet.tooltipText = "{timestamp}\n{speedKPH} Km/h";
        var marker: Marker;
        var map = this.map;
        circleBullet.events.on("over", function (ev) {
          marker?.remove();
          marker = new Marker([ev.target.dataItem.dataContext.latitude, ev.target.dataItem.dataContext.longitude], {
            icon: new Icon({
              iconUrl: ev.target.dataItem.dataContext.icon(),
              iconSize: [26, 30],
              iconAnchor: [14, 4],
            })
          });
          marker.addTo(map);
          map.setView([ev.target.dataItem.dataContext.latitude, ev.target.dataItem.dataContext.longitude], 12);
        });
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

  receiveMap(map: Map) {
    this.map = map;
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

}
