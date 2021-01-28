import { Component, HostListener, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Pager } from 'src/app/utilities/pager';
import { Notification } from '../../models/notification.model';

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

  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.user = this.authService.User;
    this.getNotifications();
  }

  getNotifications() {
    //1609459200 start
    //1611568460 end
    //"SP" filters
    this.adminService.getAllNotifications(this.user.accountID, this.user.userID, ["1352094081093673", "1357454071240632"], 1609459200, 1611568460,
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
}
