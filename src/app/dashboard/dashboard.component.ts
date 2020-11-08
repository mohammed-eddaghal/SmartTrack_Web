import { Component, Inject, NgZone, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  startDate: Date;
  endDate: Date;
  private chart: am4charts.XYChart;

  printDate() {
    console.log('start date is: ', new Date(this.startDate).getTime() / 1000);
    console.log('end date is: ', new Date(this.endDate).getTime() / 1000);
  }

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

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
      chart.data = [
        {
          "device": "Isuzu 75711-D-1",
          "visits": 0.00
        },
        {
          "device": "Isuzu 76277-H-1",
          "visits": 73.56
        },
        {
          "device": "Isuzu 76280-H-1",
          "visits": 124.14
        },
        {
          "device": "ISUZU 95156-H-1",
          "visits": 0.00
        },
        {
          "device": "Isuzu 95156-H-1",
          "visits": 0.00
        },
        {
          "device": "Isuzu 95157-H-1",
          "visits": 31.89
        },

      ];

      // Create axes

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "device";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "visits";
      series.dataFields.categoryX = "device";
      series.name = "Visits";
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

  ngOnInit() { }

}
