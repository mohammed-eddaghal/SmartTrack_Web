import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Vehicle } from '../models/vehicle.model';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent implements OnInit {

  closeResult: string;
  isUpdatingOrAdding: string;

  vehicules: Vehicle[];
  listVehicules: any;

  tele: any;
  driverName: any;
  adresse: string;
  description: string;
  note: string;
  badge: any;
  modelCar: any;
  driver: any;
  listDriver: any;
  taillListDriver: number = -1;

  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.spinner.show();
    //this.listVehicules=["Citroen 29785-A-17"];
    this.adminService.getVehicles(this.authService.User.accountID, this.authService.User.userID).pipe(
      map((data: Vehicle[]) => data.map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.spinner.hide();
        this.vehicules = response;
        console.log(this.vehicules);
      },
      error => {
      }
    );
    this.getAllDriver();
    //   this.adminService.getVeiculs({accountID:this.authService.User.accountID}).subscribe(resultat=>{
    //     this.vehicules=resultat;
    //     console.log( JSON.stringify( resultat))
    //   })
    //  this.getAllUsers();
  }

  open(content, user?: any) {
    this.driver = user;
    if (user == null) {
      this.isUpdatingOrAdding = "Nouveau Chauffeur";
      this.tele = "";
      this.driverName = "";
      this.badge = "";
      let lastDigit = Date.now() % 10000;
      console.log('The last digit of ', Date.now(), ' is ', lastDigit);
      console.log("test ajout");
    }
    else {
      console.log(user);
      this.isUpdatingOrAdding = "Modifier Chauffeur";
      this.tele = user.contactPhone;
      this.driverName = user.displayName;
      this.adresse = user.address;
      this.description = user.description;
      this.note = user.notes;
      this.badge = user.badgeID;
      this.modelCar = user.deviceID;

      console.log("test modifier");
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult + " 1")

      if (user == null) {
        this.ajoutDriver();
        this.getAllDriver();
        console.log("function d'ajout");
      }
      else {
        this.modifierDriver(user);
        this.getAllDriver();
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

  modifierDriver(body) {
    this.adminService.updateDriver({
      "driverID": {
        "accountID": this.authService.User.accountID,
        "driverID": body.driverID.driverID,
      },
      "displayName": this.driverName, //driver’s name
      "badgeID": this.badge,
      "contactPhone": this.tele,
      "address": this.adresse,
      "description": this.description,
      "notes": this.note,
      "deviceID": this.modelCar
    }

    ).subscribe(rep => {
      console.log(rep);
    }, error => {
      console.error(error);
    })
    //this.getAllDriver();
    this.tele = "";
    this.driverName = "";
    this.adresse = "";
    this.description = "";
    this.note = "";
    this.badge = "";
    this.modelCar = "";
  }

  ajoutDriver() {
    console.log(this.listVehicules);
    this.adminService.addDriver({
      "driverID": {
        "accountID": this.authService.User.accountID,
        //generate an id (ex: use displayname + timestamp of now())
        "driverID": this.driverName + Date.now() % 1000
      },
      "displayName": this.driverName, //driver’s name
      "badgeID": this.badge,
      "contactPhone": this.tele,
      "address": this.adresse,
      "description": this.description,
      "notes": this.note,
      "deviceID": this.modelCar
    }
    ).subscribe(rep => {
      //this.getAllUsers();
      console.log(rep)
    }, error => {
      console.error(error);
    })
    this.tele = "";
    this.driverName = "";
    this.adresse = "";
    this.description = "";
    this.note = "";
    this.badge = "";
    this.modelCar = "";



  }

  getAllDriver() {
    this.adminService.getChauffeurs({ "accountID": this.authService.User.accountID }).subscribe(
      rep => {
        console.log(rep);
        this.listDriver = rep;
        this.taillListDriver = this.listDriver.length;
      }
    )
  }

  getDeviceName(deviceId: any) {
    for (let car of this.vehicules) {
      if (car.deviceID === deviceId)
        return car.vehicleModel;
    } return "";
  }

  suppDriver(userid) {
    console.log(userid);
    this.adminService.deleteDriver({ "accountID": this.authService.User.accountID, "driverID": userid }).subscribe(rep => {
      console.log(rep);
      this.getAllDriver();
    }, err => {
      console.error("delete !!!")
    });
    console.log("supp button");
  }

}
