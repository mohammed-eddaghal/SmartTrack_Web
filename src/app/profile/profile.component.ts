import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: Stats;
  showForm = false;
  
  constructor(
    private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.adminService.getStatsProfile(this.authService.User.accountID, this.authService.groupID)
      .subscribe(
        (response : Stats) => {
          this.data = response;
          console.log(this.data);
        },
        error => {
        }
      );
  }
}
interface Stats {
  firstRow: FirstRow;
  maxDistance: MaxDistance;
  maxRunningTime: MaxRunningTime;
  maxSpeed: MaxSpeed;
}

interface FirstRow {
  all: number;
  moving: number;
  parked: number;
  late: number;
  renewal: number;
}

interface MaxDistance {
  vehicleModel: string;
  maxDistance: number;
}

interface MaxRunningTime {
  maxRunningTime: string;
  vehicleModel: string;
}

interface MaxSpeed {
  vehicleModel: string;
  maxSpeed: number;
}