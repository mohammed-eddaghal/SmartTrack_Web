import { AdminService } from "./../services/admin.service";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Device } from "../models/device.model";
import { Icon, Map, Marker } from 'leaflet';
import { Observable, Subscription } from "rxjs";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {
  isAdmin: boolean;
  isSearching: boolean = false;
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
  constructor(private adminService: AdminService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.adminService.isAdmin;
    this.updateDevices();
    this.timer = interval(1000).subscribe(() => {
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
          "deviceID": device.deviceID
        });
      }
    });
    this.markers.every((marker) => marker.marker.addTo(this.map));
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  updateDevices() {
    this.adminService.getDevicesPosition(this.authService.user.accountID, this.authService.user.userID, this.tabContent).pipe(
      map((data: Device[]) => data.map(device => new Device().deserialize(device)))
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
      const device = this.devices.find(device => device.deviceID = deviceID);
      this.markers.push({
        "marker": new Marker([device.latitude, device.longitude], {
          icon: new Icon({
            iconUrl: device.icon(),
            iconSize: [26, 30],
            iconAnchor: [14, 4],
          })
        }),
        "deviceID": device.deviceID
      });
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
  }
}

/**
 * This interface help us to respect the structure in our markers array
 */
export interface CMarker {
  marker: Marker,
  deviceID: String
}