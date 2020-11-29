import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  listNvMaintenance: string[] = [
    'Nouveau Assurance',
    'Nouveau Cart Grise',
    'Nouveau Visite Technique',
    'Nouveau Vidange',
    'Nouveau Entretiens'
  ];

  typeOfForm: number = -1;

  closeResult: string;
  isUpdatingOrAdding: string;

  vehicules: Vehicle[];

  MaintName: any;

  maint: any;

  toDay: string;

  dateDebut: string = "";
  dateFin: string = "";
  prixMaint: number;
  modelCar: any;
  namex: any;
  dateCartGrise: string;

  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.toDay = new Date().toJSON().split('T')[0];
    console.log(this.toDay)
    console.log("hhhhh " + new Date(this.toDay).getTime());
    this.spinner.show();
    this.adminService.getVehicles(this.authService.user.accountID, this.authService.user.userID).pipe(
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
  }

  open(content, index?: number, user?: any) {

    switch (index) {
      case 0: {
        this.typeOfForm = index;
        this.nvAssurance(content, user);
        break;
      }
      case 1: {
        this.typeOfForm = index;
        this.nvCartGrise(content, user);
        break;
      }
      case 2: {
        this.typeOfForm = index;
        this.nvVistTechnique(content, user);
        break;
      }
      case 4: {
        this.typeOfForm = index;
        this.nvEntretien(content, user);
        break;
      }
    }

  }

  nvCartGrise(content, user?: any) {
    console.log("cart Grise");
    this.maint = user;
    if (user == null) {
      this.isUpdatingOrAdding = "Ajouter Cart Grise";
      this.MaintName = "";
      console.log("test ajout");
    }
    else {
      console.log("test modifier");
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult + " 1")

      if (user == null) {
        console.log("function d'ajout");
      }
      else {
        console.log("fenction de modification");
      }

      //this.ajoutUtilisateur();

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult + " 2");
      console.log(Date.now())
    });
  }

  nvAssurance(content, user?: any) {
    this.maint = user;
    if (user == null) {
      this.isUpdatingOrAdding = "Ajouter Assurance";
      this.modelCar = "";
      this.MaintName = "";
      this.dateDebut = "";
      this.dateFin = "";
      this.prixMaint = null;
      console.log("test ajout");
    }
    /*else {
      console.log(user);
      this.isUpdatingOrAdding = "Modifier Assurance";
      //this.tele = user.contactPhone;
      this.MaintName = user.displayName;
      this.adresse = user.address;
      this.description = user.description;
      this.note = user.notes;
      this.badge = user.badgeID;
      this.modelCar = user.deviceID;

      console.log("test modifier");
    }*/

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult + " 1")

      if (user == null) {
        console.log(this.dateDebut + "/" + this.modelCar);
        this.ajoutAssurance();
        console.log("function d'ajout");
      }
      /*else {

        console.log("fenction de modification");
      }*/

      //this.ajoutUtilisateur();

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult + " 2");
    });
  }

  nvVistTechnique(content, user?: any) {
    this.maint = user;
    if (user == null) {
      this.isUpdatingOrAdding = "Nouveau Visit Technique";
      this.modelCar = "";
      this.MaintName = "";
      this.dateDebut = "";
      this.dateFin = "";
      this.prixMaint = null;
      console.log("test ajout");
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult + " 1")

      if (user == null) {
        console.log(this.dateDebut + "/" + this.modelCar);
        this.ajoutVesitTech();
        console.log("function d'ajout");
      }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult + " 2");
    });
  }

  nvEntretien(content, user?: any) {
    this.maint = user;
    if (user == null) {
      this.isUpdatingOrAdding = "Nouveau Entretien";
      this.modelCar = "";
      this.MaintName = "";
      this.dateDebut = "";
      this.dateFin = "";
      this.prixMaint = null;
      console.log("test ajout");
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult + " 1")

      if (user == null) {
        console.log(this.dateDebut + "/" + this.modelCar);
        this.ajoutEntretien();
        console.log("function d'ajout");
      }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult + " 2");
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


  ajoutAssurance() {
    //console.log(this.modelCar+" / "+new Date(this.dateDebut).getTime()+" / "+new Date(this.dateFin).getTime()+" / "+ this.MaintName);
    this.adminService.addMaitenanceAssurance({
      "deviceID": this.modelCar,
      "timestampStart": (new Date(this.dateDebut).getTime() / 1000),
      "timestampEnd": new Date(this.dateFin).getTime() / 1000,
      "insuranceName": this.MaintName
    }

    ).subscribe(rep => {
      console.log(rep)
    }, error => {
      console.error(error);
    })
    this.MaintName = "";
    this.modelCar = "";
    this.dateFin = "";
    this.dateDebut = "";
    this.prixMaint = null;
  }

  ajoutVesitTech() {
    //console.log(this.modelCar+" / "+new Date(this.dateDebut).getTime()+" / "+new Date(this.dateFin).getTime()+" / "+ this.MaintName);
    this.adminService.addMaintenanceVisitTechnique({
      "deviceID": this.modelCar,
      "timestampStart": (new Date(this.dateDebut).getTime() / 1000),
      "timestampEnd": new Date(this.dateFin).getTime() / 1000,
      "technicalVisitName": this.MaintName,
      "price": this.prixMaint
    }).subscribe(rep => {
      console.log(rep)
    }, error => {
      console.error(error);
    })
    this.MaintName = "";
    this.modelCar = "";
    this.dateFin = "";
    this.dateDebut = "";
    this.prixMaint = null;
  }

  ajoutEntretien() {
    //console.log(this.modelCar+" / "+new Date(this.dateDebut).getTime()+" / "+new Date(this.dateFin).getTime()+" / "+ this.MaintName);
    this.adminService.addMaintenanceEntretien({
      "deviceID": this.modelCar,
      "timestamp": (new Date(this.dateDebut).getTime() / 1000),
      //"timestampEnd": new Date(this.dateFin).getTime()/1000,
      "entretienName": this.MaintName,
      "price": this.prixMaint
    }).subscribe(rep => {
      console.log(rep)
    }, error => {
      console.error(error);
    })
    this.MaintName = "";
    this.modelCar = "";
    this.dateFin = "";
    this.dateDebut = "";
    this.prixMaint = null;
  }

  getDeviceName(deviceId: any) {
    for (let car of this.vehicules) {
      if (car.deviceID === deviceId)
        return car.vehicleModel;
    } return "";
  }

}
