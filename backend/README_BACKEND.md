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

### Contact
- `POST /contact/` - Enviar mensaje de contacto