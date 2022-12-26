import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants/constants';
import { User } from '../models/user.model';
import { CommunityService } from '../service/community.service';
import { RestApiService } from '../service/rest-api.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private apiService: RestApiService,
    private service : CommunityService) { }

  isLogin : boolean = false;
  hideHeader: boolean = false;
  userLogin : string = ""; 
    
  ngOnInit(): void {
      this.service.getLoginStatus.subscribe((data: boolean)=>{
        //console.log('login status',data);
        this.isLogin = data;
      });

      this.service.getHeaderHideStatus.subscribe((status: boolean)=>{
        //console.log('hide status',status);
        this.hideHeader = status;
      });

      this.service.getLoggedInUser.subscribe((result)=>{
        //console.log('user login',result);
        this.userLogin = result; 
      })
  }

  logout(){
    //alert('You have successfully Logged out.');
    this.service.updateLoginStatus(false);
    this.apiService.logout();  
  }

}
