// Registro central de clientes de la agencia.
// Para dar de alta uno nuevo: copia un bloque, cambia el slug y rellena.
// Los campos que todavía no se sepan se dejan vacíos y la ficha los omite sola.

export type EstadoCliente = "demo" | "opciones" | "produccion" | "interno";

export type FilaDato = [string, string];

export type OpcionDiseno = {
  letra: string;
  titulo: string;
  nota: string;
  url: string;
};

export type Cliente = {
  slug: string;
  nombre: string;
  corto: string;
  sector: string;
  resumen: string;
  contacto: string;
  pais: string;
  alta: string;
  estado: EstadoCliente;
  demo: string;
  produccion: string;
  comercial: FilaDato[];
  tecnico: FilaDato[];
  infra: FilaDato[];
  opciones?: OpcionDiseno[];
  pendientes: string[];
  notas: string;
};

export const clientes: Cliente[] = [
  {
    slug: "baretec-panama",
    nombre: "BARETEC Panamá, S.A.",
    corto: "BARETEC",
    sector: "Comercio internacional · Baterías ácido-plomo usadas (BAPU/ULAB)",
    resumen:
      "Exportación de baterías ácido-plomo usadas desde América Latina hacia Corea del Sur. Web corporativa institucional orientada a generar confianza con proveedores y compradores.",
    contacto: "Angélica De León Ramírez — fundadora",
    pais: "Panamá",
    alta: "Agosto 2026",
    estado: "demo",
    demo: "https://baretecpanama.dukecrea.com",
    produccion: "",

    comercial: [
      ["Cotización", "COT-2026-0805-BTP"],
      ["Monto total", "USD 400"],
      ["Desglose", "Tema WordPress $300 · Instalación $40 · Correos $60"],
      ["Forma de pago", "50 % inicial / 50 % contra entrega"],
      ["Estado de pago", "Abonados USD 200 — falta el 50 % contra entrega"],
      ["Regla del cliente", "El template se cobra a $300; lo adicional se cobra aparte pero barato"],
    ],

    tecnico: [
      ["Stack", "Tema WordPress propio (PHP) + demo estático generado"],
      ["Fuente única", "El sitio es el tema; el demo se genera renderizando las mismas plantillas"],
      ["Build del demo", "php build/build.php (usa build/wp-stubs.php)"],
      ["Editable por el cliente", "Sí — el registro central theme/inc/content.php genera el Customizer"],
      ["Proyecto local", "~/vercel-projects/baretec-panama"],
      ["Proyecto Vercel", "baretec-panama"],
    ],

    infra: [
      ["Dominio", "baretecpanama.com"],
      ["Registrador", "GoDaddy — renueva 4 ago 2027, $22.99/año"],
      ["Subdominio del demo", "baretecpanama.dukecrea.com"],
      ["DNS del demo", "Cloudflare (zona dukecrea.com) · A → 76.76.21.21 · nube gris, DNS only"],
      ["Hosting final", "EasyWP"],
      ["Correos", "Google Workspace — 3 usuarios pagados + 4 alias/grupo"],
    ],

    pendientes: [
      "Instalar el tema en EasyWP y migrar el contenido",
      "Configurar los correos en Google Workspace",
      "Apuntar baretecpanama.com al hosting final",
      "Entrega y cobro del 50 % restante",
    ],

    notas:
      "El DNS de dukecrea.com vive en Cloudflare, no en Vercel: el registro del subdominio debe quedar en DNS only (nube gris) o Vercel no emite el certificado SSL. Contenido fuente: documento «BARETEC Panamá — Contenido del sitio web (ES) v6.5». Se maquetó la Opción A (con retrato de la fundadora); si el campo se deja vacío en el Customizer, el bloque degrada solo a la Opción B.",
  },

  {
    slug: "camsmark",
    nombre: "Camsmark",
    corto: "Camsmark",
    sector: "E-commerce industrial · Herramientas y equipo",
    resumen:
      "Tienda en línea multi-país Panamá + Venezuela, con precio, stock y checkout separados por país e integración con el ERP SAINT de la sede de Caracas. Fase 1 en producción, pendiente de entrega.",
    contacto: "Ricardo Contreras",
    pais: "Panamá y Venezuela",
    alta: "Julio 2026",
    estado: "produccion",
    demo: "",
    produccion: "https://camsmark.shop",

    comercial: [
      ["Fase 1", "USD 3,000 — 8 a 10 semanas"],
      ["Estado de pago", "Abonados USD 1,500 — falta el 50 % contra entrega"],
      ["Equipo", "Antonio (backend, SAINT, SEO) + Noé (storefront, UI)"],
    ],

    tecnico: [
      ["Stack", "Laravel 10 + Filament 3.2"],
      ["Tiendas", "/pa en USD y /ve en VES; precio y stock en el pivote product_store"],
      ["Venezuela en Fase 1", "Navegable sin cobro — el carrito termina en WhatsApp"],
      ["ERP", "SAINT Enterprise Administrativo 9.0.2.5 sobre SQL Server, agente local en Caracas"],
      ["PHP local", "/opt/homebrew/opt/php@8.2/bin/php — nunca php a secas"],
      ["Proyecto local", "~/MisProyectos/camsmark"],
      ["Tablero de avance", "docs/PLAN-OPTIMIZADO.md dentro del repo"],
    ],

    infra: [
      ["Dominio", "camsmark.shop"],
      ["Hosting", "Forge sobre Vultr — /home/forge/camsmark.shop"],
      ["Despliegue", "Manual por SSH; Forge NO auto-despliega"],
      ["Respaldos", "bash /home/forge/backup-camsmark.sh"],
    ],

    pendientes: [
      "Mergear el PR #24 (colecciones por oficio)",
      "Publicar las fotos etiquetadas al catálogo real",
      "Motor de cross-sell y kits",
      "Piloto de 10 SKU con el agente SAINT de Caracas",
      "Aplicar la regla «Panamá = resto del mundo» al ITBMS",
      "Entrega de Fase 1 y cobro del 50 % restante",
    ],

    notas:
      "Trampa cara: ->after('columna') solo vale en ALTER TABLE; dentro de Schema::create MySQL da error 1064 y sqlite lo ignora, así que los tests locales pasan y explota en producción. En SAINT, Precio1 es el mínimo y Precio3 el máximo: publicar el equivocado vende bajo margen sin dar ningún error. La oficina de Caracas sale por Starlink con CGNAT, por eso el agente habla solo hacia afuera y se autentica por token, nunca por lista de IP.",
  },

  {
    slug: "gustavo-campos",
    nombre: "Gustavo Campos",
    corto: "Gustavo Campos",
    sector: "Consultoría de ventas",
    resumen:
      "Landing para consultor de ventas. Se presentaron tres direcciones de diseño; la Opción A se rediseñó con línea editorial tipo vilmanunez.com.",
    contacto: "Gustavo Campos",
    pais: "Panamá",
    alta: "Julio 2026",
    estado: "opciones",
    demo: "https://gustavo-campos-option-a.vercel.app",
    produccion: "",

    comercial: [
      ["Cotización", "Por confirmar"],
      ["Monto total", "Por confirmar"],
      ["Estado de pago", "Por confirmar"],
    ],

    tecnico: [
      ["Stack", "Landing estática en Vercel"],
      ["Proyectos Vercel", "gustavo-campos-option-a / -b / -c"],
      ["Proyecto local", "~/vercel-projects/gustavo-campos-option-a (y b, c)"],
    ],

    infra: [
      ["Dominio", "Por definir"],
      ["Subdominio del demo", "Pendiente — hoy vive en .vercel.app"],
      ["Hosting", "Vercel"],
    ],

    opciones: [
      {
        letra: "A",
        titulo: "Minimalista premium",
        nota: "Rediseñada con línea editorial (vilmanunez.com)",
        url: "https://gustavo-campos-option-a.vercel.app",
      },
      {
        letra: "B",
        titulo: "Bold y energético",
        nota: "Negro y naranja, enfoque de crecimiento",
        url: "https://gustavo-campos-option-b.vercel.app",
      },
      {
        letra: "C",
        titulo: "Sofisticado corporativo",
        nota: "Índigo y degradados sutiles",
        url: "https://gustavo-campos-option-c.vercel.app",
      },
    ],

    pendientes: [
      "Que el cliente elija una de las tres opciones",
      "Cerrar cotización y forma de pago",
      "Mover el demo elegido a un subdominio de dukecrea.com",
    ],

    notas: "",
  },

  {
    slug: "eventos-qr",
    nombre: "Eventos QR",
    corto: "Eventos QR",
    sector: "Producto propio DukeCrea",
    resumen:
      "Producto propio de la agencia: gestión de eventos con acreditación por código QR. No es un encargo de cliente.",
    contacto: "DukeCrea",
    pais: "Panamá",
    alta: "",
    estado: "interno",
    demo: "https://eventos-qr.vercel.app",
    produccion: "",

    comercial: [["Tipo", "Producto propio — sin cotización de cliente"]],

    tecnico: [
      ["Proyecto Vercel", "eventos-qr"],
      ["Proyecto local", "~/vercel-projects/eventos-qr"],
    ],

    infra: [
      ["Dominio", "Por definir"],
      ["Subdominio del demo", "Pendiente — hoy vive en .vercel.app"],
      ["Hosting", "Vercel"],
    ],

    pendientes: ["Mover a un subdominio de dukecrea.com"],
    notas: "",
  },
];

export const estadosCliente: Record<EstadoCliente, { texto: string; clases: string }> = {
  demo: { texto: "Demo publicado", clases: "border-lime-400/40 bg-lime-500/10 text-lime-200" },
  opciones: { texto: "Esperando elección", clases: "border-amber-400/40 bg-amber-500/10 text-amber-200" },
  produccion: { texto: "En producción", clases: "border-cyan-400/40 bg-cyan-500/10 text-cyan-200" },
  interno: { texto: "Interno", clases: "border-gray-700 bg-gray-900 text-gray-300" },
};

export function buscarCliente(slug: string) {
  return clientes.find((cliente) => cliente.slug === slug);
}
