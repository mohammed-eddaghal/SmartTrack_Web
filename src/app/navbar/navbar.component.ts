import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  admin:boolean=false
  constructor(private authService:AuthService) { }
  isShow:boolean=false;
  isNavbarCollapsed:boolean=true;
  ngOnInit(): void {
    this.admin=this.authService.isAdmin;
  }
  onIsShow(){
    this.isShow=!this.isShow;
  }
  logout() {
    this.authService.isLoggedIn = false;
    localStorage.clear();
  }
}
