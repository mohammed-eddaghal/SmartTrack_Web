import { Observable } from 'rxjs';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Vehicle } from '../models/vehicle.model';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

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
  user = null;
  listUsers: any;

  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.adminService.getVehicles(this.authService.User.accountID, this.authService.User.userID).pipe(
      map((data: Vehicle[]) => data.map(vehicle => new Vehicle().deserialize(vehicle)))
    ).subscribe(
      response => {
        this.spinner.hide();
        this.vehicules = response;
      },
      error => {
      }
    );
    this.getAllUsers();
  }

  open(content, user?: any) {
    this.user = user;
    if (user == null) {
      this.isUpdatingOrAdding = "Nouveau Utilisateur";
      this.userName = "";
      this.passwd = "";
      this.isActive = false;
    }
    else {
      this.isUpdatingOrAdding = "Modifier Utilisateur";
      this.userName = user.displayName;
      this.passwd = user.password;
      this.isActive = user.isActive;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (user == null) {
        this.ajoutUtilisateur();
        this.getAllUsers();
      }
      else {
        this.modifierUtilisateur(user);
      }

      //this.ajoutUtilisateur();

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
    this.adminService.updateUser({
      "accountID": this.authService.User.accountID,
      "userID": body.userID.userID,
      "password": this.passwd,
      "name": this.userName,
      "active": this.isActive
    }
    ).subscribe(rep => {
      this.getAllUsers();
    }, error => {
      console.error(error);
    })
    this.passwd = "";
    this.userName = "";
    this.isActive = false;
  }

  ajoutUtilisateur() {
    this.adminService.addUser({
      "accountID": this.authService.User.accountID,
      "userID": this.userName + Date.now() % 10000,
      "password": this.passwd,
      "name": this.userName,
      "active": this.isActive
    }).subscribe(rep => {
      this.getAllUsers();
    }, error => {
      console.error(error);
    })
    //this.getAllUsers();
    this.passwd = "";
    this.userName = "";
    this.isActive = false;
  }

  getAllUsers() {
    this.adminService.getUsers({ "accountID": this.authService.User.accountID }).subscribe(
      rep => {
        this.listUsers = rep;
      }, err => {
        console.error(err)
      }
    )
  }

  suppUser(userid) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.adminService.deleteUser({ "accountID": this.authService.User.accountID, "userID": userid }).subscribe(rep => {
          this.getAllUsers();
        }, err => {
          console.error("delete !!!")
        });
      }
    });
  }

}
