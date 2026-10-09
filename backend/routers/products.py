from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from database import get_db
from auth import require_admin
from models import Product
from schemas import ProductCreate, ProductResponse, ProductUpdate

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("/", response_model=list[ProductResponse])
def get_products(
    line: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)

    if line:
        query = query.filter(Product.line == line)

    if category and category != "Todos":
        query = query.filter(Product.category == category)

    return query.all()


@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    _admin=Depends(require_admin),
    db: Session = Depends(get_db)
):
    new_product = Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@router.get("/categories")
def get_categories(
    line: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product.category)

    if line:
        query = query.filter(Product.line == line)

    categories = query.all()

    result = {}

    for item in categories:
        category_name = item[0]
        result[category_name] = result.get(category_name, 0) + 1

    response = [{"name": "Todos", "count": sum(result.values())}]

    for name, count in result.items():
        response.append({
            "name": name,
            "count": count
        })

    return response


@router.patch("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    changes: ProductUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    for field, value in changes.model_dump(exclude_unset=True).items():
        if isinstance(value, str):
            value = value.strip()
            if field == "price" and not value:
                value = None
        if field == "name" and not value:
            raise HTTPException(status_code=422, detail="El nombre del producto no puede quedar vacio")
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product
