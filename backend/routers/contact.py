from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import ContactMessage
from schemas import ContactCreate

router = APIRouter(
    prefix="/contact",
    tags=["Contact"]
)


@router.post("/")
def create_contact_message(
    contact: ContactCreate,
    db: Session = Depends(get_db)
):
    new_contact = ContactMessage(**contact.model_dump())
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)

    return {
        "message": "Mensaje guardado correctamente",
        "contact_id": new_contact.id
    }