/**
 * hada service li kat3yat fih l api
 *  service DataService hwa fin kinin les methodes d manipulation d api (put,post,get,...)
 */


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SubUserService extends DataService {

  constructor(http: HttpClient) {
    super(http);
  }

  login(body) {
    return this.postFnc(this.apiPath + 'user/login', body);
  }

  etatUser(body: any) {
    return this.postFnc(this.apiPath + 'user/devices', body)
  }

  getGroupID(accountID: string, userID: string) {
    var body = {
      'groupID': { 'accountID': accountID, 'userID': userID }
    }
    return this.postFnc(this.apiPath + 'user/group', body);
  }
}
