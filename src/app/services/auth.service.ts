import { AuthGuard } from './../guards/auth.guard';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAdmin: boolean = false;
  private _groupID: string = '';

  private _isLoggedIn: boolean = false;

  user = {
    "accountID": "",
    "userID": "",
    "search": ""
  }

  get isLoggedIn(): boolean {
    if (localStorage.getItem('loggedIn') === 'true') return true;
    return this._isLoggedIn;
  }

  set isLoggedIn(newStatus: boolean) {
    localStorage.setItem('loggedIn', newStatus.toString());
    this._isLoggedIn = newStatus;
    if (newStatus) {
      localStorage.setItem('accountID', this.user.accountID);
      localStorage.setItem('userID', this.user.userID);
    }
  }

  get isAdmin(): boolean {
    if (localStorage.getItem('isAdmin') === 'true') return true;
    else if (localStorage.getItem('isAdmin') === 'false') return false;
    return this._isAdmin;
  }

  set isAdmin(isAdmin: boolean) {
    localStorage.setItem('isAdmin', isAdmin.toString());
    this._isAdmin = isAdmin;
  }

  set groupID(groupID: string) {
    localStorage.setItem('groupID', groupID);
    this._groupID = groupID;
  }

  get groupID() {
    if (localStorage.getItem('groupID') != null) return localStorage.getItem('groupID');
    return this._groupID;
  }

  get User() {
    var userID;
    var accountID;
    if (localStorage.getItem('userID') != null) {
      userID = localStorage.getItem('userID');
    } else {
      userID = this.user.userID;
    }
    if (localStorage.getItem('accountID') != null) {
      accountID = localStorage.getItem('accountID');
    } else {
      accountID = this.user.accountID;
    }
    this.user.accountID = accountID;
    this.user.userID = userID;
    return this.user;
  }

  constructor() {
    if (localStorage.getItem('accountID') != '') {
      this.user.accountID = localStorage.getItem('accountID');
    }
    if (localStorage.getItem('userID') != '') {
      this.user.accountID = localStorage.getItem('userID')
    }
  }

}
