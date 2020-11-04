import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  is_loged:boolean=false;
  constructor() { }
}
