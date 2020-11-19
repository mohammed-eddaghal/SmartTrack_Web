import { AdminService } from "./../services/admin.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  isAdmin:boolean;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.isAdmin = this.adminService.isAdmin;
  }

}
