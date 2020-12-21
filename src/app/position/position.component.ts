import { AdminService } from "./../services/admin.service";
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Device } from "../models/device.model";
import { Icon, Map, Marker} from 'leaflet';
import { Observable } from "rxjs";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  isAdmin: boolean;
  isSearching: boolean = false;
  devices: Device[];
  private map: Map;
  private zoom: number;
  private smallIcon = new Icon({
    iconUrl: '/assets/status/marker_blue_parking.png',
    iconSize: [26, 30],
    iconAnchor: [14, 4],
  });
  private parc = {
    lat: 34.033759,
    lng: -5.009296
  };
  constructor(private adminService: AdminService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.adminService.isAdmin;
    this.updateDevices();
  }

  receiveMap(map: Map) {
    this.map = map;
  }

  setMarkers() {
    this.devices.forEach(device => {
      const marker = new Marker([device.latitude, device.longitude], { icon: this.smallIcon });
      marker.addTo(this.map).bindPopup('text');
    });
    interval(3000).subscribe((val) => { console.log('called'); this.devices[0].activity_time='+10,l'; });
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  updateDevices() {
    this.adminService.getDevicesPosition(this.authService.user.accountID, this.authService.user.userID).pipe(
      map((data: Device[]) => data.map(device => new Device().deserialize(device)))
    ).subscribe(
        (response) => {
          this.devices = response;
          this.setMarkers();
        },
        error => null,
      );
  }
}
