import { Component, HostListener, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Pager } from 'src/app/utilities/pager';
import { Notification } from '../../models/notification.model';
import { Icon, Map, Marker } from 'leaflet';
import { Vehicle } from 'src/app/models/vehicle.model';
import { EventData } from 'src/app/models/eventdata.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    currentPage: -1,
    size: 10,
    pages: []
  };
  private map: Map;
  private marker: Marker;
  private zoom: number;
  vehicles: Vehicle[];
  deviceIDs: String[];
  startTime = new Date().setHours(0, 0, 0, 0);
  endTime = new Date().setHours(23, 59, 59, 999);
  private device: EventData;
  events: String[] = ["BA", "BO", "CR", "DI", "DR", "SP", "TMAX", "TMIN", "SU", "TO"];
  vehiclesDropdownSettings: any = {};
  filtersDropdownSettings: any = {};
  ShowFilter = true;
  myForm: FormGroup;
  filters = [
    { filterName: "battery", filterID: "BA" },
    { filterName: "bonnet", filterID: "BO" },
    { filterName: "crash", filterID: "CR" },
    { filterName: "disconnect", filterID: "DI" },
    { filterName: "driver", filterID: "DR" },
    { filterName: "speed", filterID: "SP" },
    { filterName: "maxTemp", filterID: "TMAX" },
    { filterName: "mintTemp", filterID: "TMIN" },
    { filterName: "startUp", filterID: "SU" },
    { filterName: "towing", filterID: "TO" },
  ];

  constructor(private authService: AuthService, private adminService: AdminService,
    private _decimalPipe: DecimalPipe, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.vehiclesDropdownSettings = {
      singleSelection: false,
      idField: 'deviceID',
      textField: 'vehicleModel',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: this.ShowFilter
    };
    this.filtersDropdownSettings = {
      singleSelection: false,
      idField: 'filterID',
      textField: 'filterName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: this.ShowFilter
    };
    this.myForm = this.fb.group({
      devices: new FormControl(),
      filters: this.filters,
      startTime: new Date().toISOString().substring(0, 16),
      endTime: new FormControl(new Date().toISOString().substring(0, 16)),
    });
    this.user = this.authService.User;
    this.adminService.getAllDevicesShortDetail(this.authService.User.accountID, 0, this.authService.groupID).pipe(
      map((data: any) => data['content'].map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.vehicles = response;
        this.deviceIDs = this.vehicles.map(v => v.deviceID);
        this.getNotifications();
      },
      error => {
      }
    );
  }

  getNotifications() {
    this.adminService.getAllNotifications(this.user.accountID, this.user.groupID,
      this.deviceIDs, ~~(new Date(this.startTime).getTime() / 1000), ~~(new Date(this.endTime).getTime() / 1000),
      this.events, this.pager.currentPage + 1).pipe(
        map((data: any) => {
          this.last = data['last'];
          this.pager.pageCount = data['totalPages'];
          this.pager.currentPage = data['pageable']['pageNumber'];
          this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
          return data['content'].map(notification => new Notification().deserialize(notification));
        },
        )
      ).subscribe(
        result => {
          this.notifications.push(...result);
        },
        error => null,
      );
  }

  @HostListener('scroll', ['$event'])
  onElementScroll($event) {
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
        this.device = result;
        console.log(result);
        this.marker?.remove();
        this.marker = new Marker(
          [result.latitude, result.longitude], {
          icon: new Icon({
            iconUrl: result.icon(),
            iconSize: [26, 30],
            iconAnchor: [14, 4],
          })
        }
        );
        this.marker.bindPopup(
          "<span style='color:#089200;font-weight:bold;'>" + this.device.vehicleModel + "</span>" + '<hr style="height:2px;border-width:0;color:gray;background-color:gray;padding:0;margin:0">'
          + "<span style=''>" + this.device.adress + "</span>" + " <br/>"
          + "<span style=''>" + new DatePipe('en-US').transform(new Date(this.device.timestamp * 1000), 'yyyy-MM-dd HH:mm') + "</span>" + " <br/>"
          + "<span style=''>" + this.transformDecimal(this.device.speedKPH) + " Km/h</span>" + " <br/>"
          + "<span style=''> état: " + this.device.activity_time.split(',')[1] + "</span>" + " <br/>"
          + "<span style=''>" + this.transformDecimal(this.device.odometerKM) + " KM</span>"
        );
        this.marker.addTo(this.map);
      },
      err => {
        console.log(err);
      }
    );
  }
  transformDecimal(num) {
    return this._decimalPipe.transform(num, '1.2-2');
  }
  open(content) {
    this.deviceIDs = [];
    this.events = [];
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log("modal result: " + result);
      console.log("deviceIDs: " + this.deviceIDs);
      console.log("events: " + this.events);
      console.log("startTime: " + this.startTime);
      console.log("end time" + this.endTime);
      this.notifications = [];
      this.pager = {
        pageCount: 0,
        currentPage: -1,
        size: 10,
        pages: []
      };
      this.getNotifications();
    }, err => {
      console.log("model err: " + err);
    });
  }

  onItemSelect(item: any) {
    if (item.deviceID != null) {
      this.deviceIDs.push(item.deviceID);
    } else {
      this.events.push(item.filterID);
    }
  }

  onSelectAllFilters(items) {
    this.events = [];
    this.events = items.map(i => i.filterID);
  }

  onSelectAllDeviceIDs(items) {
    this.deviceIDs = [];
    this.deviceIDs = items.map(i => i.deviceID);
  }
}
