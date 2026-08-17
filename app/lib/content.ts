import type { ServiceCategory } from "./site";

export type SolutionHub = {
  slug: ServiceCategory;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  answer: string;
  problems: string[];
  method: string[];
};

export const solutionHubs: SolutionHub[] = [
  {
    slug: "dev",
    eyebrow: "Desarrollo web y software",
    title: "Infraestructura web y software para operar con control",
    metaTitle: "Desarrollo web y software a medida en Panamá",
    metaDescription:
      "Desarrollo web, WordPress, Shopify, e-commerce, software a medida y paneles para empresas en Panamá y Venezuela.",
    answer:
      "DukeCrea diseña y desarrolla sitios corporativos, tiendas, landing pages, sistemas internos y paneles. Elegimos Next.js, WordPress, Shopify o una arquitectura a medida según la operación, el tiempo de salida y el nivel de control que necesita la empresa.",
    problems: [
      "La web no genera oportunidades ni explica bien la oferta.",
      "La operación depende de hojas de cálculo y tareas repetitivas.",
      "La tienda no conecta inventario, pagos, pedidos y seguimiento.",
      "La dirección no tiene un panel confiable para tomar decisiones.",
    ],
    method: [
      "Diagnóstico del proceso y del objetivo comercial.",
      "Selección de plataforma y arquitectura con criterios claros.",
      "Implementación por entregas verificables.",
      "Medición, documentación y evolución posterior al lanzamiento.",
    ],
  },
  {
    slug: "automation",
    eyebrow: "Automatización e IA",
    title: "Automatizaciones para responder, ordenar y recuperar leads",
    metaTitle: "Automatización con IA y WhatsApp para empresas",
    metaDescription:
      "Automatización de WhatsApp, redes sociales, CRM, formularios y atención de leads con IA para reducir trabajo manual.",
    answer:
      "Conectamos formularios, WhatsApp, redes sociales, CRM, correo, hojas de cálculo y bases de datos para que cada lead quede registrado, reciba una respuesta útil y tenga un siguiente paso visible para el equipo.",
    problems: [
      "Los mensajes se atienden tarde o se pierden entre canales.",
      "El equipo copia datos manualmente entre herramientas.",
      "No existe trazabilidad desde el anuncio hasta la venta.",
      "Las preguntas repetitivas consumen tiempo comercial.",
    ],
    method: [
      "Mapa del flujo actual y puntos de pérdida.",
      "Reglas de negocio, datos y momentos de intervención humana.",
      "Integración progresiva con pruebas de escenarios reales.",
      "Alertas, seguimiento y panel para controlar excepciones.",
    ],
  },
  {
    slug: "marketing",
    eyebrow: "Marketing de precisión",
    title: "Contenido, Ads y analítica conectados con el negocio",
    metaTitle: "Marketing digital, Ads y analítica en Panamá",
    metaDescription:
      "Auditoría de contenido, redes sociales, Google Ads, Meta Ads, video y ROI para empresas que necesitan crecer con medición.",
    answer:
      "Evaluamos oferta, contenido, campañas, rutas de conversión y datos para priorizar acciones que puedan medirse. El objetivo es conectar inversión publicitaria, leads, ventas y margen, no producir actividad sin lectura comercial.",
    problems: [
      "Hay publicaciones y campañas, pero no una estrategia conectada.",
      "No se conoce el costo real por oportunidad o por venta.",
      "El contenido atrae atención, pero no conduce a una acción.",
      "Las decisiones de presupuesto dependen de métricas aisladas.",
    ],
    method: [
      "Auditoría de oferta, canales, contenido y medición.",
      "Definición de objetivos y eventos de conversión.",
      "Plan de contenido, campañas y activos de captación.",
      "Lectura periódica de ROI, calidad de leads y oportunidades.",
    ],
  },
];

