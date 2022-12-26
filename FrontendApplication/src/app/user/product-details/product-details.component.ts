import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { CommunityService } from 'src/app/service/community.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private apiService: RestApiService,
    private service: CommunityService,
    private actRoute: ActivatedRoute) { }

  reviews: Review[] = [];
  product: any = {};
  code: string = "";

  ngOnInit(): void {
    this.code = this.actRoute.snapshot.params['id'];

    this.apiService.getProductById(this.code).subscribe(
      (result: Product) => {
        this.product = result;
      },
      () => {
        //alert('Server Not Working..');
      },
    );

    this.apiService.getApprovedReview(this.code).subscribe(
      (result: Review[]) => {
        this.reviews = result;
      },
      () => {
        //alert('Server Not Working..');
      }
    );
  }

  back() {
    this.service.back();
  }

}
