import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsAdminService {

  is_subUser:boolean=false;
  constructor() { }
}
