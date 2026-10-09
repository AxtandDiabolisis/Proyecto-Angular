import os

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./unialre.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def ensure_product_price_column():
    if engine.dialect.name != "sqlite":
        return
    inspector = inspect(engine)
    if "products" not in inspector.get_table_names():
        return
    if "price" not in {column["name"] for column in inspector.get_columns("products")}:
        with engine.begin() as connection:
            connection.execute(text("ALTER TABLE products ADD COLUMN price VARCHAR(100)"))


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
