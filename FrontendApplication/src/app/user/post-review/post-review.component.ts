import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { CommunityService } from 'src/app/service/community.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.scss']
})
export class PostReviewComponent implements OnInit {

  constructor(
    private apiService: RestApiService,
    private service: CommunityService,
    private actRoute: ActivatedRoute
  ) { }

  code: number = this.actRoute.snapshot.params['id'];

  postReview = new FormGroup({
    productCode: new FormControl(this.code, [Validators.required]),
    rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
    heading: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    review: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(400)]),
    approval: new FormControl("no"),
  })

  get rating() { return this.postReview.get('rating'); }
  get heading() { return this.postReview.get('heading'); }
  get review() { return this.postReview.get('review'); }

  ngOnInit(): void {
    this.service.updateHeaderHideStatus(true);
  }

  back() {
    this.service.updateHeaderHideStatus(false);
    this.service.back();
  }

  onSubmit() {
    console.warn('comment', this.postReview.value);
    this.apiService.postReview(this.postReview.value).subscribe(
      (result: Review) => {
        //console.log('review posted',result);
        this.service.back();
      },
      () => {
        //alert('review have not posted successfully.');
      },
      () => {
        this.postReview.reset();
        this.service.updateHeaderHideStatus(false);
      }
    );
  }

}
