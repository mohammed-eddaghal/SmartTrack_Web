import { Component, Inject, NgZone, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AdminService } from '../services/admin.service';

import { map } from 'rxjs/operators';
import { EventData } from '../models/eventdata.model';
import { DashboardDistance } from '../models/dahboard.distance.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AuthService } from '../services/auth.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  private chart: am4charts.XYChart;
  devices: any = [];
  geocoder: any;
  totalDuration: number;
  totalDistance: number;
  averageDistance: number;
  dashboardDistance: DashboardDistance[];
  dateErrorHidden: boolean = true;
  dateForm;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
    private adminService: AdminService,
    public authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.chart = am4core.create("odometerChart", am4charts.XYChart);

    this.adminService.getDevices(this.authService.User.accountID, this.authService.User.search, this.authService.groupID).pipe(
      map((data: any) => {
        return data['content'].map(ed => new EventData().deserialize(ed));
      },
      )
    ).subscribe(
      response => {
        this.devices = response;
      },
      error => {
      }
    );

    this.startDate = new Date();
    this.endDate = new Date();

    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(23, 59, 59, 999);

    this.getDashboardDistanceStats(Math.floor(this.startDate.getTime() / 1000), Math.floor(this.endDate.getTime() / 1000));

    this.dateForm = this.formBuilder.group(
      {
        startDate: [formatDate(this.startDate, 'yyyy-MM-ddTHH:mm', 'en')],
        endDate: [formatDate(this.endDate, 'yyyy-MM-ddTHH:mm', 'en')]
      }
    );

    //for address just wait
    /*for (var i = 0; i < this.devices.length; i++) {
      this.devices[i].address = "testing some addresses here";
      console.log('address', this.devices[i].address);
      // this.mapsApiLoader.load().then(() => {
      //   this.geocoder = new google.maps.Geocoder();
      //   let latlng = { lat: this.devices[i]['latitude'], lng: this.devices[i]['longitude'] };
      //   this.geocoder?.geocode({ 'location': latlng }, (results, status) => {
      //     this.devices[i].address = "testing some addresses here";
      //     console.log('address', this.devices[i].address);
      //   });
      // });
    }*/
  }
  onSubmit() {
    const formValue = this.dateForm.value;
    this.startDate = new Date(formValue['startDate']);
    this.endDate = new Date(formValue['endDate']);

    let startTimestamp = new Date(this.startDate).getTime() / 1000;
    let endTimestamp = new Date(this.endDate).getTime() / 1000;
    if (endTimestamp <= startTimestamp) {
      this.dateErrorHidden = false;
    } else {
      if (!this.dateErrorHidden) this.dateErrorHidden = true;
      this.getDashboardDistanceStats(startTimestamp, endTimestamp);
    }

  }

  getDashboardDistanceStats(startDate, endDate) {
    this.adminService.getDashboardDistanceStats(this.authService.User.accountID, startDate, endDate, this.authService.groupID).pipe(
      map((data: DashboardDistance[]) => data.map(dd => new DashboardDistance().deserialize(dd)))
    ).subscribe(
      response => {
        this.dashboardDistance = response;
        this.chart.data = response;
        if(response.length != 0) {
          this.totalDuration = response.map(rt => rt.running_time).reduce(function (x, y) {
            return x + y;
          });
          this.totalDistance = response.map(d => d.distance).reduce(function (x, y) {
            return x + y;
          });
        } else {
          //Normally we must display an info alert with message : pas de données pour le moment
          this.totalDuration = 0;
          this.totalDistance = 0;
        }
        this.averageDistance = this.totalDistance / (this.totalDuration / 60);

      },
      error => {
      }
    );
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
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      // Create axes

      var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "vehicleModel";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      //despite this var never used in the code it's necessay for the chart
      var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = this.chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "distance";
      series.dataFields.categoryX = "vehicleModel";
      series.name = "distance";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";

      //tooltip bg color
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color("#FFFFFF");

      //tooltip text color
      series.tooltip.autoTextColor = false;
      series.tooltip.label.fill = am4core.color("#000000");

      series.columns.template.fillOpacity = .8;
      //column fill color
      series.columns.template.fill = am4core.color("#fd6a02");
      //change border color for all slices
      series.columns.template.stroke = am4core.color("#fd6a02");

      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1
      //disable logo appearance
      this.chart.logo.__disabled = true;

      //you can use these two lines below to reduce width of columns
      // categoryAxis.renderer.cellStartLocation = 0.3;
      // categoryAxis.renderer.cellEndLocation = 0.6;

      // this.chart = chart;
    });
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
