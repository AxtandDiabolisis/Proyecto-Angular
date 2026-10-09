from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import os

from database import Base, engine, ensure_product_price_column
from routers import products, metrics, contact, reviews, auth, content

Base.metadata.create_all(bind=engine)
ensure_product_price_column()

app = FastAPI(
    title="UNIALRE API",
    description="API para productos, métricas y contacto del proyecto Angular UNIALRE",
    version="1.0.0"
)

origins = [origin.strip() for origin in os.getenv(
    "FRONTEND_ORIGINS", "http://localhost:4200,http://127.0.0.1:4200"
).split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(metrics.router)
app.include_router(contact.router)
app.include_router(reviews.router)
app.include_router(auth.router)
app.include_router(content.router)
app.mount("/uploads", StaticFiles(directory=Path(__file__).parent / "uploads", check_dir=False), name="uploads")


@app.get("/")
def root():
    return {
        "message": "API UNIALRE funcionando correctamente"
    }


@app.get("/health")
def health():
    return {"status": "ok"}
