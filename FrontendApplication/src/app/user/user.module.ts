import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { SearchComponent } from './search/search.component';
import { DisplayComponent } from './display/display.component';
import { AskReviewComponent } from './ask-review/ask-review.component';
import { PostReviewComponent } from './post-review/post-review.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchComponent,
    DisplayComponent,
    AskReviewComponent,
    PostReviewComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UserModule { }
