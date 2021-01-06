import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { map } from 'rxjs/operators';
import { time } from '@amcharts/amcharts4/core';
import {DatePipe} from '@angular/common';

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
  maintenances: any;

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
    private datePipe:DatePipe,
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
    this.adminService.getAllMaintenances(this.authService.user.accountID, this.authService.user.userID).subscribe(
      response => {
        this.maintenances = response;
        console.log(response);
      },
      error => {

      }
    )
  }

  open(content, index?: number, mintKey?: string, maint?: any) {

    if(maint==null){
      switch (index) {
        case 0: {
          this.typeOfForm = index;
          this.assurance(content, maint);
          break;
        }
        case 1: {
          this.typeOfForm = index;
          this.nvCartGrise(content, maint);
          break;
        }
        case 2: {
          this.typeOfForm = index;
          this.nvVistTechnique(content, maint);
          break;
        }
        case 4: {
          this.typeOfForm = index;
          this.entretien(content, maint);
          break;
        }
      }
    }else {
      switch (this.getMaintType(mintKey)) {
        case 0: {
          this.typeOfForm = 0;
          console.log("////**************/////////////");
          console.log(JSON.stringify(maint));
          this.assurance(content, maint);
          break;
        }
        case 1: console.log(2);break;
        case 4: {
          this.typeOfForm = 4;
          console.log("////**************/////////////");
          console.log(JSON.stringify(maint));
          this.entretien(content, maint);
          break;
        }
        default: console.log("xx");
      }
      console.log(JSON.stringify(maint)+" / "+mintKey);
    }



  }

  private getMaintType(maint:any):number{
    console.log(maint);
    if(maint==="insurance")return 0;
    if(maint==="technicalVisit")return 1;
    if(maint==="entretien")return 4;
    else return -1;
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

  assurance(content, row?: any) {
    this.maint = row;
    if (row == null) {
      this.isUpdatingOrAdding = "Ajouter Assurance";
      this.modelCar = "";
      this.MaintName = "";
      this.dateDebut = "";
      this.dateFin = "";
      this.prixMaint = null;
      console.log("test ajout");
    }
    else {
      console.log(row);
      let dateS=new Date(row.timestampStart*1000);
      let dateF=new Date(row.timestampEnd*1000);
      this.datePipe.transform(dateS, 'dd/MM/yyyy');
      //console.log(new Date(row.timestampEnd*1000))
      this.isUpdatingOrAdding = "Modifier Assurance";
      //this.modelCar = "";
      this.MaintName = row.name;
      this.dateDebut = this.datePipe.transform(dateS, 'yyyy-MM-dd');
      this.dateFin = this.datePipe.transform(dateF, 'yyyy-MM-dd');
      this.prixMaint = 0;

      console.log("test modifier");
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult + " 1")

      if (row == null) {
        console.log(this.dateDebut + "/" + this.modelCar);
        this.ajoutAssurance();
        console.log("function d'ajout");
      }
      else {
        console.log(this.dateDebut+" / "+this.dateFin);
        this.modifieAssurance(row);
        console.log("fenction de modification");

      }

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

  entretien(content, row?: any) {
    this.maint = row;
    if (row == null) {
      this.isUpdatingOrAdding = "Ajouter Entretien";
      this.modelCar = "";
      this.MaintName = "";
      this.dateDebut = "";
      this.dateFin = "";
      this.prixMaint = null;
      console.log("test ajout");
    }
    else {
      console.log(row);
      let dateS=new Date(row.timestampStart*1000);
      let dateF=new Date(row.timestampEnd*1000);
      this.datePipe.transform(dateS, 'dd/MM/yyyy');
      //console.log(new Date(row.timestampEnd*1000))
      this.isUpdatingOrAdding = "Modifier Entretien";
      //this.modelCar = "";
      this.MaintName = row.name;
      this.dateDebut = this.datePipe.transform(dateS, 'yyyy-MM-dd');
      this.dateFin = this.datePipe.transform(dateF, 'yyyy-MM-dd');
      this.prixMaint = 0;

      console.log("test modifier");
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult + " 1")

      if (row == null) {
        console.log(this.dateDebut + "/" + this.modelCar);
        this.ajoutEntretien();
        console.log("function d'ajout");
      }
      else {
        console.log(this.dateDebut+" / "+this.dateFin);
        //this.modifieAssurance(row);
        console.log("fenction de modification");

      }

      //this.ajoutUtilisateur();

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
      "name": this.MaintName
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

  modifieAssurance(row:any) {
    console.log("///////////")
    console.log("1 "+row.id);
    this.modelCar = row.deviceID;
    console.log("1 "+this.MaintName);
    console.log("1 "+new Date(this.dateDebut).getTime() / 1000);
    console.log("1 "+new Date(this.dateFin).getTime() / 1000);
    console.log("1 "+this.modelCar);
    this.adminService.updateMaintenaceAssurance({
      "id": row.id,
      "deviceID": this.modelCar,
      "timestampStart": new Date(this.dateDebut).getTime() / 1000,
      "timestampEnd": new Date(this.dateFin).getTime() / 1000,
      "name": this.MaintName
    }).subscribe(rep => {
      console.log(rep);
    }, error => {
      console.error(error);
    });
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
      "name": this.MaintName,
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
      "name": this.MaintName,
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

  getType(type) {
    switch (type) {
      case 'entretien':
        return 'entretien';

      case 'technicalVisit':
        return 'visite technique';

      case 'insurance':
        return 'assurance';

      case 'draining':
        return 'vidange';

      default:
        return 'maintenance';
    }
  }

  getPourcentageDays(timestampStart, timestampEnd) {
    return (timestampEnd - timestampStart) / Math.abs(Math.floor(new Date().getTime() / 1000) - timestampEnd);
  }

  getProgressClass(timestampStart, timestampEnd) {
    var p = this.getPourcentageDays(timestampStart, timestampEnd);
    switch (true) {
      case p < 25:
        return 'progress-bar progress-bar-striped  bg-success';
      case p < 50:
        return 'progress-bar progress-bar-striped  bg-warning';
      case p < 75:
        return 'progress-bar progress-bar-striped  bg-danger';
      default:
        return 'progress-bar progress-bar-striped bg-info';
    }
  }

  getDeviceName(deviceId: any) {
    for (let car of this.vehicules) {
      if (car.deviceID === deviceId)
        return car.vehicleModel;
    } return "";
  }


}
