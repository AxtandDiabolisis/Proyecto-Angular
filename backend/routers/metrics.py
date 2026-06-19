from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import ProductMetric
from schemas import MetricCreate

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"]
)


@router.post("/track")
def track_metric(
    metric: MetricCreate,
    db: Session = Depends(get_db)
):
    new_metric = ProductMetric(**metric.model_dump())
    db.add(new_metric)
    db.commit()
    db.refresh(new_metric)

    return {
        "message": "Métrica guardada correctamente",
        "metric_id": new_metric.id
    }


@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    metrics = db.query(ProductMetric).all()

    total_clicks = len(metrics)
    total_whatsapp = len([m for m in metrics if m.action == "whatsapp"])

    return {
        "totalClicks": total_clicks,
        "totalWhatsapp": total_whatsapp,
        "records": [
            {
                "id": m.id,
                "productName": m.product_name,
                "line": m.line,
                "action": m.action,
                "createdAt": m.created_at
            }
            for m in metrics
        ]
    }