import { IsAdminService } from './../services/is-admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  isadm:boolean;
  constructor(private isAdmin:IsAdminService) { }

  ngOnInit(): void {
    this.isadm=this.isAdmin.is_subUser;
  }

}
