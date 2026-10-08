from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from database import get_db
from auth import require_admin
from models import ProductReview
from schemas import ProductReviewCreate, ProductReviewResponse

router = APIRouter(prefix="/products", tags=["Product reviews"])


@router.get("/reviews/summary")
def get_reviews_summary(db: Session = Depends(get_db), _admin=Depends(require_admin)):
    total_reviews, average_rating = (
        db.query(func.count(ProductReview.id), func.avg(ProductReview.rating)).one()
    )
    by_line = (
        db.query(
            ProductReview.product_line,
            func.count(ProductReview.id),
            func.avg(ProductReview.rating),
        )
        .group_by(ProductReview.product_line)
        .order_by(func.count(ProductReview.id).desc())
        .all()
    )
    by_product = (
        db.query(
            ProductReview.product_id,
            ProductReview.product_line,
            ProductReview.product_name,
            func.count(ProductReview.id),
            func.avg(ProductReview.rating),
        )
        .group_by(
            ProductReview.product_id,
            ProductReview.product_line,
            ProductReview.product_name,
        )
        .order_by(func.count(ProductReview.id).desc(), func.avg(ProductReview.rating).desc())
        .all()
    )
    distribution = (
        db.query(ProductReview.rating, func.count(ProductReview.id))
        .group_by(ProductReview.rating)
        .all()
    )

    return {
        "total_reviews": total_reviews,
        "average_rating": round(average_rating, 1) if average_rating is not None else 0,
        "rating_distribution": [
            {"rating": rating, "count": count} for rating, count in distribution
        ],
        "by_line": [
            {
                "product_line": line,
                "total_reviews": count,
                "average_rating": round(average, 1),
            }
            for line, count, average in by_line
        ],
        "by_product": [
            {
                "product_id": product_id,
                "product_line": line,
                "product_name": name,
                "total_reviews": count,
                "average_rating": round(average, 1),
            }
            for product_id, line, name, count, average in by_product
        ],
    }


@router.get("/{product_id}/reviews")
def get_product_reviews(
    product_id: int,
    line: str = Query(min_length=1, max_length=100),
    db: Session = Depends(get_db),
):
    reviews = (
        db.query(ProductReview)
        .filter(ProductReview.product_id == product_id, ProductReview.product_line == line)
        .order_by(ProductReview.created_at.desc(), ProductReview.id.desc())
        .all()
    )
    average = (
        db.query(func.avg(ProductReview.rating))
        .filter(ProductReview.product_id == product_id, ProductReview.product_line == line)
        .scalar()
    )
    return {
        "product_id": product_id,
        "product_line": line,
        "average_rating": round(average, 1) if average is not None else 0,
        "total_reviews": len(reviews),
        "reviews": reviews,
    }


@router.post("/{product_id}/reviews", response_model=ProductReviewResponse, status_code=201)
def create_product_review(
    product_id: int,
    review: ProductReviewCreate,
    line: str = Query(min_length=1, max_length=100),
    db: Session = Depends(get_db),
):
    author = review.author.strip()
    comment = review.comment.strip()
    product_name = review.product_name.strip()
    if not author or not comment or not product_name:
        raise HTTPException(status_code=422, detail="Nombre, comentario y producto son obligatorios")

    new_review = ProductReview(
        product_id=product_id,
        product_line=line,
        product_name=product_name,
        author=author,
        rating=review.rating,
        comment=comment,
        created_at=datetime.utcnow(),
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review
