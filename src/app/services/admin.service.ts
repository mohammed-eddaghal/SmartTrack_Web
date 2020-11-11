import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService extends DataService {

  isAdmin: boolean;
  // body:any;

  constructor(http: HttpClient) {
    super(http);
  }

  login(body: any) {
    return this.postFnc(this.apiPath + 'account/login', body);
  }

  getDevices(accountID: string, search: string){
    var body = {
      "accountID" : accountID,
      "search" : search
    };
    return this.postFnc(this.apiPath + 'account/devices', body);
  }

  getDashboardDistanceStats(accountID: string, startTime: number, endTime: number){
    var body = {
      "accountID" : accountID,
      "startTime" : startTime,
      "endTime" : endTime
    };
    return this.postFnc(this.apiPath + 'dashboard/distance', body);
  }
}