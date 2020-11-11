import { AuthGuard } from './../guards/auth.guard';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin:boolean;
  user={
    
      "accountID": "",
      "userID": "",
      "search": ""
  }

  private _isLoggedIn:boolean = false;

  get isLoggedIn() : boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(newStatus : boolean) {
    this._isLoggedIn = newStatus;
  }

  constructor() {}

}
