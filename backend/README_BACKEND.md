# Backend FastAPI UNIALRE

API para productos, métricas y contacto del proyecto Angular UNIALRE.

## Crear entorno virtual

```bash
python -m venv venv
```

## Activar entorno virtual en Windows

```bash
venv\Scripts\activate
```

## Instalar dependencias

```bash
pip install -r requirements.txt
```

## Configurar autenticacion

Antes de iniciar la API, crea `backend/.env` a partir de `.env.example` y reemplaza
`JWT_SECRET_KEY` por una clave aleatoria de al menos 64 caracteres. En Windows puedes
generarla con:

```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```

Luego crea la cuenta administradora desde la raiz del proyecto:

```powershell
npm run create:admin
```

El comando solicita el nombre, correo y contrasena sin guardarlos en el codigo.
El registro desde la pagina siempre crea cuentas de usuario; solo la cuenta creada
por este comando puede abrir `/metricas`.

## Ejecutar seed

```bash
python seed.py
```

## Levantar API

```bash
uvicorn main:app --reload
```

## URL API

```
http://127.0.0.1:8000
```

## Swagger

```
http://127.0.0.1:8000/docs
```

## Endpoints

### Products
- `GET /products/` - Listar productos (filtros: `line`, `category`)
- `POST /products/` - Crear producto
- `GET /products/categories` - Listar categorías con conteo (filtro: `line`)

### Metrics
- `POST /metrics/track` - Registrar métrica
- `GET /metrics/summary` - Resumen de métricas

### Accounts
- `POST /auth/register` - Crear perfil de usuario
- `POST /auth/login` - Iniciar sesiÃ³n
- `GET /auth/me` - Consultar perfil de la sesiÃ³n
- `GET /products/reviews/summary` - Resumen de opiniones (solo administrador)

Los resÃºmenes de mÃ©tricas y opiniones requieren una sesiÃ³n de administrador.
Las sesiones Bearer vencen en 12 horas; usa HTTPS en producciÃ³n y no publiques
JWT_SECRET_KEY.

### Contact
- `POST /contact/` - Enviar mensaje de contacto
