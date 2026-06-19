from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers import products, metrics, contact

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="UNIALRE API",
    description="API para productos, métricas y contacto del proyecto Angular UNIALRE",
    version="1.0.0"
)

origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200"
]

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


@app.get("/")
def root():
    return {
        "message": "API UNIALRE funcionando correctamente"
    }