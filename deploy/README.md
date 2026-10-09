# Despliegue con Docker

La configuracion publica Angular por HTTPS con Caddy y enruta `/api` y `/uploads` hacia FastAPI. La API no publica un puerto al host. SQLite, imagenes y certificados usan volumenes persistentes.

## Requisitos

- Un servidor Linux con Docker Engine y Docker Compose v2.
- Un dominio con DNS A/AAAA apuntando al servidor y los puertos 80 y 443 accesibles desde internet.

## Preparar secretos y dominio

Desde la raiz del repositorio en el servidor, crea `.env` a partir de `.env.example` y escribe el dominio real y un correo para el certificado TLS. Luego genera una clave JWT independiente de la usada en desarrollo:

```bash
cp .env.example .env
# Edita DOMAIN y ACME_EMAIL con los valores reales antes de continuar.
install -d -m 700 secrets
python3 -c "import secrets; from pathlib import Path; p=Path('secrets/jwt_secret'); p.write_text(secrets.token_hex(32), encoding='ascii'); p.chmod(0o600)"
```

`.env` y `secrets/jwt_secret` estan excluidos de Git y del contexto Docker. No copies la clave local de `backend/.env` al entorno en linea.

## Levantar el sitio

```bash
docker compose up -d --build
docker compose exec api python create_admin.py
docker compose logs -f caddy api
```

Caddy obtiene y renueva el certificado automaticamente cuando el dominio resuelve al servidor y los puertos requeridos estan abiertos. La base nueva carga el catalogo desde `backend/seed.py`, sin copiar la cuenta ni las metricas de la base local. Crea el administrador dentro del contenedor una vez levantado.

Los volumenes `database`, `uploads`, `caddy_data` y `caddy_config` sobreviven a `docker compose down`. **No uses `docker compose down -v`** salvo que realmente quieras borrar esos datos.

## Datos y operacion

La base y las fotos quedan persistentes en volumenes Docker, pero deben respaldarse periodicamente fuera del servidor y cifrarse. La configuracion actual esta pensada para una sola instancia de API con SQLite; para varias instancias o mayor concurrencia, migra a PostgreSQL y almacenamiento de objetos.

Si este repositorio o su historial remoto ya expuso `backend/unialre.db`, cambia la contrasena de la cuenta que se uso antes y rota cualquier secreto que hubiera sido compartido. Retirar el archivo del commit actual no elimina copias de commits antiguos.
