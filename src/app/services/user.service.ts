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
  constructor(http: HttpClient) { 
    super('http://91.234.195.124:9090/api/',http)
  }
}
