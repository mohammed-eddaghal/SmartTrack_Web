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

  isAdmin: boolean = true;

  logoPath: any = "../../assets/logo_photoshop.png";

  contructor() { }
  constructor(private subUserService: SubUserService,
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService) { }

  account: string = "";
  user: string = "";
  password: string = "";
  isUser = false;


  ngOnInit(): void {
    //kandon hadchi ghitbadal
    this.authService.isAdmin = this.isAdmin;
    if (this.authService.isLoggedIn) {
      this.router.navigate(['position'])
    }
  }

  signIn() {
    var body = {
      "accountID": this.account,
      "password": this.password
    };

    if (this.isUser) {
      body["userID"] = this.user;
    }

    this.adminService.login(body)
      .subscribe(response => {

        console.log(response);

        this.authService.displayName = response['displayName'];
        this.authService.user.accountID = body['accountID'];
        this.authService.user.userID = body['userID'];
        this.authService.groupID= body['userID'];
        this.authService.isLoggedIn = true;
        this.authService.isAdmin = !this.isUser;

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
