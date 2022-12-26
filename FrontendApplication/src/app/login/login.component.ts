import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { CommunityService } from '../service/community.service';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFail: boolean = false;

  login = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  get email() { return this.login.get('email'); }
  get password() { return this.login.get('password'); }

  constructor(
    private apiService: RestApiService,
    private service: CommunityService,
    private route: Router) { }

  ngOnInit(): void {
    this.service.updateHeaderHideStatus(true);
  }

  onSubmit(): void {
    if (this.login.valid) {
      this.apiService.login(this.email?.value, this.password?.value).subscribe(
        (userName: string[]) => {

          if (userName.length != 0) {
            //alert('Logged in Successfully');
            this.service.loggedInUser(userName[0] + " " + userName[1]);
            localStorage.setItem('token', this.email?.value);
            this.email?.value == "admin@gmail.com" ? localStorage.setItem('userType', 'admin') : localStorage.setItem('userType', 'user');
            this.login.reset();
            if (localStorage.getItem('userType') == 'admin') {
              this.route.navigate(['admin'])
            }
            else {
              this.route.navigate(['user/search']);
            }
            this.service.updateLoginStatus(true);
            this.service.updateHeaderHideStatus(false);
          }
          else {
            //alert('Login Unsuccessfully');
            this.loginFail = true;
            //this.login.reset();
          }

        },
        () => {
          this.loginFail = true;
          this.login.reset();
        }
      );
    }
  }
  
}
