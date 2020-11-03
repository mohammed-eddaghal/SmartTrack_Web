import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  is_subUser:boolean=false;
  userName:any;
  subuser:any;
  passowrd:any;
  checkuser:any;

  constructor() { }

  chemain:any="../../assets/logo_photoshop.png";
  ngOnInit(): void {
  }

  signIn(){
    console.log(this.userName," / ",this.passowrd," / ",this.subuser," / ",this.is_subUser);
  }

  showInput(){
    this.is_subUser=!this.is_subUser;
  }

}
