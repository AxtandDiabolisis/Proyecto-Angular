from database import SessionLocal, Base, engine
from models import Product

Base.metadata.create_all(bind=engine)

db = SessionLocal()

products = [
    {
        "name": "Cobija Bebe 1A",
        "category": "Infantil",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cobija-bebe.jpg",
        "description": "Producto para bebé.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cobija Bebe 1A"
    },
    {
        "name": "Cobija Estrella",
        "category": "Cama",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cobija-estrella.jpg",
        "description": "Cobija para cama.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cobija Estrella"
    },
    {
        "name": "Cobija Filix",
        "category": "Cama",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cobija-filix.jpg",
        "description": "Cobija para cama.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cobija Filix"
    },
    {
        "name": "Cobija Galleta",
        "category": "Cama",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cobija-galleta.jpg",
        "description": "Cobija para cama.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cobija Galleta"
    },
    {
        "name": "Cobija Star Ovejera",
        "category": "Cama",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cobija-star.jpg",
        "description": "Cobija para cama.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cobija Star Ovejera"
    },
    {
        "name": "Aromas",
        "category": "Sala",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-aromas.jpg",
        "description": "Producto para sala.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Aromas"
    },
    {
        "name": "Toallas",
        "category": "Bano",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-toallas.jpg",
        "description": "Toallas para baño.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Toallas"
    },
    {
        "name": "Sabana Solo Tono-Casa Luna",
        "category": "Cama",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-sabana.jpg",
        "description": "Sábana para cama.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Sabana Solo Tono-Casa Luna"
    },
    {
        "name": "Cortina Black Out",
        "category": "Sala",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cortina-blackout.jpg",
        "description": "Cortina para sala.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cortina Black Out"
    },
    {
        "name": "Cobija Termica",
        "category": "Saldos",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cobija-termica.jpg",
        "description": "Cobija térmica.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cobija Termica"
    },
    {
        "name": "Cubre Cama Infantil",
        "category": "Cama",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cubre-cama-infantil.jpg",
        "description": "Cubre cama infantil.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cubre Cama Infantil"
    },
    {
        "name": "Cubre cama",
        "category": "Saldos",
        "line": "Lenceria",
        "image": "assets/img/lency/producto-cubre-cama.jpg",
        "description": "Cubre cama.",
        "whatsapp_message": "Hola, estoy interesado en el producto: Cubre cama"
    },
    {
        "name": "Sello automatico empresarial",
        "category": "Automaticos",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-sello-automatico.jpg",
        "icon": "fa-stamp",
        "description": "Ideal para alto volumen de documentos y uso diario.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello automatico empresarial"
    },
    {
        "name": "UNIALRE MP-3F ENTINTADA",
        "category": "Automaticos",
        "line": "Sellos",
        "image": "https://drive.google.com/thumbnail?id=1aGO8JxAI0jtMUYT59p7NoeQdGaCEN8Nr&sz=w1000",
        "icon": "fa-stamp",
        "description": "Sello automatico entintado para marcacion practica y constante.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE MP-3F ENTINTADA"
    },
    {
        "name": "Sello manual personalizado",
        "category": "Manuales",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-sello-manual.jpg",
        "icon": "fa-hand",
        "description": "Opcion practica para firmas, logos y textos cortos.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello manual personalizado"
    },
    {
        "name": "Sello fechador",
        "category": "Fechadores",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-fechador.jpg",
        "icon": "fa-calendar-days",
        "description": "Fecha documentos, recibos y controles internos con rapidez.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello fechador"
    },
    {
        "name": "Tinta para sellos",
        "category": "Insumos",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-tinta.jpg",
        "icon": "fa-droplet",
        "description": "Tintas de alto rendimiento para diferentes tipos de sello.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Tinta para sellos"
    },
    {
        "name": "Sello de bolsillo",
        "category": "Automaticos",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-bolsillo.jpg",
        "icon": "fa-briefcase",
        "description": "Compacto, portable y listo para profesionales en movimiento.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello de bolsillo"
    },
    {
        "name": "Sello para logo",
        "category": "Personalizados",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-logo.jpg",
        "icon": "fa-pen-nib",
        "description": "Marca empaques, papeleria y piezas promocionales con identidad.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello para logo"
    },
    {
        "name": "Sello numerador",
        "category": "Fechadores",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-numerador.jpg",
        "icon": "fa-list-ol",
        "description": "Controla consecutivos, series y registros administrativos.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello numerador"
    },
    {
        "name": "Almohadilla para sello",
        "category": "Insumos",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-almohadilla.jpg",
        "icon": "fa-square",
        "description": "Accesorio resistente para sellos manuales de uso frecuente.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Almohadilla para sello"
    },
    {
        "name": "Sello para firma",
        "category": "Manuales",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-firma.jpg",
        "icon": "fa-signature",
        "description": "Reproduce firmas autorizadas para procesos internos.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello para firma"
    },
    {
        "name": "Sello seco o relieve",
        "category": "Personalizados",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-relieve.jpg",
        "icon": "fa-certificate",
        "description": "Acabado elegante para certificados, invitaciones y documentos.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello seco o relieve"
    },
    {
        "name": "Sello redondo automatico",
        "category": "Automaticos",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-redondo.jpg",
        "icon": "fa-circle-dot",
        "description": "Perfecto para logos, aprobaciones y marcas institucionales.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello redondo automatico"
    },
    {
        "name": "Sello manual grande",
        "category": "Manuales",
        "line": "Sellos",
        "image": "assets/img/sellos/producto-manual-grande.jpg",
        "icon": "fa-border-all",
        "description": "Formato amplio para textos, sellos contables y marcacion visible.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: Sello manual grande"
    },
    {
        "name": "Taladros y rotomartillos",
        "category": "Electricas",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-taladro.jpg",
        "icon": "fa-screwdriver-wrench",
        "description": "Equipos para perforacion, instalacion y trabajo pesado.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Taladros y rotomartillos"
    },
    {
        "name": "Llaves y copas",
        "category": "Manuales",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-llaves.jpg",
        "icon": "fa-wrench",
        "description": "Soluciones resistentes para ajuste, mantenimiento y taller.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Llaves y copas"
    },
    {
        "name": "Pinturas y acabados",
        "category": "Construccion",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-pinturas.jpg",
        "icon": "fa-paint-roller",
        "description": "Insumos para renovar muros, madera, metal y exteriores.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Pinturas y acabados"
    },
    {
        "name": "Tornilleria y fijaciones",
        "category": "Insumos",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-tornilleria.jpg",
        "icon": "fa-screwdriver",
        "description": "Tornillos, anclajes, puntillas y accesorios por medida.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Tornilleria y fijaciones"
    },
    {
        "name": "Seguridad industrial",
        "category": "Seguridad",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-seguridad.jpg",
        "icon": "fa-helmet-safety",
        "description": "Guantes, gafas, cascos y elementos para trabajar protegido.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Seguridad industrial"
    },
    {
        "name": "Electricidad y plomeria",
        "category": "Construccion",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-electricidad.jpg",
        "icon": "fa-plug",
        "description": "Materiales para reparaciones rapidas y proyectos completos.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Electricidad y plomeria"
    },
    {
        "name": "Martillos y alicates",
        "category": "Manuales",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-martillos.jpg",
        "icon": "fa-hammer",
        "description": "Herramientas basicas para instalacion, ajuste y reparacion.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Martillos y alicates"
    },
    {
        "name": "Pulidoras y sierras",
        "category": "Electricas",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-pulidoras.jpg",
        "icon": "fa-gear",
        "description": "Equipos para corte, desbaste y acabados en obra.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Pulidoras y sierras"
    },
    {
        "name": "Brocas y discos",
        "category": "Insumos",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-brocas.jpg",
        "icon": "fa-compact-disc",
        "description": "Consumibles para perforar, cortar y pulir diferentes superficies.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Brocas y discos"
    },
    {
        "name": "Guantes y gafas",
        "category": "Seguridad",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-guantes.jpg",
        "icon": "fa-shield-halved",
        "description": "Proteccion personal para trabajos de taller y construccion.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Guantes y gafas"
    },
    {
        "name": "Destornilladores",
        "category": "Manuales",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-destornilladores.jpg",
        "icon": "fa-screwdriver",
        "description": "Juegos practicos para ensamble, mantenimiento y hogar.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Destornilladores"
    },
    {
        "name": "Extensiones y multitomas",
        "category": "Electricas",
        "line": "Ferreteria",
        "image": "assets/img/ferreteria/producto-extensiones.jpg",
        "icon": "fa-plug-circle-bolt",
        "description": "Accesorios electricos para obra, taller y oficina.",
        "whatsapp_message": "Hola, estoy interesado en productos de ferreteria: Extensiones y multitomas"
    }
]

for item in products:
    exists = db.query(Product).filter(
        Product.name == item["name"],
        Product.line == item["line"]
    ).first()

    if not exists:
        db.add(Product(**item))

db.commit()
db.close()

print("Productos iniciales insertados correctamente.")
