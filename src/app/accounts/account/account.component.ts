import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Pager } from 'src/app/utilities/pager';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  closeResult: string;
  name: any;
  passwd: any;
  isActive: boolean = false;
  account = null;
  accounts: any;
  last: boolean;
  page: number = 0;
  // pager object
  pager: Pager = {
    pageCount: 0,
    currentPage: 0,
    size: 10,
    pages: []
  };

  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  open(content, account?: any) {
    this.account = account;
    if (account == null) {
      this.name = "";
      this.passwd = "";
      this.isActive = false;
    }
    else {
      this.name = account.displayName;
      this.passwd = account.password;
      this.isActive = account.isActive;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      if (account == null) {
        this.addAccount();
        this.getAllAccounts();
      }
      else {
        this.updateAccount(account);
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

  updateAccount(body) {
    this.adminService.updateAccount({
      "accountID": body.accountID,
      "password": this.passwd,
      "displayName": this.name,
      "isActive": this.isActive
    }
    ).subscribe(rep => {
      this.getAllAccounts();
    }, error => {
      console.error(error);
    });
    this.passwd = "";
    this.name = "";
    this.isActive = false;
  }

  addAccount() {
    // "accountID": this.name + Date.now() % 10000,
    this.adminService.addAccount({
      "accountID": this.name,
      "password": this.passwd,
      "displayName": this.name,
      "isActive": this.isActive
    }).subscribe(rep => {
      this.getAllAccounts();
    }, error => {
      Swal.fire('Oops...', error, 'error');
      console.error(error);
    });
    this.passwd = "";
    this.name = "";
    this.isActive = false;
  }

  getAllAccounts() {
    this.spinner.show();
    this.adminService.getAccounts({ "accountID": this.authService.User.accountID, "page": this.page, "size": this.pager.size }).subscribe(
      data => {
        this.last = data['last'];
        this.pager.pageCount = data['totalPages'];
        this.pager.currentPage = data['pageable']['pageNumber'];
        this.pager.pages = Array.from({ length: this.pager.pageCount }, (v, k) => k);
        this.accounts = data['content'];
        this.spinner.hide();
      }, err => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  deleteAccount(accountID) {
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
        this.adminService.deleteAccount(accountID).subscribe(rep => {
          this.getAllAccounts();
        }, err => {
          console.error("delete error !!!");
        });
      }
      // else if (result.isDenied) {
      //   Swal.fire('Changes are not saved', '', 'info')
      // }
    });
  }

  setPage(page: number) {
    this.page = page;
    this.getAllAccounts();
  }

}
