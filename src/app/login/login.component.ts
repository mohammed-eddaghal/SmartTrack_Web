import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

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

  constructor(private userservice:UserService) { }

 
  ngOnInit(): void {
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
        //console.log(this.x);
        /*this.adminRep.accountID = this.x.id
        this.vad.push(this.post)
        this.post = {
          id: 0,
          title: '',
          body: '',
          userId: 1
        }
        this.tst = true;
        this.form = false;*/
      }, error => {
        alert(error.message)
      })
    }else{
      this.admin.accountID=this.userName;
      this.admin.password=this.passowrd;
    }

    //console.log(this.userName," / ",this.passowrd," / ",this.subuser," / ",this.is_subUser);
  }

  //function bach katsuwitchi bin subUser o admin
  showInput(){
    this.is_subUser=!this.is_subUser;
  }

}
