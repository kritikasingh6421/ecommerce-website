import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand.model';
import { Product } from 'src/app/models/product.model';
import { Rating } from 'src/app/models/rating.model';
import { CommunityService } from 'src/app/service/community.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(
    private apiService: RestApiService,
    private service: CommunityService,
    private actRoute: ActivatedRoute,
    private route: Router) { }

  products: Product[] = [];
  code: string = "";
  noResult: boolean = false;

  brands = [
    new Brand('adidas', 'Adidas'),
    new Brand('nike', "Nike"),
    new Brand('puma', 'PUMA')
  ]

  ratings = [
    new Rating(1, 1),
    new Rating(2, 2),
    new Rating(3, 3),
    new Rating(4, 4),
    new Rating(5, 5)
  ]

  filter = new FormGroup({
    brand: new FormControl(null, [Validators.required]),
    rating: new FormControl(null, [Validators.required])
  });

  get brand() { return this.filter.get('brand') }
  get rating() { return this.filter.get('rating') }

  ngOnInit(): void {
    this.code = this.actRoute.snapshot.params['id'];
    this.noResult = false;
    this.apiService.getSpecificProduct(this.code).subscribe((result: Product[]) => {
      if (result.length != 0) {
        this.products = result;
        //console.log('length of array',this.products.length);
      }
      else {
        this.noResult = true;
      }
    },
      () => { },
      () => { }
    );

  }

  onSubmit() {
    console.log(this.brand?.value);
    this.getProducts(this.brand?.value, this.rating?.value);
  }

  back() {
    this.service.back();
  }

  redirect(code: string) {
    this.route.navigate(['user/search/reviews/', code]);
  }

  getProducts(brand: string, rating: number) {
    this.noResult = false;
    this.apiService.getProductFilter(this.code, brand, rating).subscribe(
      (result: Product[]) => {
        if (result.length != 0) {
          this.products = result;
          //console.log('length of array',this.products.length);
        }
        else {
          this.products = [];
          this.noResult = true;
        }
      },
      () => { },
      () => { }
    );
  }
}
