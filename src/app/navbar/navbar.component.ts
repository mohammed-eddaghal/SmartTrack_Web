import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sysadmin: boolean = false

  admin: boolean = false

  displayName: string = "";

  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  isShow: boolean = false;

  isNavbarCollapsed: boolean = true;

  ngOnInit(): void {
    this.sysadmin = this.authService.User.accountID == 'sysadmin' ? true : false;
    this.admin = this.authService.isAdmin;
    this.displayName = this.authService.User.displayName;
    this.isAdmin = this.authService.isAdmin;
  }

  onIsShow() {
    this.isShow = !this.isShow;
  }

  logout() {
    this.authService.isLoggedIn = false;
    this.authService.groupID = "";
    localStorage.clear();
  }

}
