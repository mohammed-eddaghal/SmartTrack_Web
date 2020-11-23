import { Observable } from 'rxjs';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Vehicle } from '../models/vehicle.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  closeResult: string;
  isUpdatingOrAdding: string;

  vehicules: Vehicle[];
  listVehicules: any;
  mail: any;
  userName: any;
  passwd: any;
  isActive: boolean = false;

  listUsers: any;
  taillListUsers: number = -1;

  constructor(private modalService: NgbModal,
    private authService: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    //this.listVehicules=["Citroen 29785-A-17"];
    this.adminService.getVeiculs({ accountID: this.authService.user.accountID }).pipe(
      map((data: Vehicle[]) => data.map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.vehicules = response;
      },
      error => {
      }
    );
    //   this.adminService.getVeiculs({accountID:this.authService.user.accountID}).subscribe(resultat=>{
    //     this.vehicules=resultat;
    //     console.log( JSON.stringify( resultat))
    //   })
    //  this.getAllUsers();
  }

  open(content, user?: any) {
    if (user == null) {
      this.isUpdatingOrAdding = "Nouveau Utilisateur";
      this.mail = "";
      this.userName = "";
      this.isActive = false;
      let lastDigit = Date.now() % 10000;
      console.log('The last digit of ', Date.now(), ' is ', lastDigit);
      console.log("test ajout");
    }
    else {
      this.isUpdatingOrAdding = "Modifier Un Utilisateur";
      this.mail = user.contactEmail;
      this.userName = user.contactName;
      this.passwd = user.password;
      this.isActive = user.isActive;
      //this.listVehicules=["29557-A-17 peugeot208"];
      //this.listVehicules=user.devices.userDeviceID.deviceID;
      //console.log(user);
      //for(let device in  user.devices){
      //console.log(device);}
      console.log(user);
      console.log("test modifier");
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult + " 1")

      if (user == null) {
        this.ajoutUtilisateur();
        this.getAllUsers();
        console.log("function d'ajout");
      }
      else {
        this.modifierUtilisateur(user);
        console.log("fenction de modification");
      }

      //this.ajoutUtilisateur();

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult + " 2");
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

  modifierUtilisateur(body) {
    this.adminService.updatUser({
      "accountID": this.authService.user.accountID,
      "userID": body.userID.userID,
      "password": body.password,
      "name": this.userName,
      "email": this.mail,
      "active": this.isActive,
      "devices": this.listVehicules
    }
    ).subscribe(rep => {
      console.log(rep);
    }, error => {
      console.error(error);
    })
    this.getAllUsers();
    this.mail = "";
    this.passwd = "";
    this.listVehicules = [];
    this.userName = "";
    this.isActive = false;
  }

  ajoutUtilisateur() {
    console.log(this.listVehicules);
    this.adminService.addUser({
      "accountID": this.authService.user.accountID,
      "userID": this.userName + Date.now() % 10000,
      "password": this.passwd,
      "name": this.userName,
      "email": this.mail,
      "active": this.isActive,
      "devices": this.listVehicules
    }).subscribe(rep => {
      //this.getAllUsers();
      console.log(rep)
    }, error => {
      console.error(error);
    })
    //this.getAllUsers();
    this.mail = "";
    this.passwd = "";
    this.listVehicules = [];
    this.userName = "";
    this.isActive = false;


  }

  getAllUsers() {
    this.adminService.getUsers({ "accountID": this.authService.user.accountID }).subscribe(
      rep => {
        this.listUsers = rep;
        this.taillListUsers = this.listUsers.length;
        console.log("nv getAllUsers");

      }, err => {
        console.error(err)
      }
    )
  }

  suppUser(userid) {
    console.log(userid);
    this.adminService.deleteUser({ "accountID": this.authService.user.accountID, "userID": userid }).subscribe(rep => {
      console.log(rep);
      this.getAllUsers();
    }, err => {
      console.error("delete !!!")
    });
    console.log("supp button");
  }

}
