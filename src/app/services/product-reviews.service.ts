import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-url';

export interface ProductReview {
  id: number;
  product_id: number;
  product_line: string;
  product_name: string;
  author: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ProductReviewSummary {
  product_id: number;
  product_line: string;
  average_rating: number;
  total_reviews: number;
  reviews: ProductReview[];
}

export interface ProductReviewPayload {
  product_name: string;
  author: string;
  rating: number;
  comment: string;
}

export interface ProductReviewSummaryByLine {
  product_line: string;
  total_reviews: number;
  average_rating: number;
}

export interface ProductReviewSummaryByProduct extends ProductReviewSummaryByLine {
  product_id: number;
  product_name: string;
}

export interface ProductReviewsAnalytics {
  total_reviews: number;
  average_rating: number;
  rating_distribution: { rating: number; count: number }[];
  by_line: ProductReviewSummaryByLine[];
  by_product: ProductReviewSummaryByProduct[];
}

@Injectable({ providedIn: 'root' })
export class ProductReviewsService {
  private readonly apiUrl = API_BASE_URL + '/products';

  constructor(private http: HttpClient) {}

  getAnalytics(): Observable<ProductReviewsAnalytics> {
    return this.http.get<ProductReviewsAnalytics>(this.apiUrl + '/reviews/summary');
  }

  getReviews(productId: number, line: string): Observable<ProductReviewSummary> {
    return this.http.get<ProductReviewSummary>(this.apiUrl + '/' + productId + '/reviews', {
      params: new HttpParams().set('line', line)
    });
  }

  addReview(productId: number, line: string, review: ProductReviewPayload): Observable<ProductReview> {
    return this.http.post<ProductReview>(this.apiUrl + '/' + productId + '/reviews', review, {
      params: new HttpParams().set('line', line)
    });
  }
}
