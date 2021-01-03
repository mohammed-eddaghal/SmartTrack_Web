import { Component, OnDestroy, OnInit } from '@angular/core';
/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Icon, Map, Marker } from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { EventData } from 'src/app/models/eventdata.model';
import { map } from "rxjs/operators";
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {

  private chart: any;
  private hand: any;
  private map: Map;
  private zoom: number;
  deviceID: string;
  device: EventData;
  timer: Subscription;
  marker: Marker;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private _decimalPipe: DecimalPipe) { }

  ngOnDestroy(): void {
    this.timer.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.deviceID = params.get('deviceID')
    );
    this.getDeviceEventData();
    this.initChart();
    this.timer = interval(60000).subscribe(() => {
      // console.log('say hello baby');
      this.getDeviceEventData();
    });
  }

  getDeviceEventData() {
    this.adminService.getDevicePosition(this.deviceID).pipe(
      map((device: EventData) => new EventData().deserialize(device))
    ).subscribe(
      (response) => {
        this.device = response;
        this.hand.showValue(this.device.speedKPH);
        this.marker = new Marker([this.device.latitude, this.device.longitude], {
          icon: new Icon({
            //TODO: add in api side activity_time to solo/eventdata
            iconUrl: this.device.icon(),
            // iconUrl: "../../assets/status/marker_green.png",
            iconSize: [26, 30],
            iconAnchor: [14, 4],
          })
        });
        this.marker.bindPopup("<span style='color:#089200;font-weight:bold;'>" + this.device.vehicleModel + "</span>" + '<hr style="height:2px;border-width:0;color:gray;background-color:gray;padding:0;margin:0">'
          + "<span style=''>" + this.device.address + "</span>" + " <br/>"
          + "<span style=''>" + new DatePipe('en-US').transform(new Date(this.device.timestamp * 1000), 'yyyy-MM-dd HH:mm') + "</span>" + " <br/>"
          + "<span style=''>" + this.transformDecimal(this.device.speedKPH) + " Km/h</span>" + " <br/>"
          + "<span style=''> état: " + (this.device.speedKPH > 3 ? 'en marche' : 'en parking') + "</span>" + " <br/>"
          + "<span style=''>" + this.transformDecimal(this.device.odometerKM) + " KM</span>");
        this.marker?.remove();
        this.marker.addTo(this.map);
      },
      (error) => null
    );
  }

  initChart() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // create chart
    this.chart = am4core.create("speedometer", am4charts.GaugeChart);
    this.chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    this.chart.innerRadius = -25;

    let axis = this.chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = 0;
    axis.max = 140;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    // let colorSet = new am4core.ColorSet();

    let range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 60;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = am4core.color("#07B36D");
    range0.axisFill.zIndex = - 1;

    let range1 = axis.axisRanges.create();
    range1.value = 60;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color("#F76300");
    range1.axisFill.zIndex = -1;

    let range2 = axis.axisRanges.create();
    range2.value = 100;
    range2.endValue = 140;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("#C01402");
    range2.axisFill.zIndex = -1;

    this.chart.logo.__disabled = true;

    this.hand = this.chart.hands.push(new am4charts.ClockHand());
    // using chart.setTimeout method as the timeout will be disposed together with a chart
    // setInterval(() => {
    //   this.hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
    // }, 1000);
  }

  receiveMap(map: Map) {
    this.map = map;
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  transformDecimal(num) {
    return this._decimalPipe.transform(num, '1.2-2');
  }
}
