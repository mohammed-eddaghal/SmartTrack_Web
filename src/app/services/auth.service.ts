import { AuthGuard } from './../guards/auth.guard';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAdmin:boolean=false;

  private _isLoggedIn:boolean = false;

  user = {
      "accountID": "",
      "userID": "",
      "search": ""
  }
  
  get isLoggedIn() : boolean {
    if(localStorage.getItem('loggedIn') === 'true') return true;
    return this._isLoggedIn;
  }

  set isLoggedIn(newStatus : boolean) {
    localStorage.setItem('loggedIn', newStatus.toString());
    localStorage.setItem('isAdmin', newStatus.toString());
    this._isLoggedIn = newStatus;
    if(newStatus == true) {
      localStorage.setItem('accountID', this.user.accountID);
      localStorage.setItem('userID', this.user.userID);
    }
  }

  get isAdmin() : boolean {
    if(localStorage.getItem('isAdmin') === 'true') return true;
    else if(localStorage.getItem('isAdmin') === 'false') return false;
    return this._isAdmin;
  }

  set isAdmin(isAdmin : boolean) {
    localStorage.setItem('isAdmin', isAdmin.toString());
    this._isAdmin = isAdmin;
  }

  constructor() {
    if(localStorage.getItem('accountID') != '') {
      this.user.accountID = localStorage.getItem('accountID');
    }
    if(localStorage.getItem('userID') != '') {
      this.user.accountID = localStorage.getItem('userID')
    }
  }

}
