from sqlalchemy import Boolean, Column, Integer, String, DateTime, JSON
from datetime import datetime

from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    line = Column(String(100), nullable=False)
    image = Column(String(300), nullable=True)
    icon = Column(String(100), nullable=True)
    description = Column(String(500), nullable=True)
    price = Column(String(100), nullable=True)
    whatsapp_message = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ProductMetric(Base):
    __tablename__ = "product_metrics"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, nullable=False)
    product_name = Column(String(200), nullable=False)
    line = Column(String(100), nullable=False)
    action = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    message = Column(String(1000), nullable=True)
    source_page = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ProductReview(Base):
    __tablename__ = "product_reviews"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, nullable=False, index=True)
    product_line = Column(String(100), nullable=False, index=True)
    product_name = Column(String(200), nullable=False)
    author = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(String(1000), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(254), nullable=False, unique=True, index=True)
    password_hash = Column(String(500), nullable=False)
    role = Column(String(20), nullable=False, default="user")
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class SiteContent(Base):
    __tablename__ = "site_content"

    key = Column(String(80), primary_key=True)
    value = Column(JSON, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    updated_by = Column(Integer, nullable=False)
