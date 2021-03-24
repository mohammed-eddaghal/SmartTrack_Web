import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  displayName: string = "";
  oldPassword: string = "";
  newPassword: string = "";
  changePass = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.adminService.getStatsProfile(this.authService.User.accountID, this.authService.groupID)
      .subscribe(
        (response: Stats) => {
          this.data = response;
          console.log(this.data);
        },
        error => {
        }
      );
    this.displayName = this.authService.User.displayName;
  }

  update() {
    var body;
    if(this.changePass) {
      body = {
        "accountID": this.authService.User.accountID,
        "userID": this.authService.User.userID,
        "displayName": this.displayName,
        "oldPassword": this.oldPassword,
        "password": this.newPassword,
      };
    } else {
      body = {
        "accountID": this.authService.User.accountID,
        "userID": this.authService.User.userID,
        "displayName": this.displayName,
      };
    }
    this.adminService.updateProfile(body).subscribe(rep => {
      Swal.fire('Succès', rep['message'], 'success');
      this.authService.displayName = this.displayName;
    }, error => {
      Swal.fire('Erreur', error, 'error');
    });
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