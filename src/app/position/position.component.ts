import { AdminService } from "./../services/admin.service";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Device } from "../models/device.model";
import { Icon, Map, Marker } from 'leaflet';
import { Observable, Subscription } from "rxjs";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {
  isAdmin: boolean;
  isSearching: boolean = false;
  searchWord: String = "";
  devices: Device[] = [];
  markers: CMarker[] = [];
  timer: Subscription;
  devicesSelected: any = [];
  private map: Map;
  private zoom: number;
  tabContent: String = "";
  private parc = {
    lat: 34.033759,
    lng: -5.009296
  };
  constructor(private adminService: AdminService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.isAdmin = this.adminService.isAdmin;
    this.updateDevices();
    this.timer = interval(60000).subscribe(() => {
      // console.log('say hello baby');
      this.updateDevices();
    });
  }
  /**
   * this method called on destroy, we use it to close our subscription
   */
  ngOnDestroy(): void {
    this.timer.unsubscribe();
  }

  receiveMap(map: Map) {
    this.map = map;
  }

  setMarkers() {
    if (this.markers.length != 0) {
      this.markers.every((marker) => marker.marker.remove());
      this.markers.length = 0;
    }
    this.devices.forEach(device => {
      if (this.devicesSelected.find(deviceID => device.deviceID == deviceID)) {
        this.markers.push({
          "marker": new Marker([device.latitude, device.longitude], {
            icon: new Icon({
              iconUrl: device.icon(),
              iconSize: [26, 30],
              iconAnchor: [14, 4],
            })
          }),
          "deviceID": device.deviceID,
          "popupText": "<span style='color:#089200;font-weight:bold;'>" + device.vehicleModel + "</span>" + '<hr style="height:2px;border-width:0;color:gray;background-color:gray;padding:0;margin:0">'
            + "<span style=''>" + device.address + "</span>" + " <br/>"
            + "<span style=''>" + new DatePipe('en-US').transform(new Date(device.timestamp * 1000), 'yyyy-MM-dd HH:mm') + "</span>" + " <br/>"
            + "<span style=''>" + device.speedKPH + " Km/h</span>" + " <br/>"
            + "<span style=''> état: " + device.activity_time.split(',')[1] + "</span>" + " <br/>"
            + "<span style=''>" + device.odometerKM + " KM</span>"
        });
      }
    });
    this.markers.forEach((marker) => {
      marker.marker.bindPopup(marker.popupText.toString());
      marker.marker.addTo(this.map);
    });
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  updateDevices() {
    this.adminService.getDevicesPosition(this.authService.user.accountID, this.authService.user.userID, this.tabContent, this.searchWord).pipe(
      map((data: Device[]) => data.map(device => new Device(this.http).deserialize(device)))
    ).subscribe(
      (response) => {
        if (this.devices.length == 0) {
          response.forEach((device, index) => {
            this.devicesSelected[index] = device.deviceID;
          });
          console.log('setting array first time!!!!');
        }
        this.devices = response;
        this.setMarkers();
      },
      error => null,
    );
  }

  onNgModelChange(deviceID) {
    const index = this.devicesSelected.indexOf(deviceID);
    if (index == -1) {
      this.devicesSelected.push(deviceID);
      const device = this.devices.find(device => device.deviceID == deviceID);
      this.markers.push({
        "marker": new Marker([device.latitude, device.longitude], {
          icon: new Icon({
            iconUrl: device.icon(),
            iconSize: [26, 30],
            iconAnchor: [14, 4],
          })
        }),
        "deviceID": device.deviceID,
        "popupText": device.vehicleModel + " <br/>" + "address" + " <br/>" + device.timestamp + " <br/>" + device.speedKPH + " <br/>" + device.odometerKM + " <br/>"
      });
      this.markers[this.markers.length - 1].marker.bindPopup(this.markers[this.markers.length - 1].popupText.toString());
      this.markers[this.markers.length - 1].marker.addTo(this.map);
    } else {
      this.devicesSelected.splice(index, 1);
      const cMarkerIndex = this.markers.findIndex(marker => marker.deviceID == deviceID);
      this.markers[cMarkerIndex].marker.remove();
      this.markers.splice(cMarkerIndex, 1);
    }
  }

  onTabChanged(tabIndex) {
    if (tabIndex == 0) {
      this.tabContent = '';
    } else if (tabIndex == 1) {
      this.tabContent = 'running';
    } else if (tabIndex == 2) {
      this.tabContent = 'parking';
    }
    this.updateDevices();
  }
}

/**
 * This interface help us to respect the structure in our markers array
 */
export interface CMarker {
  marker: Marker,
  deviceID: String,
  popupText: String
}