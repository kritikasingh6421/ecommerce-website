import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private route: Router){}

  canActivate(){
    if(this.authService.IsLoggedIn()){
      return true;
    }
    else{
      alert('You have not Logged in.');
      this.route.navigate(['login']);
      return false;
    }
  }
  
}
