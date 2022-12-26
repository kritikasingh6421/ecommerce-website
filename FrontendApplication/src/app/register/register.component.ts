import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { CommunityService } from '../service/community.service';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  match: boolean = true;

  register = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstname: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    lastname: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  get email() { return this.register.get('email'); }
  get firstname() { return this.register.get('firstname'); }
  get lastname() { return this.register.get('lastname'); }
  get password() { return this.register.get('password'); }
  get cpassword() { return this.register.get('cpassword'); }

  constructor(
    private apiService: RestApiService,
    private service: CommunityService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.updateHeaderHideStatus(true);
  }

  registerFail: boolean = false;

  login(){
    this.router.navigate(['login']);
  }
  onSubmit() {
    console.log(this.register.value.email)
    if (this.register.value.password != this.register.value.cpassword) {
      this.match = false
    }
    else {
      this.apiService.register(this.register.value).subscribe(
        (result: User) => {
          if (result == null) {
            this.registerFail = true;
          }
          else {
            this.service.updateHeaderHideStatus(false);
            this.router.navigate(['login']);
          }
        },
        () => {
          alert("Registration Unsuccessful.");
        },
        () => {
          this.register.reset();
        }
      );
    }

  }
}
