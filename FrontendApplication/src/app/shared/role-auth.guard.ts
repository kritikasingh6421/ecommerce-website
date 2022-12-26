import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RestApiService } from '../service/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {
  constructor(
    private service: RestApiService){}
  canActivate(){
    let Role = localStorage.getItem('userType');
    if(Role=='admin'){
      return true;
    }
    alert("You don't have admin rights.")
    this.service.logout();
    return false;
  }
  
}
