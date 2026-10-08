from pydantic import BaseModel, EmailStr, Field
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


class ProductReviewCreate(BaseModel):
    product_name: str = Field(min_length=1, max_length=200)
    author: str = Field(min_length=1, max_length=100)
    rating: int = Field(ge=1, le=5)
    comment: str = Field(min_length=1, max_length=1000)


class ProductReviewResponse(BaseModel):
    id: int
    product_id: int
    product_line: str
    product_name: str
    author: str
    rating: int
    comment: str
    created_at: datetime

    class Config:
        from_attributes = True


class UserRegister(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=12, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class AuthSession(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=200)
    image: Optional[str] = Field(default=None, max_length=1000)
    description: Optional[str] = Field(default=None, max_length=2000)


class SiteContentUpdate(BaseModel):
    value: dict


class ImageUpload(BaseModel):
    content_type: str
    data_base64: str = Field(max_length=5_600_000)
