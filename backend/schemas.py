from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProductBase(BaseModel):
    name: str
    category: str
    line: str
    image: Optional[str] = None
    icon: Optional[str] = None
    description: Optional[str] = None
    whatsapp_message: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class MetricCreate(BaseModel):
    product_id: int
    product_name: str
    line: str
    action: str


class ContactCreate(BaseModel):
    name: str
    email: str
    phone: str
    message: Optional[str] = None
    source_page: Optional[str] = None