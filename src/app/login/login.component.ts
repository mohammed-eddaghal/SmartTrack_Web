import { AdminService } from "./../services/admin.service";

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubUserService } from '../services/subuser.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //les variables li kijiw mn formulaire kit7ato f had les variables
  isAdmin: boolean = true;
  userName: any;
  subuser: any;
  passowrd: any;

  x: any;
  checkuser: any;

  logoPath: any = "../../assets/logo_photoshop.png";

  //var li katsifat l serveur bnsba l admin
  admin: any = {
    "accountID": "",
    "password": ""
  }

  //var li katsift l serveur bnsba l sub user
  subUser: any = {
    "userID": {
      "accountID": "",
      "userID": ""
    },
    "password": ""
  }
  contructor() { }
  constructor(private subUserService: SubUserService,
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService) { }


  ngOnInit(): void {
    //kandon hadchi ghitbadal
    this.authService.isAdmin = this.isAdmin;
    if (this.authService.isLoggedIn) {
      this.router.navigate(['position'])
    }
  }

  //la function li katlensa mli katbrak 3la button sing in
  signIn() {
    //ila kan is_subUser =true => rah subuser
    //sinon rah admin
    this.subUser.userID.accountID = this.authService.user.accountID = this.userName;
    this.subUser.userID.userID = this.authService.user.userID = this.subuser;
    this.subUser.password = this.passowrd;
    this.authService.isAdmin = false;
    this.subUserService.login(this.subUser)
      .subscribe(response => {
        //normalement x ghtafficta liha return d api
        this.x = response
        this.authService.user.displayName = response['displayName'];
        
        if (this.x.isActive) {
          this.authService.isLoggedIn = true;
          this.subUserService.getGroupID(this.subUser.userID.accountID, this.subUser.userID.userID).subscribe(
            response => {
              this.authService.groupID = response['groupID']['groupID'];
              this.router.navigate(["position"]);
            }

          )
        }
        else { Swal.fire('Oops...', 'Ce compte est désactivé!', 'error'); }
      }, error => {
        // alert("erreur verifier les données inserer")
        Swal.fire('Oops...', 'Something went wrong!', 'error')
      })
  }

  signInAsAdmin() {
    this.authService.user.accountID = this.userName;
    this.admin.accountID = this.userName;
    this.authService.user.userID = "";
    this.admin.password = this.passowrd;
    this.authService.isAdmin = true;
    this.adminService.login(this.admin)
      .subscribe(response => {
        //normalement x ghtafficta liha return d api
        this.x = response
        this.authService.user.displayName = response['displayName'];

        if (this.x.isActive) {
          this.authService.isLoggedIn = true;
          if (this.admin.accountID == "sysadmin") {
            localStorage.setItem('loggedInAsSys', 'true');
            localStorage.setItem('accountID', 'sysadmin');
            localStorage.setItem('userID', '');
            window.location.href = "http://smartrack-geotech.com/dash/";
          }
        }
        this.router.navigate(["position"]);
      }, error => {
        Swal.fire('Oops...', error, 'error');
        // alert("erreur verifier les données inserer")
      });
  }


  //function bach katsuwitchi bin subUser o admin
  showInput() {
    this.isAdmin = !this.isAdmin;
    this.adminService.isAdmin = this.isAdmin;
  }

}
