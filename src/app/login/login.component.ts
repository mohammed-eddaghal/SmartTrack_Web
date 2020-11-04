import { AuthService } from './../services/auth.service';
import { IsAdminService } from './../services/is-admin.service';

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //les variables li kijiw mn formulaire kit7ato f had les variables
  is_subUser:boolean=false;
  userName:any;
  subuser:any;
  passowrd:any;

  x:any;
  checkuser:any;

  chemain:any="../../assets/logo_photoshop.png";

  //var li katsifat l serveur bnsba l admin
  admin:any={
    accountID: '',
    password: ''
  }

  //var li katsift l serveur bnsba l sub user
  subUser:any={
    "userID": {
        "accountID": "",
        "userID": ""
    },
    "password": ""
 }

 //reponce de rutern d api login admin
 adminRep:any={
  accountID: "",
  password: "",
  isActive: false
}

//reponce de rutern d api login subUser
userRep:any={
  "userID": {
      "accountID": "",
      "userID": ""
  },
  "password": "",
  "isActive": false
}

  constructor(private userservice:UserService,
              private router :Router,
              private isAdmin:IsAdminService,
              private authService:AuthService) { }

 
  ngOnInit(): void {
    this.isAdmin.is_subUser=this.is_subUser;
  }

  //la function li katlensa mli katbrak 3la button sing in
  signIn(){
    //ila kan is_subUser =true => rah subuser
    //sinon rah admin
    if(this.is_subUser){
      this.subUser.userID.accountID=this.userName;
      this.subUser.userID.userID=this.subuser;
      this.subUser.password=this.passowrd;

      console.log(this.subUser)
      this.userservice.postFnc(this.subUser,this.is_subUser)
      .subscribe(responce => {
        //normalement x ghtafficta liha return d api
        this.x = responce
        console.log(this.x);

        if(this.x.isActive){
        this.authService.is_loged=true;  
        this.router.navigate(["position"]);}
        else{console.log("maakinch")}
      }, error => {
        alert("erreur verifier les données inserer")

        
      })
    }else{
      this.admin.accountID=this.userName;
      this.admin.password=this.passowrd;
      this.userservice.postFnc(this.admin,this.is_subUser)
      .subscribe(responce => {
        //normalement x ghtafficta liha return d api
        this.x = responce
        console.log(this.x);
        
      }, error => {
        alert(error.message)
      })
    }

    //console.log(this.userName," / ",this.passowrd," / ",this.subuser," / ",this.is_subUser);
  }

  //function bach katsuwitchi bin subUser o admin
  showInput(){
    this.is_subUser=!this.is_subUser;
    this.isAdmin.is_subUser=this.is_subUser;
    console.log(this.isAdmin.is_subUser)
  }

}
