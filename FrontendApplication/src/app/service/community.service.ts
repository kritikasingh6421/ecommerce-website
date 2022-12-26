import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private location: Location) { }

  /* BehaviourSubjects */
  private loginStatus = new BehaviorSubject(false);

  getLoginStatus = this.loginStatus.asObservable();

  updateLoginStatus(data: boolean) {
    if (localStorage.getItem('token')) {
      this.loginStatus.next(data);
    }
  }

  private headerHideStatus = new BehaviorSubject(false);

  getHeaderHideStatus = this.headerHideStatus.asObservable();

  updateHeaderHideStatus(data: boolean) {
    this.headerHideStatus.next(data);
  }

  private userLoggedIn = new BehaviorSubject("");

  getLoggedInUser = this.userLoggedIn.asObservable();

  loggedInUser(user: string) {
    console.log('set user', user);
    this.userLoggedIn.next(user);
  }

  back() {
    this.location.back();
  }

}
