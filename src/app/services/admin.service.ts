import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alarm } from '../models/alarm.model';
import { Device, DeviceID } from '../models/device.model';
import { Maintenance } from '../models/maintenance.model';
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

  getDevicesPosition(accountID: string, tabContent: String, search?: String, groupID?: string) {
    var body;
    if (groupID != null && groupID != '') {
      body = {
        "accountID": accountID,
        "groupID": groupID,
        "search": search ?? ''
      };
      if (tabContent == '') {
        var link = 'user/devices';
      } else {
        var link = 'user/' + tabContent + '/vehicles';
      }
    } else {
      body = {
        "accountID": accountID,
        "search": search ?? ''
      };
      if (tabContent == '') {
        var link = 'account/devices';
      } else {
        var link = 'account/' + tabContent + '/vehicles';
      }
    }
    return this.postFnc(this.apiPath + link, body);
  }


  getDevicePosition(deviceID: string) {
    var body = {
      "deviceID": deviceID
    };
    return this.postFnc(this.apiPath + 'solo/eventdata', body);
  }


  getSummaryReport(accountID: string, userID: string, deviceID: string, startTime: number, endTime: number, web: string) {
    var body = {
      "accountID": accountID,
      "userID": userID,
      "deviceID": deviceID,
      "startTime": startTime,
      "endTime": endTime,
      "web": web
    };
    return this.postFnc(this.apiPath + 'report/summary', body);
  }

  getSpeedReport(accountID: string, userID: string, startTime: number, endTime: number, deviceID?: string) {
    var body = {
      "accountID": accountID,
      "userID": userID,
      "startTime": startTime,
      "endTime": endTime,
      "speed": 0
    };
    if (deviceID != "0") body['deviceID'] = deviceID;

    return this.postFnc(this.apiPath + 'report/speed', body);
  }

  getSpeedPercentReport(startTime: number, endTime: number, deviceID?: string) {
    var body = {
      "startTime": startTime,
      "endTime": endTime,
      "deviceID": deviceID
    };
    return this.postFnc(this.apiPath + 'report/speed/percent', body);
  }

  getTemperatureReport(startTime: number, endTime: number, deviceID?: string) {
    var body = {
      "startTime": startTime,
      "endTime": endTime,
      "deviceID": deviceID
    };
    return this.postFnc(this.apiPath + 'report/temperature', body);
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

  addUser(body: any) {
    return this.postFnc(this.apiPath + 'add/user', body);
  }

  addDriver(body: any) {
    return this.postFnc(this.apiPath + 'add/driver', body);
  }

  addDevice(device: Device, groupID?: string) {
    var path;
    if (groupID != null) {
      path = 'add/device?groupID=' + groupID;
    } else {
      path = 'add/device';
    }
    return this.postFnc(this.apiPath + path, JSON.stringify(device));
  }

  deleteDevice(deviceID: DeviceID, groupID?: string) {
    var path;
    if (groupID != null && groupID != '') {
      path = 'delete/device?groupID=' + groupID;
    } else {
      path = 'delete/device';
    }
    return this.postFnc(this.apiPath + path, JSON.stringify(deviceID));
  }

  getAllDevices(accountID: string, query?: string, page?: number, asc?: boolean, sortBy?: string, size?: number, groupID?: string) {
    var body;
    if (groupID != null && groupID != "") {
      body = {
        "groupID": groupID,
        "asc": asc ?? true,
        "sortBy": sortBy ?? "timestampStart",
        "size": size ?? 10,
        "page": page ?? 0,
        "search": query ?? ''
      };
    } else {
      body = {
        "accountID": accountID,
        "asc": asc ?? true,
        "sortBy": sortBy ?? "timestampStart",
        "size": size ?? 10,
        "page": page ?? 0,
        "search": query ?? ''
      };
    }
    return this.postFnc(this.apiPath + 'findall/device', body);
  }

  getAllDevicesShortDetail(accountID: string, page: number, groupID?: string, sortBy?: string) {
    var body;
    if (groupID != null && groupID != "") {
      body = {
        "groupID": groupID,
        "page": page,
        "short": true,
        "sortBy": sortBy ?? "vehicleModel"
      };
    } else {
      body = {
        "accountID": accountID,
        "page": page,
        "short": true,
        "sortBy": sortBy ?? "vehicleModel"
      };
    }
    return this.postFnc(this.apiPath + 'findall/device', body);
  }

  getAlarmConfig(accountID: string, deviceID: string, userID?: string) {
    var body = {
      "accountID": accountID,
      "deviceID": deviceID,
      "userID": userID ?? "",
    };
    return this.postFnc(this.apiPath + 'find/alarm', body);
  }

  setAlarmConfig(alarm : Alarm) {
    return this.postFnc(this.apiPath + 'add/alarm', alarm);
  }

  getAllMaintenances(accountID: string, query?: string, page?: number, asc?: boolean, sortBy?: string, size?: number) {
    var body = {
      "accountID": accountID,
      "asc": asc ?? true,
      "sortBy": sortBy ?? "timestampStart",
      "size": size ?? 10,
      "page": page ?? 0,
      "search": query ?? ''
    };

    return this.postFnc(this.apiPath + 'findall/maintenance', body);
  }

  /*addMaintenanceCartGrise(body:any){
    return this.postFnc(this.apiPath+'add/insurance',body);
  }*/

  addMaintenance(maintenance: Maintenance) {
    switch (maintenance.maintenance_Type) {
      case 'Draining': return this.addDraining(maintenance);
      case 'TechnicalVisit': return this.addTechnicalVisit(maintenance);
      case 'Insurance': return this.addInsurance(maintenance);
      case 'Entretien': return this.addEntretien(maintenance);
    }
  }

  updateMaintenance(maintenance: Maintenance) {
    switch (maintenance.maintenance_Type) {
      case 'Draining': return this.updateDraining(maintenance);
      case 'TechnicalVisit': return this.updateTechnicalVisit(maintenance);
      case 'Insurance': return this.updateInsurance(maintenance);
      case 'Entretien': return this.updateEntretien(maintenance);
    }
  }

  addDraining(body: any) {
    return this.postFnc(this.apiPath + 'add/draining', body);
  }

  addInsurance(body: any) {
    return this.postFnc(this.apiPath + 'add/insurance', body);
  }

  addTechnicalVisit(body: any) {
    return this.postFnc(this.apiPath + 'add/technicalVisit', body);
  }

  addEntretien(body: any) {
    return this.postFnc(this.apiPath + 'add/entretien', body);
  }

  updateInsurance(body: Maintenance) {
    return this.putFnc(this.apiPath + 'update/insurance', body);
  }

  updateDraining(body: Maintenance) {
    return this.putFnc(this.apiPath + 'update/draining', body);
  }

  updateEntretien(body: Maintenance) {
    return this.putFnc(this.apiPath + 'update/entretien', body);
  }

  updateTechnicalVisit(body: Maintenance) {
    return this.putFnc(this.apiPath + 'update/technicalVisit', body);
  }

  getUsers(body: any) {
    return this.postFnc(this.apiPath + 'findall/user', body);
  }

  getChauffeurs(body: any) {
    return this.postFnc(this.apiPath + 'findall/driver', body);
  }

  deleteUser(body: any) {
    return this.postFnc(this.apiPath + "delete/user/", body);
  }

  deleteDriver(body: any) {
    return this.postFnc(this.apiPath + "delete/driver/", body);
  }

  updatUser(body: any) {
    return this.putFnc(this.apiPath + "update/user", body);
  }

  updateDriver(body: any) {
    return this.putFnc(this.apiPath + "update/driver", body);
  }

  updateDevice(body: any) {
    return this.putFnc(this.apiPath + "update/device", body);
  }
  getVeiculs(body: any) {
    return this.postFnc(this.apiPath + 'vehicles', body);
  }

  // addUser(body: any) {
  //   return this.postFnc(this.apiPath + 'add/user', body);
  // }

  // getUsers(body: any) {
  //   return this.postFnc(this.apiPath + 'findall/user', body);
  // }

  // deleteUser(body: any) {
  //   return this.deleteFnc(this.apiPath + "delete/user", body);
  // }
}
