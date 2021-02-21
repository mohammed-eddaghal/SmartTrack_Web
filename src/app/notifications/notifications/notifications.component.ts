import { Component, HostListener, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Pager } from 'src/app/utilities/pager';
import { Notification } from '../../models/notification.model';
import { Icon, Map, Marker } from 'leaflet';
import { Vehicle } from 'src/app/models/vehicle.model';
import { EventData } from 'src/app/models/eventdata.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  private user: any;
  notifications: Notification[] = [];
  last: boolean;
  // pager object
  pager: Pager = {
    pageCount: 0,
    currentPage: 0,
    size: 10,
    pages: []
  };
  private map: Map;
  private marker: Marker;
  private zoom: number;
  private vehicles: Vehicle[];
  private deviceIDs: String[];

  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.user = this.authService.User;
    this.adminService.getAllDevicesShortDetail(this.authService.user.accountID, 0, this.authService.groupID).pipe(
      map((data: any) => data['content'].map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.vehicles = response;
        this.deviceIDs = this.vehicles.map(v => v.deviceID);
        console.log(this.deviceIDs);
        this.getNotifications();
      },
      error => {
      }
    );
  }

  getNotifications() {
    //1609459200 start
    //1611568460 end
    //"SP" filters
    this.adminService.getAllNotifications(this.user.accountID, this.user.userID,
      this.deviceIDs, ~~(Date.now() / 1000) - 86400, ~~(Date.now() / 1000),
      ["SP"], this.pager.currentPage++).pipe(
        map((data: any) => {
          this.last = data['last'];
          this.pager.pageCount = data['totalPages'];
          this.pager.currentPage = data['pageable']['pageNumber'];
          this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
          return data['content'].map(notification => new Notification().deserialize(notification));
        },
        )
      ).subscribe(
        result => this.notifications.push(...result),
        error => null,
      );
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max && !this.last) {
      this.getNotifications();
    }
  }

  receiveMap(map: Map) {
    this.map = map;
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  updateMarkerState(deviceID, timestamp) {
    this.adminService.getPosition(deviceID, timestamp).pipe(
      map((device: EventData) => new EventData().deserialize(device))
    ).subscribe(
      result => {
        console.log(result)
        this.marker = new Marker(
          [result.latitude, result.longitude], {
          icon: new Icon({
            iconUrl: result.icon(),
            iconSize: [26, 30],
            iconAnchor: [14, 4],
          })
        }
        );
        this.marker.addTo(this.map);
      },
      err => {
        console.log(err);
      }
    );
  }
}
