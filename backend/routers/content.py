import base64
import binascii
import secrets
from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from auth import require_admin
from database import get_db
from models import SiteContent, User
from schemas import ImageUpload, SiteContentUpdate

router = APIRouter(prefix="/content", tags=["Site content"])
UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
ALLOWED_CONTENT = {
    "image/jpeg": (".jpg", lambda data: data.startswith(b"\xff\xd8\xff")),
    "image/png": (".png", lambda data: data.startswith(b"\x89PNG\r\n\x1a\n")),
    "image/webp": (".webp", lambda data: len(data) > 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP"),
}
EDITABLE_KEYS = {"homepage", "tufting_products"}


@router.get("/{key}")
def get_site_content(key: str, db: Session = Depends(get_db)):
    if key not in EDITABLE_KEYS:
        raise HTTPException(status_code=404, detail="Contenido no encontrado")
    item = db.query(SiteContent).filter(SiteContent.key == key).first()
    if item is None:
        return {"key": key, "value": None, "updated_at": None}
    return {"key": item.key, "value": item.value, "updated_at": item.updated_at}


@router.put("/{key}")
def update_site_content(
    key: str,
    content: SiteContentUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin),
):
    if key not in EDITABLE_KEYS:
        raise HTTPException(status_code=404, detail="Contenido no editable")
    item = db.query(SiteContent).filter(SiteContent.key == key).first()
    if item is None:
        item = SiteContent(key=key, value=content.value, updated_by=admin.id)
        db.add(item)
    else:
        item.value = content.value
        item.updated_by = admin.id
        item.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(item)
    return {"key": item.key, "value": item.value, "updated_at": item.updated_at}


@router.post("/upload-image")
def upload_image(
    upload: ImageUpload,
    request: Request,
    _admin: User = Depends(require_admin),
):
    content_type = upload.content_type.lower()
    if content_type not in ALLOWED_CONTENT:
        raise HTTPException(status_code=415, detail="Usa una imagen JPG, PNG o WebP")
    try:
        image_data = base64.b64decode(upload.data_base64, validate=True)
    except (binascii.Error, ValueError):
        raise HTTPException(status_code=422, detail="El archivo de imagen no es valido")
    if not image_data or len(image_data) > 4 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="La imagen debe pesar 4 MB o menos")
    extension, signature_matches = ALLOWED_CONTENT[content_type]
    if not signature_matches(image_data):
        raise HTTPException(status_code=415, detail="El contenido del archivo no coincide con su formato")

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    filename = secrets.token_hex(16) + extension
    (UPLOAD_DIR / filename).write_bytes(image_data)
    image_url = str(request.base_url).rstrip("/") + "/uploads/" + filename
    return JSONResponse({"image_url": image_url}, status_code=201)
