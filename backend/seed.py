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
        "name": "UNIALRE S-9414",
        "category": "Arbol de sellos",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1XSHKzzajwNPxTlm4LkWKuqj2D7gVplh7=w1000",
        "icon": "fa-stamp",
        "description": "Referencia de arbol de sellos UNIALRE S-9414.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE S-9414"
    },
    {
        "name": "UNIALRE S-9610",
        "category": "Arbol de sellos",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1NkSj6kyQPF_GGPDs1udvxxgJQSv7T-Ac=w1000",
        "icon": "fa-stamp",
        "description": "Referencia de arbol de sellos UNIALRE S-9610.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE S-9610"
    },
    {
        "name": "UNIALRE MP-3F ENTINTADA",
        "category": "Almohadillas",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1aGO8JxAI0jtMUYT59p7NoeQdGaCEN8Nr=w1000",
        "icon": "fa-stamp",
        "description": "Almohadilla entintada para marcacion practica y constante.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE MP-3F ENTINTADA"
    },
    {
        "name": "UNIALRE MP-3F SIN TINTA",
        "category": "Almohadillas",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/14QSTtM9Uzqh67_ojRB7M5ovez7qqh6zt=w1000",
        "icon": "fa-stamp",
        "description": "Almohadilla sin tinta para sellos UNIALRE MP-3F.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE MP-3F SIN TINTA"
    },
    {
        "name": "UNIALRE S-1F, S-2F, S-3F ENTINTADA",
        "category": "Almohadillas",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1WNHrNvIvZvtX3AChRwVdqhaxC6CNMKt_=w1000",
        "icon": "fa-stamp",
        "description": "Almohadilla entintada compatible con referencias S-1F, S-2F y S-3F.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE S-1F, S-2F, S-3F ENTINTADA"
    },
    {
        "name": "UNIALRE S-1F, S-2F, S-3F SIN TINTA",
        "category": "Almohadillas",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1hNb7YuXUHb8Y0FHwhMCBPB7e5-wfksjo=w1000",
        "icon": "fa-stamp",
        "description": "Almohadilla sin tinta compatible con referencias S-1F, S-2F y S-3F.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE S-1F, S-2F, S-3F SIN TINTA"
    },
    {
        "name": "UNIALRE S-4F, S-5F ENTINTADA",
        "category": "Almohadillas",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1qFMOqFe4KDenjDSaDZVOnaKCxynjoaAd=w1000",
        "icon": "fa-stamp",
        "description": "Almohadilla entintada compatible con referencias S-4F y S-5F.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE S-4F, S-5F ENTINTADA"
    },
    {
        "name": "UNIALRE S-4F, S-5F SIN TINTA",
        "category": "Almohadillas",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1DLkFczuBibUmezl-X0-_e1-PgapxDXV4=w1000",
        "icon": "fa-stamp",
        "description": "Almohadilla sin tinta compatible con referencias S-4F y S-5F.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE S-4F, S-5F SIN TINTA"
    },
    {
        "name": "UNIALRE SM-1 DACTILAR",
        "category": "Almohadillas",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1Sr-gErL1W2MhqcYXZU9r1xexqEG9zDii=w1000",
        "icon": "fa-fingerprint",
        "description": "Almohadilla dactilar SM-1 para marcacion de huella.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE SM-1 DACTILAR"
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

products.extend([
    {
        "name": "UNIALRE HANDY S-722 AGUAMARINA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1M1LPjbH6vr-5yULAEVJ1YrhP4fTSNVv2=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color aguamarina.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 AGUAMARINA"
    },
    {
        "name": "UNIALRE HANDY S-722 AMATISTA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1v0wfj2zrO5D-OODYUm7Lqd8GtG4qYQzm=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color amatista.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 AMATISTA"
    },
    {
        "name": "UNIALRE HANDY S-722 AZUL",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1xovNNZBG5p9W_e4ivf9-HMsQ3J2k04jr=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color azul.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 AZUL"
    },
    {
        "name": "UNIALRE HANDY S-722 AZUL CIELO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1RxsUHhwt_Sw1Eu2GK-KelyujU7sy2mbB=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color azul cielo.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 AZUL CIELO"
    },
    {
        "name": "UNIALRE HANDY S-722 DORADO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/12qcyPeP-BSfK4hnO64YdS9cwwDYE9nQ_=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color dorado.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 DORADO"
    },
    {
        "name": "UNIALRE HANDY S-722 FUCCIA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/11-74utilBZV1ICyGOASQhejdrx1SEoT3=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color fuccia.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 FUCCIA"
    },
    {
        "name": "UNIALRE HANDY S-722 NEGRO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1Sep7Lm68eVABZLWhLo_kU-njdK48doRw=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color negro.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 NEGRO"
    },
    {
        "name": "UNIALRE HANDY S-722 PERIDOT",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1eutfMRj4jacEwrNJCkHAE2XwCiNtMlIY=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color peridot.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 PERIDOT"
    },
    {
        "name": "UNIALRE HANDY S-722 PLATEADO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1iybjR2zvJHT_7GoaxKaP1nbgDHI4j9M8=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color plateado.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 PLATEADO"
    },
    {
        "name": "UNIALRE HANDY S-722 ROSE",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1qxdyFCIvi0XJDDcrwdQMAK_tgJk-7Wdf=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color rose.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 ROSE"
    },
    {
        "name": "UNIALRE HANDY S-722 ROSADO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1Wx-Y21u80SD3tlW2zU2MT1Nfx7jVgPDv=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color rosado.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 ROSADO"
    },
    {
        "name": "UNIALRE HANDY S-722 RUBI",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/15I_jHV21jl6oVxRhLizs2CikznTiohsN=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color rubi.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 RUBI"
    },
    {
        "name": "UNIALRE HANDY S-722 TOPAZ",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1gXQxC39rwliS7VZ0aM05_FsZEItegTWn=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color topaz.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 TOPAZ"
    },
    {
        "name": "UNIALRE HANDY S-722 VERDE",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1X3dIV3JD7QgOzLHJaugwA07u79---wmA=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color verde.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 VERDE"
    },
    {
        "name": "UNIALRE HANDY S-722 VIOLETA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1kViluYNLajMXZLGyChsSlfFujaKwflxk=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-722 color violeta.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-722 VIOLETA"
    },
    {
        "name": "UNIALRE HANDY S-723 AGUAMARINA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1IA9FYVBdIvrMkyIZMXbNVD8sJaBduuF4=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color aguamarina.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 AGUAMARINA"
    },
    {
        "name": "UNIALRE HANDY S-723 AMATISTA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1xb5zEhRe7obuO7EDsWdcXzzq6c9jGr6M=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color amatista.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 AMATISTA"
    },
    {
        "name": "UNIALRE HANDY S-723 AZUL",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1kTNu7-Y8y0X_DzuowE9P9NBsUhEM6lzj=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color azul.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 AZUL"
    },
    {
        "name": "UNIALRE HANDY S-723 DORADO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/15Az0DhX6zx66kwMt83pIzc-23ARzo8Yz=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color dorado.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 DORADO"
    },
    {
        "name": "UNIALRE HANDY S-723 FUCCIA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1AXbnBSrVayZm3vgpU8g3_mapbZoOkODy=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color fuccia.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 FUCCIA"
    },
    {
        "name": "UNIALRE HANDY S-723 NEGRO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/12sPnyfAOz_RPbSBBZ1F-7KgNRyEEELVf=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color negro.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 NEGRO"
    },
    {
        "name": "UNIALRE HANDY S-723 PLATEADO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1sZHygqQf8S5T70Qr-sK2H-vM97cfQtJr=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color plateado.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 PLATEADO"
    },
    {
        "name": "UNIALRE HANDY S-723 ROSADO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1WN_a0xX7-ZKmpdAbr1IhsQbdbSon9oVS=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color rosado.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 ROSADO"
    },
    {
        "name": "UNIALRE HANDY S-723 RUBI",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1et6odeZ92uqbKD9tUsFSSWXfB7v6ixYq=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color rubi.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 RUBI"
    },
    {
        "name": "UNIALRE HANDY S-723 VERDE",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1VO9sS1TeUs-_RuIbfxHDD6hcuHlpII8I=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color verde.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 VERDE"
    },
    {
        "name": "UNIALRE HANDY S-723 VIOLETA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/14AHhVZuAdfcIRHZR7nYc3ZN-yFtuVYVo=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-723 color violeta.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-723 VIOLETA"
    },
    {
        "name": "UNIALRE HANDY S-724 AMATISTA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1IbzN-USxMEBiqe0m73HkvRw8rJBLDz9b=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-724 color amatista.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-724 AMATISTA"
    },
    {
        "name": "UNIALRE HANDY S-724 FUCCIA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1Y0tR1kYV4-XtR8Ybdane_N0GW_OA0MB0=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-724 color fuccia.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-724 FUCCIA"
    },
    {
        "name": "UNIALRE HANDY S-724 NEGRO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/18mW5C28YPglSn8MbD9nhc0PQw3MkV7-M=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-724 color negro.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-724 NEGRO"
    },
    {
        "name": "UNIALRE HANDY S-724 ROSADO",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1CtbaUx37kz8kd2GAKu_GY3JnoVO26rHr=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-724 color rosado.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-724 ROSADO"
    },
    {
        "name": "UNIALRE HANDY S-724 VERDE",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1dV_lslOnWR-kRSBQMVNsK2IgGFwUWuxa=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-724 color verde.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-724 VERDE"
    },
    {
        "name": "UNIALRE HANDY S-724 VIOLETA",
        "category": "De bolsillo",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1AmZ0aN0PCCAE_31l-wAQI1YCVqUOS6rD=w1000",
        "icon": "fa-briefcase",
        "description": "Sello de bolsillo Handy S-724 color violeta.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE HANDY S-724 VIOLETA"
    }
])

products.extend([
    {
        "name": "UNIALRE SELLO DIDACTICO SHINY A-1",
        "category": "Didacticos",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1aefYHjG71AFOpIAI7a0P57DWg7tCjJVS=w1000",
        "icon": "fa-graduation-cap",
        "description": "Sello didactico Shiny A-1 para actividades educativas y marcacion escolar.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE SELLO DIDACTICO SHINY A-1"
    },
    {
        "name": "UNIALRE SELLO DIDACTICO SHINY A-2",
        "category": "Didacticos",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1u0wUuQQclLiFdD-NTRoCYTw49yMGc0wr=w1000",
        "icon": "fa-graduation-cap",
        "description": "Sello didactico Shiny A-2 para actividades educativas y marcacion escolar.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE SELLO DIDACTICO SHINY A-2"
    },
    {
        "name": "UNIALRE SELLO DIDACTICO SHINY A-3",
        "category": "Didacticos",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1evgotODSPfudgBfv1b7RS23-lbcZadxM=w1000",
        "icon": "fa-graduation-cap",
        "description": "Sello didactico Shiny A-3 para actividades educativas y marcacion escolar.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE SELLO DIDACTICO SHINY A-3"
    }
])

products.extend([
    {
        "name": "UNIALRE CUCHARA PARA LACRE WSP-01",
        "category": "Lacre",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1WgktRV2lIUbykMGVMkYJZLEK8LzWrmUO=w1000",
        "icon": "fa-spoon",
        "description": "Cuchara para derretir lacre y preparar sellados personalizados.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE CUCHARA PARA LACRE WSP-01"
    },
    {
        "name": "UNIALRE SELLO PARA LACRE WS-01",
        "category": "Lacre",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1Sa7cN1hsNzM8p-WjiCDca_pm6atu9EQz=w1000",
        "icon": "fa-stamp",
        "description": "Sello para lacre WS-01 ideal para invitaciones, empaques y detalles personalizados.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE SELLO PARA LACRE WS-01"
    }
])

products.extend([
    {
        "name": "UNIALRE ED-6 SELLO SECO 25x50mm (ESCRITORIO)",
        "category": "Sello seco",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1vbbIe-0YBB_htG43Hck5v03VWD_RXw_e=w1000",
        "icon": "fa-certificate",
        "description": "Sello seco de escritorio ED-6 en tamano 25x50mm.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE ED-6 SELLO SECO 25x50mm (ESCRITORIO)"
    },
    {
        "name": "UNIALRE ED-5 SELLO SECO DE 41MM (ESCRITORIO)",
        "category": "Sello seco",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1ka8MQsubpnRlVJZG_1u9ZlIXYKIWCXwb=w1000",
        "icon": "fa-certificate",
        "description": "Sello seco de escritorio ED-5 de 41mm.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE ED-5 SELLO SECO DE 41MM (ESCRITORIO)"
    },
    {
        "name": "UNIALRE EM-6 SELLO SECO 25x50mm (MANUAL)",
        "category": "Sello seco",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1AnMZMY-MZGeD-be11DIlhPzPWJ8PMqnj=w1000",
        "icon": "fa-certificate",
        "description": "Sello seco manual EM-6 en tamano 25x50mm.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE EM-6 SELLO SECO 25x50mm (MANUAL)"
    },
    {
        "name": "UNIALRE EM-5 SELLO SECO DE 41MM (MANUAL)",
        "category": "Sello seco",
        "line": "Sellos",
        "image": "https://lh3.googleusercontent.com/d/1AHcr9y5Z8xIqz1k76c8WfuoTjV9Kdp5P=w1000",
        "icon": "fa-certificate",
        "description": "Sello seco manual EM-5 de 41mm.",
        "whatsapp_message": "Hola, estoy interesado en el producto de sellos: UNIALRE EM-5 SELLO SECO DE 41MM (MANUAL)"
    }
])

printer_products_data = [
    ("UNIALRE S-844 VIOLETA", "1SXlVE2K8CieLpZ-8FFGFLB3RaL0q7ebT", "S-844 color violeta"),
    ("UNIALRE S-844 VERDE", "1tklqVRmEnpRyZMjpWD41IhYZ3a9mY8qV", "S-844 color verde"),
    ("UNIALRE S-844 TOPAZ", "1g5eoApwaIKEiB7ab_TjXRQQGSGcZPEAf", "S-844 color topaz"),
    ("UNIALRE S-844 RUBI", "1GDg299AnSxoiqIOP-UGUSndaXH0yQqXT", "S-844 color rubi"),
    ("UNIALRE S-844 ROJO", "167yq38YQecjtE0GtBqkvkpLgJzizWvvo", "S-844 color rojo"),
    ("UNIALRE S-844 PERIDOT", "10diXC6zrl4AMLAWajYo4KVXZ3HF7Eq3H", "S-844 color peridot"),
    ("UNIALRE S-844 NEGRO", "1pEoc8Dl1yClQWHe4jFAUCo20ApQQ6DaU", "S-844 color negro"),
    ("UNIALRE S-844 FUCCIA", "1oJtBcQovHW9QkM8xlb33Iuz9vtYxivxp", "S-844 color fuccia"),
    ("UNIALRE S-844 BLANCO", "10F6VVHrjz8X7M7ERDpw_mSjIFco3LuWb", "S-844 color blanco"),
    ("UNIALRE S-844 AZUL", "1WwzJTp4KoREI3upF3JyPtGor-6pPpgEd", "S-844 color azul"),
    ("UNIALRE S-844 AMATISTA", "13u1AygaM5V5oehQcRXPYdZc5aBxgWwfW", "S-844 color amatista"),
    ("UNIALRE S-844 AMARILLO", "1_kkDHONPn2-K3AcKuK1ewtBwRI3UClKb", "S-844 color amarillo"),
    ("UNIALRE S-844 AQUA", "1HkMtJsWrOpd813XdYD7q2EJaEnSAfgBX", "S-844 color aqua"),
    ("UNIALRE S-845 ROJO", "18AoIP5pPmtUrg24fu3pN-aq968Gh6xXF", "S-845 color rojo"),
    ("UNIALRE S-845 NEGRO", "1cCoMMcvzR49KVoY5Uv2pxuyTesRGDhFN", "S-845 color negro"),
    ("UNIALRE S-845 AZUL", "13TTnwgFeIDV8JrNCuln_D6jipdXaJ1cw", "S-845 color azul"),
    ("UNIALRE S-842 SHINY TODOS", "1-fqevO_S2OdBuC-CFtYvYfkAJYL0CdzW", "S-842 todos los colores"),
    ("UNIALRE S-842 TOPAZ", "1FNEsxTu6EeYED1ppJbGKvKMzRNapor-m", "S-842 color topaz"),
    ("UNIALRE S-842 VIOLETA", "1yiW9sHxy5IRR9BKPCHZdUhEpbkAPYNsl", "S-842 color violeta"),
    ("UNIALRE S-842 VERDE", "1vgdW9XJI85CHyd4g68SvRLH4tvM_X-og", "S-842 color verde"),
    ("UNIALRE S-842 RUBY", "1gpxRz9Hs1k5Zg9tQ-YQq1GatiAKECXsE", "S-842 color ruby"),
    ("UNIALRE S-842 ROSADO", "1RQ3rM979Hd3UJ_ah5VFZd6kHvnWjbKCn", "S-842 color rosado"),
    ("UNIALRE S-842 ROJO", "1lY6Iott995U8n62Timbu4g9ZvF5mqyNs", "S-842 color rojo"),
    ("UNIALRE S-842 PERIDOT", "1Zf__jPlIBCXFnaXwTZXtppTY7kkuuWxC", "S-842 color peridot"),
    ("UNIALRE S-842 OLIVA", "1-MNHlaSLNm7lvajfjzhj_XnSKG68uxzP", "S-842 color oliva"),
    ("UNIALRE S-842 NEGRO", "1-JOlicEFPaJVLP7PF7BM3HHvOq9GI0B7", "S-842 color negro"),
    ("UNIALRE S-842 FUCCIA", "1Z4gQ9kjh5uOZzooXntLQ32Vr4AK7JTeG", "S-842 color fuccia"),
    ("UNIALRE S-842 CELADON", "1k-FEYtI6dhVga5RrDEq6lASqhYHBWvtf", "S-842 color celadon"),
    ("UNIALRE S-842 BLANCO", "1QmzIJjrh208wZRGHJ-vxPDNVbZica98S", "S-842 color blanco"),
    ("UNIALRE S-842 AZUL CIELO", "1Uxtdds_Y5Oiya4xK7aZGhOyhYJdYmsSq", "S-842 color azul cielo"),
    ("UNIALRE S-842 AZUL AGUA", "1y0sMTq-v1vnmxocrVBANGCyXQUarlMMv", "S-842 color azul agua"),
    ("UNIALRE S-842 AZUL", "1hchW6ehL-GSY54KmHMiDvnY0bbg--UUf", "S-842 color azul"),
    ("UNIALRE S-842 AMATISTA", "1GnYXa_J7zpL49zbIXZtHT_V3xCwae4vV", "S-842 color amatista"),
    ("UNIALRE S-842 AMARILLO", "1Xf-XjqSHWiAbPsvc6TcruB1tKIW0FZca", "S-842 color amarillo"),
    ("UNIALRE S-842 AQUA", "13yjWQoK1RRpsmfUEV_hF9gcyGlAqC6pk", "S-842 color aqua"),
    ("UNIALRE S-843 SHINY TODOS", "1jvEt6hnh1qYoB7pmh2MbTZcvHvXsrxSN", "S-843 todos los colores"),
    ("UNIALRE S-843 VIOLETA", "1Tx5M7DepJIIIjc-cu8Tzmqmf5ymFrtnZ", "S-843 color violeta"),
    ("UNIALRE S-843 VERDE", "16PqWNqYdQUWJAh6rrsRj49Hwgo1t--eb", "S-843 color verde"),
    ("UNIALRE S-843 TOPAZ", "1527d7anQMfVr07TVxcUcXdTAnLVGYYaa", "S-843 color topaz"),
    ("UNIALRE S-843 RUBI", "1GSOR7mWVE9BZ53hwrRuHl2H5s-2jWGnP", "S-843 color rubi"),
    ("UNIALRE S-843 ROJO", "1ljET-VHqnlxgT_HOQ_CT_nZVyyddVxJB", "S-843 color rojo"),
    ("UNIALRE S-843 PERIDOT", "1Xi3MhmE1oLukCFjn6SKfAznHVfYeORLo", "S-843 color peridot"),
    ("UNIALRE S-843 OLIVA", "1vpmQgeMiDAPSz_-N6NuSagvNGCRIeoEW", "S-843 color oliva"),
    ("UNIALRE S-843 NEGRO", "1wddDstwBdCqU8lKFe6N-CV5D3h_pTORL", "S-843 color negro"),
    ("UNIALRE S-843 FUCCIA", "16uwwpTtukHz7OXinkGfwpd5egR-fBxag", "S-843 color fuccia"),
    ("UNIALRE S-843 CELADON", "1Oa2Fl8Y0NYZp5wDuDhq69JRf8xZqEnxU", "S-843 color celadon"),
    ("UNIALRE S-843 BLANCO", "1CcXL32LWLP7NfyhqqDCB-Gq__V0iOFok", "S-843 color blanco"),
    ("UNIALRE S-843 AZUL", "1AQScaClm0BXeVHX2JkDdh253bewcN8mU", "S-843 color azul"),
    ("UNIALRE S-843 AMATISTA", "1sTZ0CxaxNdvARObRs-T8G0oaXFcOFjUZ", "S-843 color amatista"),
    ("UNIALRE S-843 AMARILLO", "1qRRlqUnlceLdN8_4j5dsDdZ3sfIbg5Eh", "S-843 color amarillo"),
    ("UNIALRE S-843 AQUA", "1TFX7uRBYIl4W-ABsY2aT5_dce2xFFCpd", "S-843 color aqua"),
    ("UNIALRE S-841 SHINY TODOS", "105aPgMT-9Cc8YmkAjPqHOj3O69EBE49L", "S-841 todos los colores"),
    ("UNIALRE S-841 VIOLETA", "1WVi5yocfUPU759u01qjSVEj6h3POMSoS", "S-841 color violeta"),
    ("UNIALRE S-841 VERDE", "1_vDnEhe-Su0JDqCVqE7nEq_t58I9TvPa", "S-841 color verde"),
    ("UNIALRE S-841 TOPAZ", "1MeSP-K0TLL8bv-WwnoQRve7BPMUfZpNA", "S-841 color topaz"),
    ("UNIALRE S-841 RUBI", "1Q5vTFnOH5S8CmnTz1TKUuhMaAlDmsUqH", "S-841 color rubi"),
    ("UNIALRE S-841 PERIDOT", "1SUmkOaN0T1Xasmq4sp13KLHGA2uQFYZs", "S-841 color peridot"),
    ("UNIALRE S-841 GRIS HUMO", "1ECwv9oRL__JmcypLKdY93KLh5d79cc36", "S-841 color gris humo"),
    ("UNIALRE S-841 FUCCIA", "1dtMjlGtj9mNY4Dj5Tn2lw0c-BKy9jJPa", "S-841 color fuccia"),
    ("UNIALRE S-841 BLANCO", "1bpycK70NIxRZEniaigoFDlMIf23Nu9vK", "S-841 color blanco"),
    ("UNIALRE S-841 AMATISTA", "1drSMhoQuAJRTvCzRcLLvZS5TC7yVHhhS", "S-841 color amatista"),
    ("UNIALRE S-841 AMARILLO", "15rvRuI_n4QvprP3lRAtNiQPpsD3XO84J", "S-841 color amarillo"),
    ("UNIALRE S-841 AQUA", "1TM_xGKqry1kiO704f1094fMrJHr-J0KB", "S-841 color aqua"),
    ("UNIALRE S-841 NEGRO", "1wHBR5EI2bnUBkfX7y3CSxwAhHoLgrxgb", "S-841 color negro"),
    ("UNIALRE S-838 SHINY", "1_CjHtHBcTeSRFFVMhuj9hmz8pN8628gi", "S-838"),
    ("UNIALRE S-837 SHINY", "1ykQtTrpirrdRaIlwCdFGmQLDwioj9VSX", "S-837"),
    ("UNIALRE S-835 SHINY", "1bvz8C0Vi0beNhY-Vfv40qMfrvoyGDku_", "S-835"),
    ("UNIALRE S-834 SHINY", "1tIiTbj8RVKvw6nph8i66Cipn5p8Zf7x4", "S-834"),
    ("UNIALRE S-833 SHINY", "1Xe456sj60qdABeVj_qtR9k0j5Ja6XZNU", "S-833"),
    ("UNIALRE S-830 SHINY", "1WHJUdw3GhWla5ZlNBUehBbObjVNFR6gW", "S-830"),
    ("UNIALRE S-829 SHINY", "1eCIvVD4G8ahPQDnR3XxSAPIbqIkv_YBV", "S-829"),
    ("UNIALRE S-828 SHINY", "19VUif55btj_km6XnE2fydfEQBd7Q9fPK", "S-828"),
    ("UNIALRE S-827 SHINY", "1Q7Mv584GWNIYXSvi2xvK6EsRAgJoWj3v", "S-827"),
    ("UNIALRE S-826 SHINY", "1BgiWL7OuTLqOzxzyf5kJ9tD7UoQknabK", "S-826"),
    ("UNIALRE S-820 AZUL", "1mz8xUb-cPzWlB9VTJCqNt0DGRNx368uz", "S-820 color azul"),
    ("UNIALRE S-820 ROJO", "13RNw89q04C30iNq6cbpgmkttLIVkdRX4", "S-820 color rojo"),
    ("UNIALRE S-820 AMARILLO", "167F0uyjaAuAe_7BcNJBolYklDBxAbwyq", "S-820 color amarillo"),
    ("UNIALRE S-820 NEGRO", "1indqpK2CfQdHTAdptqfAikbFzLkGfhU7", "S-820 color negro"),
    ("UNIALRE S-542 SHINY", "1wLrCB2tYLllV1YWy91TsKNxsvWbANO0h", "S-542"),
    ("UNIALRE S-538 SHINY", "1_B0g6h7gs6QXfgYAp1h5q2jsFuOwdbBo", "S-538"),
    ("UNIALRE S-530 SHINY", "1iQ2QNJRgHDiPgXp0T4j9dx44khz7BJ2V", "S-530"),
    ("UNIALRE S-524 SHINY", "1G6sy-leSiUCLjnOwYQvXlLEN50ZtyelG", "S-524"),
    ("UNIALRE S-520 AZUL", "1p-WA5mSaE9aHBGi3QhknPXj6oha4YrlK", "S-520 color azul"),
    ("UNIALRE S-520 ROJO", "16QzYGrt7tdu--j4p7eXkKU9JFhnFU66j", "S-520 color rojo"),
    ("UNIALRE S-520 NEGRO", "1BX6agcKgpfi4QRyl-heOgfavzR2wf0bJ", "S-520 color negro"),
    ("UNIALRE S-510 NEGRO", "18B2lHtGf_tnclP3KbiZkZZu8G-bB5rvn", "S-510 color negro"),
    ("UNIALRE S-510 ROJO", "1GLEvSYmnCTJMQbYCETp-0WzlPO1Id-TL", "S-510 color rojo"),
    ("UNIALRE S-510 AZUL", "1xtbrUlMJminsWlkKPszspmvswRyqQrky", "S-510 color azul"),
    ("UNIALRE S-310 NEGRO", "1ZoshxVcin5sNlnWLqefKm-V584fUco1I", "S-310 color negro"),
    ("UNIALRE S-308 AMARILLO", "1m8bxmqLE8zv__WdUrLRQTDukShcCjh81", "S-308 color amarillo"),
    ("UNIALRE S-308 NEGRO", "1NdQ2DJQACGNULSYAb1bnLsDDroGB8vSp", "S-308 color negro"),
    ("UNIALRE S-308 ROJO", "1yCfVtpk_kitXHy4bBaHkYijgjniGpuc1", "S-308 color rojo"),
    ("UNIALRE S-308 AZUL", "11nl87cv0ExPQVSk6Ptbv2rmctqCmcWe5", "S-308 color azul"),
    ("UNIALRE R-542 SHINY", "16fTXO0dhmOQGrXZnhdPE01GiEbbgDbrP", "R-542"),
    ("UNIALRE R-532 SHINY", "1qkUeV8n_f7nc_VGbIfDcHQCRKc0bjG-x", "R-532"),
    ("UNIALRE R-524 SHINY", "17LD8Wwj1Q2eMwkeTWpd8E5XndnzMQGZ1", "R-524"),
    ("UNIALRE R-512 AMARILLO", "10EJisyrCM40MxKcwY7YWfAxm1FdHxfaS", "R-512 color amarillo"),
    ("UNIALRE R-512 AZUL", "1gohXx0WOpi7r9DYPhlxddGv_8yiF9zL9", "R-512 color azul"),
    ("UNIALRE R-512 ROJO", "1n4AHhzAZTFeNy0xGTVjAzrxTqmKbOR6r", "R-512 color rojo"),
    ("UNIALRE R-512 NEGRO", "1ux0xWowoHVEVsVZNRf3j6-JUiVMYtZ89", "R-512 color negro"),
    ("UNIALRE O-3555 SHINY", "1hfciZWMo2VToDGRcCTDL8GvsSkrSyz7E", "O-3555"),
    ("UNIALRE O-3045 SHINY", "1qb4h_i0TpVcj0qvJOS3BF10GeA2N27nD", "O-3045"),
    ("UNIALRE S-837D FECHADOR SHINY", "14KBUloBe6TSveG8kQfhoHtKi1-PRg28F", "S-837D fechador"),
    ("UNIALRE S-835D FECHADOR SHINY", "1qfAcM4wvMMgO9gbIosXjCAszE7BaaDCk", "S-835D fechador"),
    ("UNIALRE S-834D FECHADOR SHINY", "1kKhTI6kkYPjzwbTKkpnQ7h6KinkYwRsN", "S-834D fechador"),
    ("UNIALRE S-830D FECHADOR SHINY", "1lCPthwYw1i_6E_kT7ohzTfxAQayTtVGO", "S-830D fechador"),
    ("UNIALRE S-829D FECHADOR SHINY", "1HD8GK5AR_Jnx25LU9gU6Qk2BKXzICLl9", "S-829D fechador"),
    ("UNIALRE S-828D FECHADOR SHINY", "1aO35Bh7R5Laut0yu9ZOz6yoGJaCSFFCu", "S-828D fechador"),
    ("UNIALRE S-827D FECHADOR SHINY", "1lPOXLo3D4-wzihdxzJr831UTpexyJfp5", "S-827D fechador"),
    ("UNIALRE S-826D FECHADOR SHINY", "1c3fi43kwKQjaQR1N1jXPgjf39fEbwr07", "S-826D fechador"),
    ("UNIALRE S-542D FECHADOR SHINY", "1ILlQekByRBHhqgas70ynn2-4BphaObNU", "S-542D fechador"),
    ("UNIALRE S-530D FECHADOR SHINY", "1p6ndq5QPg7zg8F3PCpFtlkE8w04_Kafw", "S-530D fechador"),
    ("UNIALRE S-524D FECHADOR SHINY", "1yQtx40I_ZxWXV35rAv76iyoRNIuZ8ysc", "S-524D fechador"),
    ("UNIALRE R-542D FECHADOR SHINY", "1RRSMwSEi5JX3w9EojkWtY7dpeYT_K6Sl", "R-542D fechador"),
    ("UNIALRE R-532D FECHADOR SHINY", "125h281lbpnrySKH00_bF6PmRcbEAAeDt", "R-532D fechador"),
    ("UNIALRE R-524D FECHADOR SHINY", "1B99OBll2n5T1R19_a9117pE-wMYAk-Ax", "R-524D fechador"),
    ("UNIALRE O-3555D FECHADOR SHINY", "1i9YBVhcw03ZAz4VyZgyksnvmm_uTdPBo", "O-3555D fechador"),
    ("UNIALRE O-3045D FECHADOR SHINY", "156xnWJ0zedgCYQ0RWoSJ6ua2bo8lPumq", "O-3045D fechador")
]

for name, file_id, detail in printer_products_data:
    products.append({
        "name": name,
        "category": "Linea printer",
        "line": "Sellos",
        "image": f"https://lh3.googleusercontent.com/d/{file_id}=w1000",
        "icon": "fa-print",
        "description": f"Sello linea printer Shiny {detail}.",
        "whatsapp_message": f"Hola, estoy interesado en el producto de sellos: {name}"
    })

sellos_categories_to_keep = {
    "Almohadillas",
    "Arbol de sellos",
    "De bolsillo",
    "Didacticos",
    "Lacre",
    "Linea printer",
    "Sello seco",
}

products = [
    item
    for item in products
    if item["line"] != "Sellos" or item["category"] in sellos_categories_to_keep
]

db.query(Product).filter(
    Product.line == "Sellos",
    ~Product.category.in_(sellos_categories_to_keep)
).delete(synchronize_session=False)

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
