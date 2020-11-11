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
export class UserService extends DataService {

  // body:any;

  constructor(http: HttpClient) { 
    super(http);
  }
  
  login(body) {
    return this.postFnc(this.apiPath + 'user/login', body);
  }

}
