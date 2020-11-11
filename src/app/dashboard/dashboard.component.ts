import { Component, Inject, NgZone, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AdminService } from '../services/admin.service';

//gmaps imports
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';

import { map } from 'rxjs/operators';
import { Device } from '../models/device.model';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
    private adminService: AdminService,
    private mapsApiLoader: MapsAPILoader) { }

  ngOnInit() {
    this.adminService.getDevices("demo", "").pipe(
      map((data: Device[]) => data.map(device => new Device().deserialize(device)))
    ).subscribe(
      response => {
        console.log('good', response);
        this.devices = response;
      },
      error => {
        console.log('bad', error);
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

  printDate() {
    console.log('start date is: ', new Date(this.startDate).getTime() / 1000);
    console.log('end date is: ', new Date(this.endDate).getTime() / 1000);
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

      let chart = am4core.create("odometerChart", am4charts.XYChart);

      this.adminService.getDashboardDistanceStats("demo", 1432734421, 1601751334).subscribe(
        response => {
          chart.data = <any[]>response;
        },
        error => {
          console.log('bad', error);
        }
      );

      // Create axes

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "vehicleModel";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
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
      chart.logo.__disabled = true;

      //you can use these two lines below to reduce width of columns
      // categoryAxis.renderer.cellStartLocation = 0.3;
      // categoryAxis.renderer.cellEndLocation = 0.6;

      this.chart = chart;
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
