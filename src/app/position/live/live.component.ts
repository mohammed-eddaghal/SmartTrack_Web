import { Component, OnDestroy, OnInit } from '@angular/core';
/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Icon, latLngBounds, Map, Marker, Polyline } from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { EventData } from 'src/app/models/eventdata.model';
import { map } from "rxjs/operators";
import { DatePipe, DecimalPipe, getCurrencySymbol } from '@angular/common';

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
  points: EventData[];
  timer: Subscription;
  marker: Marker;
  showHistoryParams = false;
  day;
  startTime;
  endTime;
  timelines;
  playedDevice = true;
  markers: Marker[] = [];
  indexOfCurrentMarker: number = 0;
  isPlaying: boolean = false;
  canPlay: boolean = false;
  polylinePoints: any[] = [];
  polyline: Polyline;
  polylineDisplayed: boolean = false;

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
        this.marker?.remove();
        this.marker = new Marker([this.device.latitude, this.device.longitude], {
          icon: new Icon({
            //TODO: add in api side activity_time to solo/eventdata
            iconUrl: this.device.icon(),
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
        this.marker.addTo(this.map);
        let latLngs = [this.marker.getLatLng()];
        let markerBounds = latLngBounds(latLngs);
        this.map.fitBounds(markerBounds, {
          animate: true,
          maxZoom: 15
        });
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

  byDay() {
    this.startTime = new Date(this.day + "T00:00:00");
    this.endTime = new Date(this.day + "T23:59:59");
    this.getHistoryTimeLine(~~(this.startTime.getTime() / 1000), ~~(this.endTime.getTime() / 1000));
  }

  byInterval() {
    this.startTime = new Date(this.startTime);
    this.endTime = new Date(this.endTime);
    this.getHistoryTimeLine(~~(this.startTime.getTime() / 1000), ~~(this.endTime.getTime() / 1000))
  }

  getHistoryTimeLine(startTime, endTime) {
    this.adminService.getHistoryTimeLine(this.deviceID, startTime, endTime).subscribe(
      result => {
        this.timelines = result;
      },
      err => null
    );
  }

  getHistory(startTime, endTime) {
    this.canPlay = false;
    this.marker?.remove();
    this.timer.unsubscribe();
    this.isPlaying = false;
    this.adminService.getHistory(this.deviceID, startTime, endTime).pipe(
      map((data: EventData[]) => data.map((point: EventData) => new EventData().deserialize(point)))
    )
      .subscribe(
        (response) => {
          this.points = response;
          this.showHistoryMarkers();
        },
        (error) => null
      );
  }

  showHistoryMarkers() {
    if (this.markers.length != 0) {
      this.markers.forEach(marker => marker.remove());
      this.markers = [];
      this.indexOfCurrentMarker = 0;
    }
    this.points.forEach(point => {
      var marker = new Marker([point.latitude, point.longitude], {
        icon: new Icon({
          iconUrl: point.icon("History"),
          iconSize: [26, 30],
        })
      });
      marker.bindPopup("<span style='color:#089200;font-weight:bold;'>" + point.vehicleModel + "</span>" + '<hr style="height:2px;border-width:0;color:gray;background-color:gray;padding:0;margin:0">'
        + "<span style=''>" + point.address + "</span>" + " <br/>"
        + "<span style=''>" + new DatePipe('en-US').transform(new Date(point.timestamp * 1000), 'yyyy-MM-dd HH:mm') + "</span>" + " <br/>"
        + "<span style=''>" + this.transformDecimal(point.speedKPH) + " Km/h</span>" + " <br/>"
        + "<span style=''> état: " + (point.speedKPH > 3 ? 'en marche' : 'en parking') + "</span>" + " <br/>"
        + "<span style=''>" + this.transformDecimal(point.odometerKM) + " KM</span>");
      this.markers?.push(marker);
      this.polylinePoints.push([point.latitude, point.longitude]);
      marker.addTo(this.map);
    });
    this.canPlay = true;
    this.polyline = new Polyline(this.polylinePoints, {
      color: 'green',
    });
    let latLngs = [this.markers[~~(this.markers.length / 2)].getLatLng()];
    let markerBounds = latLngBounds(latLngs);
    this.map.fitBounds(markerBounds, {
      animate: true,
      maxZoom: 5
    });
  }

  playHistory(startTime, endTime) {
    this.getHistory(startTime, endTime);
  }

  goLive() {
    this.showHistoryParams = false;
    this.canPlay = false;
    this.isPlaying = false;
    if (!this.timer.closed) {
      this.timer.unsubscribe();
    }
    if (this.markers.length != 0) {
      this.markers?.forEach(marker => marker.remove());
    }
    if (this.timelines.length != 0) {
      this.timelines = [];
    }
    this.hand.showValue(0);
    this.getDeviceEventData();
    this.timer = interval(60000).subscribe(() => {
      this.getDeviceEventData();
    });
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      if (this.markers.length != 0) {
        if (this.indexOfCurrentMarker == 0 && this.map.hasLayer(this.markers[0])) {
          this.markers.forEach(marker => marker.remove());
        }
        this.timer = interval(200).subscribe(() => {
          let latLngs = [this.markers[this.indexOfCurrentMarker].getLatLng()];
          let markerBounds = latLngBounds(latLngs);
          this.map.fitBounds(markerBounds, {
            animate: true,
            maxZoom: 15
          });
          this.hand.showValue(this.points[this.indexOfCurrentMarker].speedKPH);
          this.markers[this.indexOfCurrentMarker].addTo(this.map);
          this.indexOfCurrentMarker++;
        });
      }
      if (this.indexOfCurrentMarker == this.markers.length) {
        this.timer.unsubscribe();
        this.indexOfCurrentMarker = 0;
      }
    }
  }

  pause() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.timer?.unsubscribe();
    }
  }

  initHistoryAnimation() {
    this.hand.showValue(0);
    this.isPlaying = false;
    this.markers.forEach(marker => marker.remove());
    this.timer?.unsubscribe();
    this.indexOfCurrentMarker = 0;
    this.markers[this.indexOfCurrentMarker++].addTo(this.map);
  }

  nextMarker() {
    if (this.isPlaying) {
      this.pause();
    }
    let latLngs = [this.markers[this.indexOfCurrentMarker].getLatLng()];
    let markerBounds = latLngBounds(latLngs);
    this.map.fitBounds(markerBounds, {
      animate: true,
      maxZoom: 15
    });
    this.markers[this.indexOfCurrentMarker++].addTo(this.map);
  }

  previousMarker() {
    if (this.isPlaying) {
      this.pause();
    }
    let latLngs = [this.markers[this.indexOfCurrentMarker].getLatLng()];
    let markerBounds = latLngBounds(latLngs);
    this.map.fitBounds(markerBounds, {
      animate: true,
      maxZoom: 15
    });
    this.markers[this.indexOfCurrentMarker--].remove();
  }

  showPolyline() {
    if (this.polylineDisplayed) {
      this.map?.removeLayer(this.polyline);
      this.markers.forEach(marker => marker.addTo(this.map));
    } else {
      this.polyline.addTo(this.map);
      this.markers.forEach(marker => marker.remove());
    }
    this.polylineDisplayed = !this.polylineDisplayed;
  }
}
