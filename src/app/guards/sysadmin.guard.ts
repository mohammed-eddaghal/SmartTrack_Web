import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SysadminGuard implements CanActivate {
  constructor(private authService:AuthService,
    private route: Router){}
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.User.accountID != 'sysadmin')
      {
        this.route.navigate(['/']);
        // alert("il faut s'identifier!!! wach nta 7ma9");
      }
    return true;
  }
  
}