export function getSolutionHub(slug: string) {
  return solutionHubs.find((hub) => hub.slug === slug);
}

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  metaTitle: string;
  metaDescription: string;
  challenge: string;
  solution: string;
  result: string;
  capabilities: string[];
  stack: string[];
  relatedServices: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "champion-motors-automatizacion-concesionario",
    client: "Champion Motors",
    sector: "Concesionario de autos",
    metaTitle: "Caso Champion Motors: automatización para concesionario",
    metaDescription:
      "Web, documentos, OCR, Telegram, Zoho CRM y Google Drive conectados para apoyar la operación comercial de Champion Motors.",
    challenge:
      "La operación comercial necesitaba producir cotizaciones y contratos, leer documentos, organizar archivos y mantener seguimiento sin depender de tareas desconectadas.",
    solution:
      "Desarrollamos la web del concesionario y ChampionDesk, un flujo que usa Telegram como interfaz operativa, OCR para leer cédulas, Zoho CRM para la gestión comercial y Google Drive para organizar documentos.",
    result:
      "El equipo dispone de un recorrido conectado para generar documentos, consultar información y emitir recordatorios de saldos desde herramientas que ya forman parte de su trabajo diario.",
    capabilities: ["Captura y consulta de datos", "Generación de contratos y cotizaciones", "OCR de cédulas", "Recordatorios comerciales"],
    stack: ["Laravel", "Python", "Telegram", "Zoho CRM", "Google Drive"],
    relatedServices: ["desarrollo-de-software", "control-gestion-atencion-leads", "panel-monitor-administrativo-inteligente"],
  },
  {
    slug: "baretec-wordpress-corporativo",
    client: "BARETEC Panamá",
    sector: "Comercio internacional",
    metaTitle: "Caso BARETEC: web corporativa WordPress administrable",
    metaDescription:
      "Sitio WordPress a medida para BARETEC Panamá, con contenido e imágenes editables desde el panel administrativo.",
    challenge:
      "La empresa necesitaba explicar una operación internacional especializada y, al mismo tiempo, conservar autonomía para actualizar textos e imágenes.",
    solution:
      "Construimos un tema WordPress a medida con estructura corporativa, jerarquía de contenido y campos administrables para el equipo.",
    result:
      "BARETEC puede mantener actualizada su presencia digital desde WordPress sin depender del desarrollador para cada cambio editorial.",
    capabilities: ["Arquitectura de contenido", "Tema WordPress a medida", "Panel administrable", "Diseño responsive"],
    stack: ["WordPress", "PHP", "Tema a medida"],
    relatedServices: ["paginas-web-corporativas", "desarrollo-wordpress", "seo-y-geo"],
  },
  {
    slug: "camsmark-ecommerce-multipais",
    client: "Camsmark",
    sector: "E-commerce multi-país",
    metaTitle: "Caso Camsmark: e-commerce multi-país",
    metaDescription:
      "Tienda online con precios, moneda, inventario y pagos separados por país, administrada desde una sola operación.",
    challenge:
      "La tienda debía atender dos mercados con reglas diferentes sin duplicar catálogos, administración ni procesos internos.",
    solution:
      "Creamos un e-commerce con separación de precio, moneda, inventario y proceso de pago por país, más un panel administrativo central.",
    result:
      "La empresa puede operar ambos mercados desde una misma plataforma y conservar las diferencias comerciales de cada país.",
    capabilities: ["Catálogo multi-país", "Inventario por mercado", "Moneda y precios locales", "Panel administrativo"],
    stack: ["Laravel", "Filament", "MySQL"],
    relatedServices: ["e-commerce", "panel-monitor-administrativo-inteligente", "desarrollo-de-software"],
  },
  {
    slug: "mili-molo-ecommerce-educativo",
    client: "Mili & Molo",
    sector: "E-commerce educativo",
    metaTitle: "Caso Mili & Molo: tienda educativa en WooCommerce",
    metaDescription:
      "E-commerce bilingüe para productos educativos físicos y descargables, con WooCommerce, tema propio y medición.",
    challenge:
      "La marca necesitaba vender libros, materiales descargables y productos físicos en un mismo catálogo bilingüe.",
    solution:
      "Desarrollamos un tema propio sobre WordPress y WooCommerce, preparamos la carga de contenido y configuramos la medición del comercio electrónico.",
    result:
      "La tienda reúne distintos tipos de producto en una experiencia administrable y preparada para analizar el recorrido de compra.",
    capabilities: ["Productos físicos y digitales", "Contenido bilingüe", "Carga estructurada", "Medición de e-commerce"],
    stack: ["WordPress", "WooCommerce", "PHP", "Analítica"],
    relatedServices: ["e-commerce", "desarrollo-wordpress", "gestion-control-ads"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

type ResourceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ResourceArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  answer: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  sections: ResourceSection[];
  faq: Array<{ q: string; a: string }>;
  relatedServices: string[];
};

export const resourceArticles: ResourceArticle[] = [
  {
    slug: "wordpress-shopify-o-desarrollo-a-medida",
    title: "WordPress, Shopify o desarrollo a medida: cómo elegir",
    metaTitle: "WordPress vs. Shopify vs. desarrollo a medida",
    metaDescription:
      "Comparación práctica para elegir WordPress, Shopify o desarrollo a medida según contenido, comercio, integraciones y operación.",
    excerpt:
      "Una guía para decidir plataforma por operación, velocidad de salida, autonomía y costo total, no por moda tecnológica.",
    answer:
      "WordPress suele convenir para sitios de contenido administrable; Shopify, para comercio electrónico que necesita salir rápido; y un desarrollo a medida, cuando existen reglas, integraciones o procesos que una plataforma estándar no resuelve bien.",
    publishedAt: "2026-08-17",
    updatedAt: "2026-08-17",
    readingTime: "7 min",
    sections: [
      {
        heading: "La decisión correcta empieza por la operación",
        paragraphs: [
          "La plataforma debe responder a cómo vende y trabaja la empresa. Antes de comparar tecnologías conviene definir quién actualizará el contenido, cuántos productos existen, qué integraciones son obligatorias y qué cambios se esperan durante el próximo año.",
          "También importa el costo total: implementación, aplicaciones, mantenimiento, soporte y tiempo del equipo. Una opción barata al inicio puede resultar costosa si obliga a duplicar tareas o limita una integración crítica.",
        ],
      },
      {
        heading: "Cuándo elegir WordPress",
        paragraphs: [
          "WordPress funciona bien para webs corporativas, medios, catálogos y proyectos donde el equipo necesita editar páginas con frecuencia. WooCommerce permite sumar comercio electrónico, especialmente cuando contenido y venta viven muy conectados.",
        ],
        bullets: ["Contenido administrable", "Amplio ecosistema de integraciones", "Control sobre estructura y alojamiento", "Mantenimiento técnico periódico"],
      },
      {
        heading: "Cuándo elegir Shopify",
        paragraphs: [
          "Shopify es una buena ruta cuando la prioridad es operar una tienda con catálogo, pagos y pedidos sobre una plataforma madura. Reduce decisiones de infraestructura, aunque las aplicaciones y personalizaciones pueden elevar el costo mensual.",
        ],
        bullets: ["Salida rápida al mercado", "Operación de tienda integrada", "Aplicaciones para ampliar funciones", "Menor libertad para reglas muy particulares"],
      },
      {
        heading: "Cuándo construir a medida",
        paragraphs: [
          "El desarrollo a medida tiene sentido cuando el negocio posee procesos propios, múltiples roles, reglas de precio, mercados separados, integraciones profundas o una ventaja operativa que debe quedar dentro del sistema.",
          "No significa construir todo desde cero: una arquitectura responsable reutiliza servicios probados para autenticación, pagos, correo o almacenamiento y concentra el trabajo propio donde aporta valor.",
        ],
      },
    ],
    faq: [
      { q: "¿Se puede migrar más adelante?", a: "Sí, pero toda migración tiene costo. Conviene ordenar datos, URLs, contenido y redirecciones desde el inicio para reducir riesgo." },
      { q: "¿Cuál opción posiciona mejor en Google?", a: "Las tres pueden posicionar. La diferencia está en rendimiento, arquitectura, contenido, enlaces y mantenimiento, no únicamente en el nombre de la plataforma." },
    ],
    relatedServices: ["paginas-web-corporativas", "desarrollo-wordpress", "desarrollo-shopify"],
  },
  {
    slug: "como-medir-roi-publicitario",
    title: "Cómo medir el ROI publicitario sin confundir leads con ventas",
    metaTitle: "Cómo calcular el ROI de Google Ads y Meta Ads",
    metaDescription:
      "Guía para conectar inversión, leads, ventas, margen y atribución al calcular el ROI de campañas publicitarias.",
    excerpt:
      "El retorno no termina en el costo por lead. Hay que conectar campañas, oportunidades, ventas y margen.",
    answer:
      "El ROI publicitario se calcula restando el costo de la inversión al beneficio atribuible a la campaña y dividiendo el resultado entre ese costo. Para que la cifra sea útil, debe usar ventas confirmadas y margen, no solo formularios enviados.",
    publishedAt: "2026-08-17",
    updatedAt: "2026-08-17",
    readingTime: "6 min",
    sections: [
      {
        heading: "La fórmula y el dato que suele faltar",
        paragraphs: [
          "La fórmula básica es (beneficio atribuible menos inversión publicitaria) dividido entre inversión publicitaria. El resultado puede expresarse como porcentaje. Sin embargo, el reto no es la fórmula: es conocer qué venta provino de qué campaña y cuánto margen dejó.",
          "Un reporte de Ads muestra clics y conversiones, pero el negocio necesita completar la cadena con el CRM, la facturación o el registro de ventas.",
        ],
      },
      {
        heading: "Datos mínimos para una lectura confiable",
        paragraphs: ["Antes de optimizar presupuesto, reúne un conjunto consistente de datos por periodo y por canal."],
        bullets: ["Inversión por campaña", "Leads válidos y fuente", "Oportunidades calificadas", "Ventas confirmadas", "Ticket y margen", "Tiempo hasta el cierre"],
      },
      {
        heading: "Por qué el costo por lead no basta",
        paragraphs: [
          "Una campaña puede producir leads baratos y ventas pobres. Otra puede tener un costo por lead mayor, pero atraer empresas con mejor ticket o mayor probabilidad de cierre. Por eso conviene evaluar costo por oportunidad, costo de adquisición y margen recuperado.",
          "La calidad también depende de la landing, la velocidad de respuesta y el seguimiento. Ads no puede corregir por sí solo un proceso comercial que deja conversaciones sin atender.",
        ],
      },
      {
        heading: "Qué debe mostrar un panel de ROI",
        paragraphs: [
          "Un panel útil permite filtrar por periodo, canal y campaña; compara inversión con pipeline y ventas; y deja visibles los casos sin atribución. La meta es mejorar decisiones, no ocultar incertidumbre con una cifra única.",
        ],
      },
    ],
    faq: [
      { q: "¿ROAS y ROI son lo mismo?", a: "No. ROAS compara ingresos con gasto publicitario. ROI incorpora costos y beneficio para acercarse a la rentabilidad real." },
      { q: "¿Se puede medir una venta que cerró por WhatsApp?", a: "Sí, si el lead conserva su fuente y el equipo registra el resultado comercial en un CRM o panel conectado." },
    ],
    relatedServices: ["calculo-roi-publicitario", "gestion-control-ads", "panel-monitor-administrativo-inteligente"],
  },
  {
    slug: "automatizar-leads-whatsapp-crm",
    title: "Cómo automatizar leads de WhatsApp y formularios sin perder contexto",
    metaTitle: "Automatizar leads de WhatsApp, formularios y CRM",
    metaDescription:
      "Arquitectura práctica para capturar leads, conservar su fuente, asignar seguimiento y automatizar respuestas entre WhatsApp y CRM.",
    excerpt:
      "El objetivo no es responder por responder: es conservar contexto y asegurar un siguiente paso comercial.",
    answer:
      "Un flujo de leads confiable registra la fuente y la necesidad, guarda el contacto en una base o CRM, envía una respuesta inmediata, asigna responsable y crea recordatorios. La automatización debe permitir intervención humana y registrar cada cambio de estado.",
    publishedAt: "2026-08-17",
    updatedAt: "2026-08-17",
    readingTime: "7 min",
    sections: [
      {
        heading: "El recorrido mínimo de un lead",
        paragraphs: [
          "El proceso empieza antes de WhatsApp. Un enlace de campaña o formulario debe conservar parámetros de atribución, página de entrada y solución consultada. Sin ese contexto, el equipo recibe un número de teléfono, pero pierde la razón y el origen de la conversación.",
        ],
        bullets: ["Captura con contexto", "Registro único", "Respuesta inicial", "Asignación", "Próxima acción", "Resultado comercial"],
      },
      {
        heading: "Qué conviene automatizar",
        paragraphs: [
          "Son buenos candidatos la confirmación de recepción, las preguntas frecuentes, la calificación básica, las alertas al equipo y los recordatorios. Las negociaciones, excepciones y conversaciones sensibles deben conservar una salida clara hacia una persona.",
        ],
      },
      {
        heading: "La base de datos es parte del embudo",
        paragraphs: [
          "Cuando cada canal guarda campos diferentes, comparar rendimiento se vuelve difícil. Conviene definir un modelo común para contacto, empresa, necesidad, fuente, campaña, estado, responsable, valor estimado y próxima acción.",
          "La calidad del dato depende de validaciones, permisos y reglas para evitar duplicados. Automatizar sin una estructura mínima solo mueve el desorden más rápido.",
        ],
      },
      {
        heading: "Cómo medir si la automatización funciona",
        paragraphs: [
          "Revisa tiempo de primera respuesta, porcentaje de leads contactados, avance por estado, oportunidades recuperadas y ventas por fuente. También conviene auditar conversaciones donde el sistema no entendió o derivó tarde.",
        ],
      },
    ],
    faq: [
      { q: "¿Un chatbot debe responder todo?", a: "No. Debe resolver consultas previsibles y entregar a una persona cuando detecta intención de compra, una excepción o baja confianza." },
      { q: "¿Hace falta cambiar de CRM?", a: "No siempre. Primero revisamos las APIs y posibilidades del sistema actual; muchas veces conviene integrar antes que reemplazar." },
    ],
    relatedServices: ["control-gestion-atencion-leads", "chatbot-whatsapp-redes-sociales-ia", "desarrollo-de-software"],
  },
];

export function getResourceArticle(slug: string) {
  return resourceArticles.find((article) => article.slug === slug);
}
