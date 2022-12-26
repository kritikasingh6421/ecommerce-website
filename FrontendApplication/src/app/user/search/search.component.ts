import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private apiService: RestApiService,
    private router: Router
  ) { }

  search = new FormGroup({
    code: new FormControl(null, Validators.required),
  });

  get code() { return this.search.get('code'); }

  ngOnInit(): void {
    this.apiService.setNoOfReviews().subscribe(
      (result: Product[]) => {
        //console.log('products',result);
      },
      () => {
        //alert('Something went wrong..');
      }
    );
  }

  onSubmit() {
    //console.log(this.code?.value);
    this.apiService.code = this.code?.value;
    this.router.navigate(['user/search/product/', this.apiService.code]);
  }
}
