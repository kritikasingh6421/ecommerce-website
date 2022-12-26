import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { Product } from 'src/app/models/product.model';
import { CommunityService } from 'src/app/service/community.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-ask-review',
  templateUrl: './ask-review.component.html',
  styleUrls: ['./ask-review.component.scss']
})
export class AskReviewComponent implements OnInit {

  constructor(
    private apiService : RestApiService,
    private service : CommunityService,
    private route : Router){}

  ask = new FormGroup({
    code : new FormControl(null,[Validators.required]),
    brand : new FormControl(null,[Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    name : new FormControl(null,[Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    avgRating : new FormControl(0),
    noOfReviews : new FormControl(0),
    approval: new FormControl("no")
  });

  get code(){ return this.ask.get('code');}
  get brand(){ return this.ask.get('brand');}
  get name(){ return this.ask.get('name');}

  ngOnInit(): void {
    this.service.updateHeaderHideStatus(true);
  }

  unavailable : boolean = false;
  approved : boolean = false;
  pending : boolean = false;
  key : string = "";

  onSubmit(){

    this.unavailable = false;
    this.approved = false;
    this.pending = false;
    
    this.apiService.checkReview(this.code?.value).subscribe(
      (data:string[])=>{

        if(data[0]==Constants.APPROVED){
          this.approved = true;
          this.key = this.code?.value
          setTimeout(()=>{
            //console.log(' pending');
            this.service.updateHeaderHideStatus(false);
            this.route.navigate(['user/search/reviews/',this.key]);
          },30000);
        } 

        if(data[0]==Constants.PENDING){
          //alert('Product does not exist in record!!');
          this.pending = true;
          this.ask.reset();
          this.service.updateHeaderHideStatus(false);
        }

        if(data[0]==Constants.UNAVAILABLE){
          this.unavailable = true;
          this.apiService.postProduct(this.ask.value).subscribe(
            (result:Product)=>{
              console.log(result);
              this.ask.reset();
            }
          );
          this.service.updateHeaderHideStatus(false);
        }

    },
    ()=>{},
    ()=>{}
    );
  }

}
