import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { Vehicle } from 'src/app/models/vehicle.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Alarm } from '../../models/alarm.model';

@Component({
  selector: 'app-alarmes',
  templateUrl: './alarmes.component.html',
  styleUrls: ['./alarmes.component.css']
})
export class AlarmesComponent implements OnInit {

  vehicles: Vehicle[];
  alarm: Alarm = new Alarm();

  constructor(private adminService: AdminService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminService.getAllDevicesShortDetail(this.authService.user.accountID, 0, this.authService.groupID).pipe(
      map((data: any) => data['content'].map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.vehicles = response;
      },
      error => {
      }
    );
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.adminService.setAlarmConfig(this.alarm).subscribe(
          response => {
            Swal.fire('OK', 'la configuration est ajouté avec succès!', 'success')
          },
          error => {
            Swal.fire('Oops...', 'Something went wrong!', 'error')
          }
        );
        this.alarm = new Alarm();
      },
      (reason) => { 
        this.alarm = new Alarm();
      }
    );
  }

  getAlarmConfig(content, deviceID: string) {
    this.adminService.getAlarmConfig(this.authService.user.accountID, deviceID, this.authService.user.userID).pipe(
      map((alarm: any) => new Alarm().deserialize(alarm))
    ).subscribe(
      response => {
        this.alarm = response;
        this.open(content);
      },
      error => {
      }
    );
  }

}
