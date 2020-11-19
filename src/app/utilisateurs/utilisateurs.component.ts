import { Observable } from 'rxjs';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  closeResult:string;

  vehicules:any;
  listVehicules:any;
  mail:any;
  userName: any;
  passwd:any;
  isActive:boolean=false;
  
  listUsers:any;

  constructor(private modalService: NgbModal,
              private authService:AuthService,
              private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getVeiculs({accountID:this.authService.user.accountID}).subscribe(resultat=>{
      this.vehicules=resultat;
      console.log( JSON.stringify( resultat))   
    })
   this.getAllUsers();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult+" 1")
      this.ajoutUtilisateur();
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult+" 2");
      console.log(Date.now())
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ajoutUtilisateur(){
    this.adminService.addUser({
      "accountID": this.authService.user.accountID,
      "userID": this.userName,
      "password" : this.passwd,
      "name" : this.userName+Date.now(),
      "email" : this.mail,
      "active" : this.isActive,
      "devices" : this.listVehicules
   }).subscribe(rep=>{console.log(rep)},error=>{
      console.error(error);
    })
    this.getAllUsers();
    this.mail="";
    this.passwd="";
    this.listVehicules=[];
    this.userName="";
    this.isActive=false;

    
  }

  getAllUsers(){
    this.adminService.getUsers({"accountID":this.authService.user.accountID}).subscribe(
      rep=>{
        this.listUsers=rep;
      },err=>{
        console.error(err)
      }
    )
  }

  suppUser(userid:string){
    this.adminService.deleteUser({"accountID":this.authService.user.accountID,
  "userID":userid});
  console.log("supp button");
  }

}
