import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AskReviewComponent } from './ask-review/ask-review.component';
import { PostReviewComponent } from './post-review/post-review.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DisplayComponent } from './display/display.component';
const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'search/product/:id', component: DisplayComponent },
  { path: 'search/reviews/:id', component: ProductDetailsComponent },
  { path: 'search/product/:id/post-review/:id', component: PostReviewComponent },
  { path: 'search/product/:id/ask-for-review', component: AskReviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
