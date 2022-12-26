import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(private api : RestApiService) { }
  
  reviews : Review[] = [];
  products : Product[] = [];
  
  ngOnInit(): void {
    this.api.getNewReview().subscribe((result)=>{
       this.reviews = result;     
    },()=>{
      //alert('something went wrong!!');
      this.reviews = [];
    });

    this.api.getPendingProducts().subscribe(
      (result)=>{this.products = result;},
      ()=>{this.products = [];}
    );
  }

  acceptReview(id: number){
    console.log('accept review id:',id);
    this.api.approveReview(id).subscribe((result)=>{
      let index = this.reviews.findIndex((e: any) => e.reviewId == id);
      console.log('index',index);
      this.reviews.splice(index,1);
      //alert('Review Approved!!');
    },()=>{
      //alert('Something Went Wrong.');
    },
    ()=>{
    })
  }

  rejectReview(id: number){
    this.api.rejectReview(id).subscribe(()=>{
      let index = this.reviews.findIndex((e: any) => e.reviewId == id);
      this.reviews.splice(index,1);
      //alert('Review Rejected!!');
    },
    ()=>{
      //alert('Something Went Wrong.');
    },
    ()=>{}
    );
  }

  acceptProduct(code : string){
    this.api.approveProduct(code).subscribe(
      ()=>{
        let index = this.products.findIndex((e: any)=> e.code == code);
        this.products.splice(index,1);
      },
      ()=>{}
    );
  }

  rejectProduct(code : string){
    this.api.rejectProduct(code).subscribe(
      (result)=>{
        let index = this.products.findIndex((e:any)=> e.code == code);
        this.products.splice(index,1);
        console.log(result);
      },
      ()=>{}
    );
  }
}
