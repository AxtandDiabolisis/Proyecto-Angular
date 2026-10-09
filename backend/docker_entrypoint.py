import os
import subprocess
import sys

from database import Base, SessionLocal, engine, ensure_product_price_column
from models import Product

Base.metadata.create_all(bind=engine)
ensure_product_price_column()

with SessionLocal() as db:
    catalog_is_empty = db.query(Product.id).first() is None

if catalog_is_empty:
    subprocess.run([sys.executable, "seed.py"], check=True)

os.execvp(
    "uvicorn",
    ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips=*"],
)
