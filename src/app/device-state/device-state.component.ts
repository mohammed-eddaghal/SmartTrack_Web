import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventData } from '../models/eventdata.model';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { Pager } from '../utilities/pager';

@Component({
  selector: 'app-device-state',
  templateUrl: './device-state.component.html',
  styleUrls: ['./device-state.component.css']
})
export class DeviceStateComponent implements OnInit, OnDestroy {
  query: string = '';
  // pager object
  pager: Pager = {
    pageCount: 0,
    currentPage: 0,
    size: 10,
    pages: []
  };
  devices: EventData[];
  timer: Subscription;

  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.updateDevices();
    this.timer = interval(60000).subscribe(() => {
      // console.log('say hello baby');
      this.updateDevices();
    });
  }

  setPage(page: number) {
    this.pager.currentPage = page;
    this.updateDevices();
  }

  onSearsh(query: string) {
    this.query = query;
    this.pager.currentPage = 0;
    this.updateDevices();
  }

  updateDevices() {
    this.adminService.getDevicesState(this.authService.User.accountID, this.pager.currentPage, this.query, this.authService.groupID).pipe(
      map((data: any) => {
        this.pager.pageCount = data['totalPages'];
        this.pager.currentPage = data['pageable']['pageNumber'];
        this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
        return data['content'].map(ed => new EventData().deserialize(ed));
      },
      )
    ).subscribe(
      (response) => {
        this.devices = response;
      },
      error => null,
    );
  }

  /**
     * this method called on destroy, we use it to close our subscription
     */
  ngOnDestroy(): void {
    this.timer.unsubscribe();
  }
}
