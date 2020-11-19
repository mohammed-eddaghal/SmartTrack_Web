import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeauthGuard implements CanActivate {
  constructor(private authService:AuthService,
    private route: Router){
  
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn)
      {
        this.route.navigate(['/position']);
      }
    return !this.authService.isLoggedIn;
  }
  
}
