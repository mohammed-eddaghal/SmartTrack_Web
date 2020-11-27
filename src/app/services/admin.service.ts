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

  getDevices(accountID: string, search: string) {
    var body = {
      "accountID": accountID,
      "search": search
    };
    return this.postFnc(this.apiPath + 'account/devices', body);
  }

  getVehicles(accountID: string, userID: string, search?: string) {
    var body = {
      "accountID": accountID,
      "userID": userID,
      "search": search ?? ''
    };
    return this.postFnc(this.apiPath + 'vehicles', body);
  }

  getDashboardDistanceStats(accountID: string, startTime: number, endTime: number) {
    var body = {
      "accountID": accountID,
      "startTime": startTime,
      "endTime": endTime
    };
    return this.postFnc(this.apiPath + 'dashboard/distance', body);
  }

  etatAdmin(body: any) {
    return this.postFnc(this.apiPath + 'account/devices', body)
  }

  /*getVeiculs(body:any){
    return this.postFnc(this.apiPath+'vehicles',body);
  }*/

  addUser(body:any){
    return this.postFnc(this.apiPath+'add/user',body);
  }

  addDriver(body:any){
    return this.postFnc(this.apiPath+'add/driver',body);
  }

  addMaitenanceAssurance(body:any){
    return this.postFnc(this.apiPath+'add/insurance',body);
  }

  /*addMaintenanceCartGrise(body:any){
    return this.postFnc(this.apiPath+'add/insurance',body);
  }*/

  addMaintenanceVisitTechnique(body:any){
    return this.postFnc(this.apiPath+'add/technicalVisit',body);
  }

  addMaintenanceEntretien(body:any){
    return this.postFnc(this.apiPath+'add/entretien',body);
  }

  getUsers(body:any){
    return this.postFnc(this.apiPath+'findall/user',body);
  }

  getChauffeurs(body:any){
    return this.postFnc(this.apiPath+'findall/driver',body);
  }

  deleteUser(body:any){
    return this.postFnc(this.apiPath+"delete/user/",body);
  }

  deleteDriver(body:any){
    return this.postFnc(this.apiPath+"delete/driver/",body);
  }

  updatUser(body:any){
    return this.putFnc(this.apiPath+"update/user",body);
  }

  updateDriver(body:any){
    return this.putFnc(this.apiPath+"update/driver",body);
  }
}
