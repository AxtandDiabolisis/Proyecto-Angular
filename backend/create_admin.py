from getpass import getpass

from database import Base, SessionLocal, engine
from auth import hash_password
from models import User


def main():
    Base.metadata.create_all(bind=engine)
    name = input("Nombre del administrador: ").strip()
    email = input("Correo del administrador: ").strip().lower()
    password = getpass("Contrasena (minimo 12 caracteres): ")
    confirmation = getpass("Confirma la contrasena: ")

    if len(name) < 2 or "@" not in email:
        raise SystemExit("Ingresa un nombre y un correo validos.")
    if len(password) < 12:
        raise SystemExit("La contrasena debe tener al menos 12 caracteres.")
    if password != confirmation:
        raise SystemExit("Las contrasenas no coinciden.")

    with SessionLocal() as db:
        if db.query(User).filter(User.email == email).first():
            raise SystemExit("Ya existe una cuenta con ese correo.")
        db.add(User(name=name, email=email, password_hash=hash_password(password), role="admin", is_active=True))
        db.commit()

    print("Administrador creado. Inicia sesion desde /cuenta.")


if __name__ == "__main__":
    main()
