import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiService : RestApiService) { }

  users: number = 0;
  products: number = 0;
  reviews: number = 0;

  ngOnInit(): void {
    this.apiService.getSizeOfUser().subscribe(
      (data:number)=>{
        this.users = data;
        //console.log('users',data)
      },
      ()=>{
        //alert('Server not Working');
      }
    );

    this.apiService.getNumberOfPost().subscribe(
      (data:number)=>{
        this.reviews = data;
        //console.log('users',data)
      },
      ()=>{
        //alert('Server not Working');
      }
    );

    this.apiService.getNumberOfProduct().subscribe(
      (data:number)=>{
        this.products = data;
        //console.log('users',data)
      },
      ()=>{
        //alert('Server not Working');
      }
    );

  }

}
