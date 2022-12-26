import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  /* Login */
  login(id: string, password: string): Observable<string[]> {
    return this.http.get<string[]>(Constants.userApiURL + id + "/" + password).pipe(
      retry(2),
      catchError(this.errorHandler)
    );;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    this.router.navigate(['']);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(Constants.userApiURL + id).pipe(
      retry(2),
      catchError(this.errorHandler)
    );;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(Constants.userApiURL, user).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  /* product related api calls */

  code: string = "";//

  getPendingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(Constants.adminApiURL + "product").pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  approveProduct(code: string): Observable<Product> {
    return this.http.put<Product>(Constants.adminApiURL + "product-approve/" + code, null).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  rejectProduct(code: string): Observable<Product> {
    return this.http.delete<Product>(Constants.adminApiURL + "product-reject/" + code).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(Constants.poductApiURL, product).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  getProductById(code: string): Observable<Product> {
    return this.http.get<Product>(Constants.poductApiURL + code).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  getSpecificProduct(code: string): Observable<Product[]> {
    return this.http.get<Product[]>(Constants.poductApiURL + "search/" + code);
  }

  getProductFilter(key: string, brand: string, rating: number): Observable<Product[]> {
    return this.http.get<Product[]>(Constants.poductApiURL + "filter/" + key + "/" + brand + "/" + rating).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  /* rest api for reviews */
  postReview(review: Review): Observable<Review> {
    return this.http.post<Review>(Constants.reviewAPiURL, review).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  getNewReview(): Observable<Review[]> {
    return this.http.get<Review[]>(Constants.adminApiURL + "review").pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  getApprovedReview(code: string): Observable<Review[]> {
    return this.http.get<Review[]>(Constants.reviewAPiURL + "approved/" + code).pipe(
      retry(2),
      catchError(this.errorHandler)
    );

  }

  checkReview(code: string): Observable<string[]> {
    return this.http.get<string[]>(Constants.poductApiURL + "check/" + code).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  setNoOfReviews(): Observable<Product[]> {
    return this.http.put<Product[]>(Constants.reviewAPiURL + "noOfReviews", null).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  approveReview(id: number): Observable<Review> {
    return this.http.put<Review>(Constants.adminApiURL + "approve/" + id, null).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  rejectReview(id: number): Observable<Review> {
    return this.http.delete<Review>(Constants.adminApiURL + "reject/" + id).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  /* Statistics Status */
  getSizeOfUser(): Observable<number> {
    return this.http.get<number>(Constants.userApiURL + "size").pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  getNumberOfPost(): Observable<number> {
    return this.http.get<number>(Constants.reviewAPiURL + "size").pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  getNumberOfProduct(): Observable<number> {
    return this.http.get<number>(Constants.poductApiURL + "size").pipe(
      retry(2),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    console.log('error message', error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

}
