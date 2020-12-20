import { AdminService } from "./../services/admin.service";
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Device } from "../models/device.model";
import { Icon, Map, Marker} from 'leaflet';

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
    this.adminService.getDevicesPosition(this.authService.user.accountID, this.authService.user.userID)
      .subscribe(
        (response: Device[]) => {
          this.devices = response;
          this.setMarkers();
        },
        error => null,
      );
  }

  receiveMap(map: Map) {
    this.map = map;
  }

  setMarkers() {
    this.devices.forEach(device => {
      const marker = new Marker([device.latitude, device.longitude], { icon: this.smallIcon });
      marker.addTo(this.map).bindPopup('text');
    });
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
}
