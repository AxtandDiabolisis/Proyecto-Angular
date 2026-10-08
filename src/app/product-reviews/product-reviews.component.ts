import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductReviewSummary, ProductReviewsService } from '../services/product-reviews.service';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css'
})
export class ProductReviewsComponent implements OnChanges {
  @Input({ required: true }) productId = 0;
  @Input({ required: true }) productLine = '';
  @Input({ required: true }) productName = '';
  @Output() closed = new EventEmitter<void>();

  readonly stars = [1, 2, 3, 4, 5];
  readonly summary = signal<ProductReviewSummary | null>(null);
  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly success = signal(false);
  author = '';
  comment = '';
  rating = 0;

  constructor(private reviewsService: ProductReviewsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] || changes['productLine']) this.loadReviews();
  }

  loadReviews(): void {
    this.loading.set(true);
    this.error.set('');
    this.reviewsService.getReviews(this.productId, this.productLine).subscribe({
      next: (summary) => {
        this.summary.set(summary);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar las opiniones. Revisa que el servidor esté disponible.');
        this.loading.set(false);
      }
    });
  }

  submitReview(): void {
    if (!this.author.trim() || !this.comment.trim() || this.rating < 1 || this.rating > 5) return;
    this.submitting.set(true);
    this.error.set('');
    this.success.set(false);
    this.reviewsService.addReview(this.productId, this.productLine, {
      product_name: this.productName,
      author: this.author.trim(),
      rating: this.rating,
      comment: this.comment.trim()
    }).subscribe({
      next: () => {
        this.author = '';
        this.comment = '';
        this.rating = 0;
        this.submitting.set(false);
        this.success.set(true);
        this.loadReviews();
      },
      error: () => {
        this.submitting.set(false);
        this.error.set('No se pudo guardar tu opinión. Inténtalo de nuevo.');
      }
    });
  }
}
