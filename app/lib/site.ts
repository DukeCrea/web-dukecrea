export const siteConfig = {
  name: "DukeCrea",
  url: "https://dukecrea.com",
  email: "duque629@gmail.com",
  github: "https://github.com/DukeCrea",
  instagram: "https://www.instagram.com/dukecrea",
  whatsappNumber: "50763006579",
  defaultWhatsAppMessage:
    "Hola DukeCrea, quiero digitalizar mi negocio. ¿Podemos hablar?",
};

export function getWhatsAppUrl(message = siteConfig.defaultWhatsAppMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type ServiceCategory = "dev" | "automation" | "marketing";

export type Service = {
  slug: string;
  category: ServiceCategory;
  categoryLabel: string;
  icon: "cart" | "zap" | "chart" | "bot" | "phone" | "package" | "users";
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  summary: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  process: string[];
  stack: string[];
  faq: Array<{ q: string; a: string }>;
  related: string[];
};

export type MegaMenuColumn = {
  title: string;
  eyebrow: string;
  items: Array<{
    title: string;
    description: string;
    href: string;
  }>;
};

export type WorkflowStep = {
  label: string;
  title: string;
  description: string;
};

export const serviceCategories: Array<{
  id: ServiceCategory;
  label: string;
  headline: string;
  description: string;
}> = [
  {
    id: "dev",
    label: "Dev",
    headline: "Infraestructura web, commerce y sistemas que venden y operan",
    description:
      "Construimos presencia digital en Next.js, WordPress o Shopify, tiendas online, plataformas internas y paneles para que el negocio funcione con menos fricción.",
  },
  {
    id: "automation",
    label: "Automatizaciones",
    headline: "Flujos inteligentes para atender y vender sin esperar",
    description:
      "Conectamos WhatsApp, redes, CRM y herramientas internas para reducir tareas manuales y responder más rápido.",
  },
  {
    id: "marketing",
    label: "Consulta de marketing",
    headline: "Estrategia, contenido, Ads y medición para crecer con foco",
    description:
      "Auditamos tu contenido, inversión publicitaria y procesos de publicación para mejorar decisiones y retorno.",
  },
];

export const services: Service[] = [
  {
    slug: "paginas-web-corporativas",
    category: "dev",
    categoryLabel: "Dev",
    icon: "phone",
    title: "Páginas web corporativas",
    shortTitle: "Web corporativa",
    metaTitle: "Páginas web corporativas en Panamá",
    metaDescription:
      "Diseño y desarrollo de páginas web corporativas en Next.js, WordPress o Shopify, rápidas, profesionales y optimizadas para captar clientes.",
    eyebrow: "Presencia digital profesional",
    heroTitle: "Una web corporativa que presenta, convence y convierte",
    summary:
      "Sitios institucionales rápidos, claros y preparados para Google, WhatsApp, campañas, WordPress, Shopify o desarrollo a medida.",
    description:
      "Creamos páginas corporativas para empresas que necesitan transmitir confianza, explicar su oferta y convertir visitas en conversaciones comerciales, usando Next.js, WordPress o Shopify según el objetivo del proyecto.",
    outcomes: [
      "Tu empresa se ve profesional desde el primer contacto.",
      "Los clientes entienden rápido qué vendes y cómo contactarte.",
      "La web queda lista para campañas, SEO y medición.",
    ],
    deliverables: [
      "Home y secciones corporativas clave",
      "Diseño responsive",
      "Texto comercial base",
      "Formulario, WhatsApp y enlaces sociales",
      "SEO técnico inicial",
      "Base administrable en WordPress o Shopify cuando el cliente lo necesita",
    ],
    process: ["Objetivos iniciales", "Estructura y textos", "Diseño visual", "Desarrollo Next.js", "Revisión final y publicación"],
    stack: ["Next.js", "React", "WordPress", "Shopify", "Tailwind CSS", "SEO técnico", "Analítica"],
    faq: [
      {
        q: "¿En cuánto tiempo puede estar lista?",
        a: "Una web corporativa enfocada suele tomar entre 1 y 3 semanas según cantidad de secciones y contenido.",
      },
      {
        q: "¿Puedo pedir cambios luego del lanzamiento?",
        a: "Sí. Podemos dejar una fase de ajustes y luego un plan de mantenimiento mensual.",
      },
      {
        q: "¿Trabajan con WordPress o Shopify?",
        a: "Sí. Podemos desarrollar, optimizar o migrar sitios en WordPress y Shopify cuando conviene tener una base administrable o una tienda con operación rápida.",
      },
    ],
    related: ["landing-pages", "seo-y-geo", "gestion-control-ads"],
  },
  {
    slug: "e-commerce",
    category: "dev",
    categoryLabel: "Dev",
    icon: "cart",
    title: "E-commerce",
    shortTitle: "E-commerce",
    metaTitle: "Desarrollo de e-commerce y tiendas online",
    metaDescription:
      "Tiendas online con Shopify o desarrollo a medida, catálogo, carrito, pagos, inventario y panel administrativo para vender por internet.",
    eyebrow: "Venta online",
    heroTitle: "Una tienda online lista para vender y administrar",
    summary:
      "E-commerce en Shopify o a medida, con catálogo, inventario, proceso de pago y panel para operar sin depender de hojas de cálculo.",
    description:
      "Desarrollamos tiendas online para negocios que quieren vender con control real sobre productos, precios, inventario, pedidos y clientes. Podemos trabajar sobre Shopify o crear una solución a medida cuando la operación necesita más control.",
    outcomes: [
      "Centralizas ventas e inventario en un solo sistema.",
      "Puedes vender en más de un mercado o moneda si lo necesitas.",
      "Tu equipo administra productos sin depender del desarrollador.",
    ],
    deliverables: [
      "Catálogo y fichas de producto",
      "Carrito y proceso de pago",
      "Panel administrativo",
      "Gestión de pedidos e inventario",
      "Integraciones de pago y WhatsApp",
      "Configuración o evolución de Shopify cuando aplica",
    ],
    process: ["Modelo de catálogo", "Diseño de compra", "Integraciones", "Panel administrativo", "Pruebas de pedido"],
    stack: ["Shopify", "Next.js", "Laravel", "Filament", "MySQL", "Pasarelas de pago"],
    faq: [
      {
        q: "¿Puede manejar varios países?",
        a: "Sí. Podemos separar moneda, precio, inventario y proceso de pago por país cuando el negocio lo requiere.",
      },
      {
        q: "¿Incluye panel administrativo?",
        a: "Sí. La tienda se entrega con panel para productos, pedidos, clientes y ajustes operativos.",
      },
      {
        q: "¿Conviene Shopify o desarrollo a medida?",
        a: "Shopify conviene cuando necesitas salir rápido y operar con herramientas maduras. Un desarrollo a medida conviene cuando hay reglas, integraciones o flujos propios que Shopify no cubre bien.",
      },
    ],
    related: ["panel-monitor-administrativo-inteligente", "gestion-control-ads", "seo-y-geo"],
  },
  {
    slug: "landing-pages",
    category: "dev",
    categoryLabel: "Dev",
    icon: "zap",
    title: "Landing pages",
    shortTitle: "Landing pages",
    metaTitle: "Landing pages de alta conversión",
    metaDescription:
      "Landing pages rápidas y enfocadas para campañas, lanzamientos, captación de leads y ventas.",
    eyebrow: "Conversión para campañas",
    heroTitle: "Landing pages enfocadas en convertir tráfico en leads",
    summary:
      "Páginas de campaña con mensaje claro, CTA fuerte y estructura pensada para Google Ads, Meta Ads y WhatsApp.",
    description:
      "Creamos landing pages para validar ofertas, lanzar soluciones, captar leads y medir mejor el retorno de tus campañas.",
    outcomes: [
      "Reducen distracciones y enfocan al usuario en una acción.",
      "Mejoran la calidad de leads de campañas pagas.",
      "Permiten probar ofertas sin tocar toda la web principal.",
    ],
    deliverables: [
      "Hero y propuesta de valor",
      "Bloques de beneficios y prueba social",
      "Formulario o WhatsApp CTA",
      "Eventos de conversión",
      "Optimización mobile",
    ],
    process: ["Oferta y audiencia", "Copy de conversión", "Diseño", "Desarrollo", "Medición"],
    stack: ["Next.js", "Tailwind CSS", "Meta Pixel", "Google Ads", "Analítica"],
    faq: [
      {
        q: "¿Sirve para campañas de Ads?",
        a: "Sí. La estructura se diseña para tráfico pagado, velocidad, claridad y medición de conversiones.",
      },
      {
        q: "¿Puede tener varias versiones?",
        a: "Sí. Podemos crear variantes para diferentes públicos, ciudades, soluciones o anuncios.",
      },
    ],
    related: ["gestion-control-ads", "calculo-roi-publicitario", "paginas-web-corporativas"],
  },
  {
    slug: "desarrollo-de-software",
    category: "dev",
    categoryLabel: "Dev",
    icon: "package",
    title: "Desarrollo de software",
    shortTitle: "Software a medida",
    metaTitle: "Desarrollo de software a medida",
    metaDescription:
      "Software a medida para operaciones, ventas, inventario, reservas, validaciones y flujos internos.",
    eyebrow: "Sistemas a medida",
    heroTitle: "Software hecho para la forma real en que trabaja tu negocio",
    summary:
      "Diseñamos sistemas internos, SaaS y plataformas operativas para reemplazar procesos manuales y herramientas sueltas.",
    description:
      "Construimos soluciones a medida cuando una plantilla ya no alcanza: paneles, flujos de aprobación, reportes, roles, integraciones y automatizaciones.",
    outcomes: [
      "Reducir errores manuales y tareas repetidas.",
      "Ordenar datos y procesos en una plataforma única.",
      "Crear una ventaja operativa difícil de copiar.",
    ],
    deliverables: [
      "Arquitectura funcional",
      "Roles y permisos",
      "Panel administrativo",
      "Módulos del flujo principal",
      "Integraciones y soporte inicial",
    ],
    process: ["Descubrimiento", "Mapa de procesos", "Producto mínimo viable", "Iteraciones", "Escalamiento"],
    stack: ["Next.js", "TypeScript", "Python", "Laravel", "Supabase", "PostgreSQL"],
    faq: [
      {
        q: "¿Primero hacen un producto mínimo viable?",
        a: "Sí. Recomendamos empezar por el flujo con más impacto y luego ampliar módulos.",
      },
      {
        q: "¿Se puede integrar con sistemas existentes?",
        a: "Sí. Revisamos APIs, archivos, CRM, Drive, WhatsApp u otros sistemas para conectar lo que ya usas.",
      },
    ],
    related: ["panel-monitor-administrativo-inteligente", "control-gestion-atencion-leads", "software-automatizado-publicaciones-redes-sociales"],
  },
  {
    slug: "seo-y-geo",
    category: "dev",
    categoryLabel: "Dev",
    icon: "chart",
    title: "SEO y GEO",
    shortTitle: "SEO y GEO",
    metaTitle: "SEO y GEO para empresas",
    metaDescription:
      "Optimización SEO y GEO para aparecer mejor en buscadores y respuestas generativas con contenido útil y estructura técnica.",
    eyebrow: "Visibilidad orgánica",
    heroTitle: "SEO y GEO para que tu oferta sea encontrable y entendible",
    summary:
      "Optimizamos estructura, metadata, contenido, intención de búsqueda y datos estructurados para buscadores y asistentes de IA.",
    description:
      "Trabajamos SEO tradicional y GEO para que tus soluciones sean claras para personas, Google y motores generativos que resumen respuestas.",
    outcomes: [
      "Mejor estructura para indexación y rastreo.",
      "Contenido con respuestas claras a intención comercial.",
      "Datos estructurados y señales técnicas más consistentes.",
    ],
    deliverables: [
      "Auditoría SEO técnica",
      "Arquitectura de páginas",
      "Metadata y canonical",
      "JSON-LD",
      "Recomendaciones de contenido",
    ],
    process: ["Auditoría", "Mapa de intención", "Optimización técnica", "Contenido", "Medición"],
    stack: ["Metadata de Next.js", "Schema.org", "Search Console", "Core Web Vitals", "Analítica"],
    faq: [
      {
        q: "¿Qué es GEO?",
        a: "Es optimización para motores generativos: contenido claro, estructurado y fácil de citar o resumir por asistentes de IA.",
      },
      {
        q: "¿Prometen primera posición?",
        a: "No prometemos rankings artificiales. Mejoramos fundamentos técnicos, contenido e intención para competir mejor.",
      },
    ],
    related: ["paginas-web-corporativas", "landing-pages", "evaluacion-contenido-empresa"],
  },
  {
    slug: "gestion-control-ads",
    category: "dev",
    categoryLabel: "Dev",
    icon: "chart",
    title: "Gestión y control de ADS",
    shortTitle: "Control de Ads",
    metaTitle: "Gestión y control de Google Ads y Meta Ads",
    metaDescription:
      "Control, seguimiento y optimización de campañas en Google Ads y Meta Ads con foco en leads, ventas y ROI.",
    eyebrow: "Publicidad con medición",
    heroTitle: "Campañas de Ads con control, seguimiento y decisiones claras",
    summary:
      "Configuramos y acompañamos campañas para que sepas qué funciona, cuánto cuesta cada lead y dónde conviene invertir.",
    description:
      "Ordenamos campañas, creatividades, audiencias y medición para que la inversión publicitaria tenga lectura de negocio.",
    outcomes: [
      "Mayor claridad sobre costo por lead y costo por venta.",
      "Mejor conexión entre anuncios, landing y WhatsApp.",
      "Decisiones de inversión basadas en datos.",
    ],
    deliverables: [
      "Estructura de campañas",
      "Eventos y conversiones",
      "Landing o ruta de conversión",
      "Reporte de resultados",
      "Recomendaciones de optimización",
    ],
    process: ["Auditoría", "Tracking", "Campañas", "Optimización", "Reporte"],
    stack: ["Google Ads", "Meta Ads", "GA4", "Tag Manager", "Looker Studio"],
    faq: [
      {
        q: "¿Manejan Google y Meta?",
        a: "Sí. Podemos trabajar con Google Ads, Meta Ads o ambos según el tipo de oferta y audiencia.",
      },
      {
        q: "¿Incluye diseño de anuncios?",
        a: "Podemos coordinar piezas y textos comerciales, o integrarlo con la solución de creación de contenido y video.",
      },
    ],
    related: ["landing-pages", "evaluacion-inversion-ads", "calculo-roi-publicitario"],
  },
  {
    slug: "panel-monitor-administrativo-inteligente",
    category: "dev",
    categoryLabel: "Dev",
    icon: "chart",
    title: "Panel - monitor administrativo inteligente",
    shortTitle: "Panel inteligente",
    metaTitle: "Panel administrativo inteligente y análisis de datos",
    metaDescription:
      "Paneles administrativos inteligentes para monitorear ventas, leads, inventario, campañas y operación en tiempo real.",
    eyebrow: "Análisis de datos",
    heroTitle: "Un monitor inteligente para entender tu sistema de un vistazo",
    summary:
      "Paneles para ver métricas críticas, detectar cuellos de botella y tomar decisiones con menos intuición y más datos.",
    description:
      "Creamos paneles administrativos que conectan fuentes de datos y muestran indicadores útiles para ventas, operación, Ads, leads e inventario.",
    outcomes: [
      "Visibilidad real del negocio sin revisar archivos sueltos.",
      "Alertas y métricas para actuar más rápido.",
      "Mejor control de rendimiento por área.",
    ],
    deliverables: [
      "Panel de KPIs",
      "Filtros por periodo/canal",
      "Integración de datos",
      "Roles de acceso",
      "Exportes o reportes",
    ],
    process: ["KPIs", "Fuentes de datos", "Modelo", "Panel", "Validación"],
    stack: ["Next.js", "PostgreSQL", "APIs", "Gráficos", "Análisis de datos"],
    faq: [
      {
        q: "¿Puede conectarse a mi sistema actual?",
        a: "Sí, si existe API, base de datos exportable o archivos periódicos, podemos diseñar la integración.",
      },
      {
        q: "¿Es solo visual o también administra?",
        a: "Puede ser solo monitor, panel administrativo completo o una mezcla según el flujo.",
      },
    ],
    related: ["desarrollo-de-software", "calculo-roi-publicitario", "control-gestion-atencion-leads"],
  },
  {
    slug: "chatbot-whatsapp-redes-sociales-ia",
    category: "automation",
    categoryLabel: "Automatizaciones",
    icon: "bot",
    title: "Chatbot para WhatsApp o redes sociales con IA",
    shortTitle: "Chatbot con IA",
    metaTitle: "Chatbot para WhatsApp y redes sociales con IA",
    metaDescription:
      "Chatbots con IA para WhatsApp y redes sociales que atienden, califican y responden clientes automáticamente.",
    eyebrow: "Atención con IA",
    heroTitle: "Un chatbot con IA para responder sin dejar leads esperando",
    summary:
      "Automatiza respuestas frecuentes, calificación de clientes y derivación a tu equipo desde WhatsApp o redes.",
    description:
      "Diseñamos chatbots que entienden preguntas frecuentes, capturan datos, orientan al cliente y entregan conversaciones listas para seguimiento humano.",
    outcomes: [
      "Menos mensajes sin responder.",
      "Leads mejor calificados antes de hablar con ventas.",
      "Atención más consistente en horas de alta demanda.",
    ],
    deliverables: [
      "Flujos conversacionales",
      "Base de conocimiento",
      "Captura de datos",
      "Derivación a humano",
      "Integración con CRM o hojas",
    ],
    process: ["Casos de uso", "Guiones", "Entrenamiento", "Integración", "Pruebas reales"],
    stack: ["WhatsApp", "Instagram", "IA", "Python", "APIs"],
    faq: [
      {
        q: "¿Reemplaza al equipo humano?",
        a: "No necesariamente. Lo ideal es que filtre, responda lo repetitivo y derive conversaciones importantes.",
      },
      {
        q: "¿Puede usar información de mi empresa?",
        a: "Sí. Creamos una base de conocimiento con soluciones, horarios, precios orientativos y reglas de atención.",
      },
    ],
    related: ["control-gestion-atencion-leads", "respuestas-automatizadas-comentarios-redes-sociales", "software-automatizado-publicaciones-redes-sociales"],
  },
  {
    slug: "control-gestion-atencion-leads",
    category: "automation",
    categoryLabel: "Automatizaciones",
    icon: "users",
    title: "Control, gestión y atención de leads",
    shortTitle: "Gestión de leads",
    metaTitle: "Control y gestión de leads",
    metaDescription:
      "Sistemas para capturar, organizar, atender y dar seguimiento a leads desde formularios, WhatsApp, Ads y redes.",
    eyebrow: "Pipeline comercial",
    heroTitle: "Que ningún lead se pierda entre WhatsApp, formularios y Ads",
    summary:
      "Centraliza leads, estados, responsables y próximos pasos para que ventas trabaje con orden.",
    description:
      "Diseñamos flujos para capturar leads de distintos canales, asignarlos, dar seguimiento y medir la calidad de cada fuente.",
    outcomes: [
      "Menos oportunidades perdidas por falta de seguimiento.",
      "Mayor claridad de qué canal trae mejores leads.",
      "Equipo comercial con prioridades visibles.",
    ],
    deliverables: [
      "Formulario o captura multicanal",
      "Pipeline de estados",
      "Asignación de responsables",
      "Recordatorios",
      "Reporte por canal",
    ],
    process: ["Fuentes", "Estados", "Automatizaciones", "Panel", "Seguimiento"],
    stack: ["CRM", "WhatsApp", "Google Sheets", "Next.js", "Automatización"],
    faq: [
      {
        q: "¿Puede integrarse con mi CRM?",
        a: "Sí. Revisamos tu CRM actual y conectamos APIs o flujos intermedios cuando sea viable.",
      },
      {
        q: "¿Sirve si solo uso WhatsApp?",
        a: "Sí. Podemos empezar con WhatsApp y luego sumar formularios, Ads o redes.",
      },
    ],
    related: ["chatbot-whatsapp-redes-sociales-ia", "gestion-control-ads", "panel-monitor-administrativo-inteligente"],
  },
  {
    slug: "respuestas-automatizadas-comentarios-redes-sociales",
    category: "automation",
    categoryLabel: "Automatizaciones",
    icon: "bot",
    title: "Respuestas automatizadas de comentarios en redes sociales",
    shortTitle: "Auto-respuestas en redes",
    metaTitle: "Respuestas automatizadas para comentarios en redes sociales",
    metaDescription:
      "Automatización de respuestas a comentarios en redes sociales para atención al cliente y captación de leads.",
    eyebrow: "Atención social",
    heroTitle: "Convierte comentarios en conversaciones atendidas a tiempo",
    summary:
      "Automatiza respuestas frecuentes en redes sociales y deriva oportunidades hacia WhatsApp o tu equipo.",
    description:
      "Creamos flujos para responder comentarios, detectar intención, mantener tono de marca y mover conversaciones hacia canales de venta.",
    outcomes: [
      "Respuesta más rápida en publicaciones activas.",
      "Mayor aprovechamiento de campañas y contenido viral.",
      "Atención consistente sin saturar al equipo.",
    ],
    deliverables: [
      "Mapa de tipos de comentario",
      "Respuestas por intención",
      "Reglas de derivación",
      "Registro de oportunidades",
      "Pruebas de tono",
    ],
    process: ["Auditoría de comentarios", "Guiones", "Reglas", "Automatización", "Monitoreo"],
    stack: ["Instagram", "Meta", "IA", "Python", "Automatización"],
    faq: [
      {
        q: "¿La respuesta puede sonar humana?",
        a: "Sí. Definimos tono, límites y variaciones para que no se sienta repetitiva.",
      },
      {
        q: "¿Puede mandar al usuario a WhatsApp?",
        a: "Sí. Puede responder y orientar hacia el enlace correcto según la intención.",
      },
    ],
    related: ["chatbot-whatsapp-redes-sociales-ia", "creacion-edicion-videos", "software-automatizado-publicaciones-redes-sociales"],
  },
  {
    slug: "evaluacion-contenido-empresa",
    category: "marketing",
    categoryLabel: "Consulta de marketing",
    icon: "chart",
    title: "Evaluación de contenido para tu empresa",
    shortTitle: "Evaluación de contenido",
    metaTitle: "Evaluación de contenido para empresas",
    metaDescription:
      "Auditoría de contenido para detectar mejoras en mensaje, formatos, embudos, frecuencia y conversión.",
    eyebrow: "Auditoría de contenido",
    heroTitle: "Contenido con intención, no solo publicaciones sueltas",
    summary:
      "Analizamos tu contenido actual para mejorar claridad, autoridad, conversión y consistencia.",
    description:
      "Revisamos cómo comunicas tu oferta, qué formatos usas, qué dudas respondes y qué contenido falta para convertir mejor.",
    outcomes: [
      "Mensaje más claro y alineado a ventas.",
      "Ideas de contenido con propósito comercial.",
      "Mejor conexión entre redes, web y Ads.",
    ],
    deliverables: [
      "Diagnóstico de contenido",
      "Mapa de oportunidades",
      "Recomendaciones de formatos",
      "Ideas por etapa del embudo",
      "Prioridades de acción",
    ],
    process: ["Recolección", "Análisis", "Hallazgos", "Plan", "Siguientes pasos"],
    stack: ["Auditoría", "SEO/GEO", "Redes sociales", "Redacción comercial", "Analítica"],
    faq: [
      {
        q: "¿Necesito tener mucho contenido publicado?",
        a: "No. Podemos evaluar lo existente y proponer una línea editorial desde cero si hace falta.",
      },
      {
        q: "¿Incluye calendario de publicaciones?",
        a: "Puede incluir recomendaciones base o conectarse con la solución de software automatizado para publicaciones.",
      },
    ],
    related: ["creacion-edicion-videos", "seo-y-geo", "software-automatizado-publicaciones-redes-sociales"],
  },
  {
    slug: "creacion-edicion-videos",
    category: "marketing",
    categoryLabel: "Consulta de marketing",
    icon: "zap",
    title: "Creación y edición de videos",
    shortTitle: "Videos",
    metaTitle: "Creación y edición profesional de videos",
    metaDescription:
      "Guiones, edición profesional y optimización de videos para redes sociales, campañas y contenido empresarial.",
    eyebrow: "Video marketing",
    heroTitle: "Videos con guion, edición y objetivo comercial",
    summary:
      "Creamos guiones y editamos videos para explicar, vender, educar y alimentar tus campañas.",
    description:
      "Transformamos ideas y material bruto en piezas de video claras, dinámicas y útiles para redes, Ads o páginas de venta.",
    outcomes: [
      "Contenido más profesional y consistente.",
      "Mejor retención y claridad del mensaje.",
      "Piezas listas para campañas o publicaciones.",
    ],
    deliverables: [
      "Guion o estructura",
      "Edición profesional",
      "Subtítulos",
      "Versiones por formato",
      "Recomendaciones de publicación",
    ],
    process: ["Objetivo", "Guion", "Material", "Edición", "Entrega"],
    stack: ["Guion", "Edición", "Videos cortos", "Ads", "Redes sociales"],
    faq: [
      {
        q: "¿Pueden trabajar con videos grabados por mi equipo?",
        a: "Sí. Podemos editar material existente y guiarte para grabar mejores tomas.",
      },
      {
        q: "¿Sirve para anuncios?",
        a: "Sí. Podemos preparar versiones pensadas para retención, claridad y CTA publicitario.",
      },
    ],
    related: ["evaluacion-contenido-empresa", "gestion-control-ads", "evaluacion-redes-sociales-estrategia-digital-publicidad"],
  },
  {
    slug: "evaluacion-redes-sociales-estrategia-digital-publicidad",
    category: "marketing",
    categoryLabel: "Consulta de marketing",
    icon: "chart",
    title: "Evaluación de tus redes sociales y estrategia digital de publicidad",
    shortTitle: "Auditoría de redes",
    metaTitle: "Evaluación de redes sociales y estrategia digital",
    metaDescription:
      "Auditoría de redes sociales, estrategia digital y publicidad para mejorar contenido, campañas y conversión.",
    eyebrow: "Estrategia digital",
    heroTitle: "Una revisión completa de redes, oferta y publicidad",
    summary:
      "Evaluamos presencia social, mensaje, pauta, contenido y ruta de conversión para encontrar mejoras de alto impacto.",
    description:
      "Revisamos redes sociales y publicidad como un sistema: qué atrae, qué convierte, dónde se pierden leads y qué ajustar.",
    outcomes: [
      "Prioridades claras para mejorar la estrategia.",
      "Mejor alineación entre contenido y campañas.",
      "Recomendaciones accionables para corto plazo.",
    ],
    deliverables: [
      "Auditoría de perfiles",
      "Análisis de publicaciones",
      "Revisión de campañas",
      "Mapa de embudo",
      "Plan de mejoras",
    ],
    process: ["Accesos o evidencias", "Auditoría", "Diagnóstico", "Plan", "Acompañamiento opcional"],
    stack: ["Instagram", "Meta Ads", "Google Ads", "Analítica", "Redacción comercial"],
    faq: [
      {
        q: "¿Necesitan acceso a mis cuentas?",
        a: "Podemos empezar con capturas y datos exportados; para análisis profundo, conviene acceso temporal y controlado.",
      },
      {
        q: "¿También implementan las mejoras?",
        a: "Sí. Podemos pasar de auditoría a ejecución con landing, Ads, automatización o contenido.",
      },
    ],
    related: ["evaluacion-inversion-ads", "evaluacion-contenido-empresa", "landing-pages"],
  },
  {
    slug: "evaluacion-inversion-ads",
    category: "marketing",
    categoryLabel: "Consulta de marketing",
    icon: "chart",
    title: "Evaluación de inversión en Ads",
    shortTitle: "Inversión Ads",
    metaTitle: "Evaluación de inversión en Ads",
    metaDescription:
      "Evaluamos tu inversión en Google Ads y Meta Ads para detectar fugas, oportunidades y decisiones de presupuesto.",
    eyebrow: "Presupuesto publicitario",
    heroTitle: "Descubre si tu inversión en Ads está trabajando a favor del negocio",
    summary:
      "Analizamos presupuesto, campañas, leads, conversiones y retorno para optimizar la inversión.",
    description:
      "Revisamos si tus campañas están atrayendo al público correcto, si la landing convierte y si el presupuesto tiene sentido frente al retorno.",
    outcomes: [
      "Identificar campañas que consumen presupuesto sin retorno.",
      "Mejorar distribución por canal, audiencia u oferta.",
      "Tomar decisiones con métricas y no con suposiciones.",
    ],
    deliverables: [
      "Diagnóstico de inversión",
      "Lectura de métricas clave",
      "Recomendaciones de presupuesto",
      "Acciones rápidas",
      "Plan de optimización",
    ],
    process: ["Recolección de datos", "Lectura de métricas", "Hallazgos", "Plan", "Seguimiento"],
    stack: ["Google Ads", "Meta Ads", "GA4", "CRM", "ROI"],
    faq: [
      {
        q: "¿Necesitan acceso a Ads?",
        a: "Para un diagnóstico profundo sí conviene acceso temporal, pero también podemos iniciar con reportes exportados.",
      },
      {
        q: "¿Incluye cálculo de ROI?",
        a: "Puede incluirlo, y si necesitas una herramienta continua tenemos la solución de cálculo de ROI publicitario.",
      },
    ],
    related: ["calculo-roi-publicitario", "gestion-control-ads", "landing-pages"],
  },
  {
    slug: "calculo-roi-publicitario",
    category: "marketing",
    categoryLabel: "Consulta de marketing",
    icon: "chart",
    title: "Cálculo de ROI publicitario",
    shortTitle: "ROI publicitario",
    metaTitle: "Cálculo de ROI publicitario",
    metaDescription:
      "Calcula y visualiza el retorno de inversión publicitaria conectando gasto, leads, ventas y margen.",
    eyebrow: "Rentabilidad publicitaria",
    heroTitle: "Mide el ROI real de tus campañas y decide con números",
    summary:
      "Conecta inversión, leads, ventas y margen para saber qué campañas realmente generan retorno.",
    description:
      "Creamos modelos o paneles para calcular ROI publicitario según tu negocio, ticket, margen, canal y conversión real.",
    outcomes: [
      "Entender qué canal produce ventas rentables.",
      "Detectar campañas que generan leads pero no margen.",
      "Planificar presupuesto con mayor confianza.",
    ],
    deliverables: [
      "Modelo de ROI",
      "Panel o calculadora",
      "Variables de negocio",
      "Reporte por canal",
      "Recomendaciones",
    ],
    process: ["Variables", "Datos", "Modelo", "Panel", "Optimización"],
    stack: ["Hojas de cálculo", "Paneles", "GA4", "Ads", "Análisis de datos"],
    faq: [
      {
        q: "¿Qué datos necesito?",
        a: "Inversión, leads, ventas, ticket promedio, margen y fuente. Si no están ordenados, también te ayudamos a estructurarlos.",
      },
      {
        q: "¿Puede ser automático?",
        a: "Sí. Podemos convertirlo en panel conectado a fuentes de datos para reducir carga manual.",
      },
    ],
    related: ["panel-monitor-administrativo-inteligente", "evaluacion-inversion-ads", "gestion-control-ads"],
  },
  {
    slug: "software-automatizado-publicaciones-redes-sociales",
    category: "marketing",
    categoryLabel: "Consulta de marketing",
    icon: "package",
    title: "Software automatizado para publicaciones en redes sociales",
    shortTitle: "Publicador de redes",
    metaTitle: "Software automatizado para publicaciones en redes sociales",
    metaDescription:
      "Software para planificar, organizar y automatizar publicaciones en redes sociales con flujos de contenido y control.",
    eyebrow: "Operación de contenido",
    heroTitle: "Un sistema para organizar y automatizar publicaciones en redes",
    summary:
      "Planifica contenido, estados, responsables y publicaciones para que tu estrategia no dependa de memoria o improvisación.",
    description:
      "Creamos herramientas para ordenar calendarios, piezas, guiones, aprobaciones y publicación automatizada o semi-automatizada en redes.",
    outcomes: [
      "Más consistencia en publicaciones.",
      "Menos caos entre ideas, edición, aprobación y publicación.",
      "Mejor conexión entre contenido, campañas y resultados.",
    ],
    deliverables: [
      "Calendario de contenido",
      "Flujo de estados",
      "Roles y aprobaciones",
      "Automatización de publicación",
      "Reporte básico",
    ],
    process: ["Flujo actual", "Modelo editorial", "Sistema", "Integración", "Uso con equipo"],
    stack: ["Next.js", "APIs sociales", "Automatización", "IA", "Paneles"],
    faq: [
      {
        q: "¿Publica automáticamente?",
        a: "Puede hacerlo cuando la API del canal lo permite. También podemos diseñarlo como sistema de aprobación y recordatorios.",
      },
      {
        q: "¿Puede usar IA para ideas?",
        a: "Sí. Podemos incluir generación asistida de ideas, guiones o textos para publicaciones con revisión humana.",
      },
    ],
    related: ["evaluacion-contenido-empresa", "creacion-edicion-videos", "respuestas-automatizadas-comentarios-redes-sociales"],
  },
];

export const serviceCategoryMap = serviceCategories.map((category) => ({
  ...category,
  services: services.filter((service) => service.category === category.id),
}));

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const navLinks = [
  { href: "/#servicios", label: "Soluciones" },
  { href: "/#casos", label: "Casos" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#planes", label: "Planes" },
  { href: "/#faq", label: "FAQ" },
];

export const megaMenuColumns: MegaMenuColumn[] = [
  {
    eyebrow: "Engineering & Growth",
    title: "Infraestructura que convierte y escala",
    items: [
      {
        title: "Arquitectura Web",
        description: "Next.js, WordPress, Shopify y sitios corporativos preparados para SEO, velocidad y campañas.",
        href: "/servicios/paginas-web-corporativas",
      },
      {
        title: "Software a Medida",
        description: "Sistemas internos, paneles, roles, reportes y flujos operativos para reducir trabajo manual.",
        href: "/servicios/desarrollo-de-software",
      },
      {
        title: "Automatizaciones/APIs",
        description: "Conexiones entre formularios, WhatsApp, bases de datos, CRM y herramientas del equipo.",
        href: "/servicios/control-gestion-atencion-leads",
      },
      {
        title: "Adquisición/Data Analytics",
        description: "Ads, SEO/GEO, ROI publicitario y paneles para decidir con datos reales.",
        href: "/servicios/panel-monitor-administrativo-inteligente",
      },
    ],
  },
  {
    eyebrow: "Creative & Strategy",
    title: "Ecosistemas para autoridad y conversión",
    items: [
      {
        title: "Auditorías de Ecosistemas",
        description: "Lectura de web, contenido, redes, campañas y embudo para encontrar fugas de oportunidad.",
        href: "/servicios/evaluacion-redes-sociales-estrategia-digital-publicidad",
      },
      {
        title: "Producción Audiovisual CRO",
        description: "Guiones y edición con objetivo comercial, retención y claridad para campañas o autoridad.",
        href: "/servicios/creacion-edicion-videos",
      },
      {
        title: "Autoridad de Marca",
        description: "Contenido, SEO/GEO y publicaciones con consistencia para que la empresa sea más confiable.",
        href: "/servicios/evaluacion-contenido-empresa",
      },
    ],
  },
];

export const premiumStack = [
  "PostgreSQL",
  "React",
  "Next.js",
  "WordPress",
  "Shopify",
  "Meta Business",
  "Zapier",
  "Google Workspace",
  "SMTP/API",
  "Laravel",
  "Python",
  "GA4",
  "CRM",
];

export const workflowSteps: WorkflowStep[] = [
  {
    label: "01",
    title: "Clic en anuncio",
    description: "El tráfico pagado llega con intención y se identifica desde la campaña correcta.",
  },
  {
    label: "02",
    title: "Lead capturado",
    description: "Formulario, WhatsApp o landing registran datos sin perder contexto comercial.",
  },
  {
    label: "03",
    title: "Base relacional",
    description: "El lead queda ordenado en una estructura segura para consulta, trazabilidad y análisis.",
  },
  {
    label: "04",
    title: "CRM y seguimiento",
    description: "El equipo recibe tareas, estados y recordatorios para recuperar oportunidades a tiempo.",
  },
  {
    label: "05",
    title: "Panel de ROI",
    description: "La dirección ve costos, fuente, conversión y retorno para ajustar inversión.",
  },
];

export const cases = [
  {
    client: "Champion Motors",
    sector: "Concesionario de autos",
    desc: "Web del concesionario + ChampionDesk: bot de Telegram que genera contratos y cotizaciones, lee cédulas con OCR, se integra con Zoho CRM y Google Drive, y envía recordatorios de saldos.",
    tags: ["Laravel", "Python", "Telegram", "Zoho CRM"],
  },
  {
    client: "Camsmark",
    sector: "E-commerce multi-país",
    desc: "Tienda online única con dos mercados: precio, moneda, inventario y proceso de pago separados por país. Construida para administrar ventas sin duplicar operación.",
    tags: ["Laravel", "Filament", "MySQL"],
  },
  {
    client: "LIBRO",
    sector: "Contabilidad fiscal",
    desc: "Sistema contable multi-país con partida doble, estados financieros y reportería fiscal para Panamá y Venezuela.",
    tags: ["TypeScript", "Contabilidad", "Fiscal"],
  },
  {
    client: "GymFlow",
    sector: "SaaS para entrenadores",
    desc: "Plataforma para entrenadores personales: planes de entrenamiento, seguimiento de RPE y check-ins diarios.",
    tags: ["JavaScript", "SaaS", "React"],
  },
  {
    client: "EventosQR",
    sector: "Gestión de eventos",
    desc: "Registro y validación de asistentes mediante códigos QR con verificación visual en la entrada.",
    tags: ["Next.js", "TypeScript", "QR"],
  },
  {
    client: "DukeGBP + marketing bots",
    sector: "Marketing con IA",
    desc: "Analizador de Google Business Profile con recomendaciones generadas por IA, auto-respuesta de comentarios y publicador automático de contenido.",
    tags: ["Python", "IA", "Instagram"],
  },
];

export const team = [
  { name: "Antonio Duque", role: "Co-fundador", initials: "AD" },
  { name: "Noe Rivas", role: "Co-fundador", initials: "NR" },
  {
    name: "Equipo de desarrollo",
    role: "Desarrolladores y especialistas que se integran según cada proyecto",
    initials: null,
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Diagnóstico",
    desc: "Entendemos tu negocio y detectamos qué procesos te quitan más tiempo.",
  },
  {
    step: 2,
    title: "Propuesta",
    desc: "Te presentamos la solución, el alcance y el presupuesto claro.",
  },
  {
    step: 3,
    title: "Desarrollo",
    desc: "Construimos con entregas parciales para que la solución se vea crecer.",
  },
  {
    step: 4,
    title: "Puesta en marcha",
    desc: "Instalamos, migramos datos y capacitamos a tu equipo.",
  },
  {
    step: 5,
    title: "Soporte",
    desc: "Acompañamos con mantenimiento y mejoras continuas.",
  },
];

export const plans = [
  {
    name: "Presencia digital",
    tagline: "Para empezar a existir en internet",
    price: "Desde $600",
    features: ["Sitio web o landing profesional", "Optimizado para Google", "Formulario y WhatsApp", "Diseño responsive"],
    featured: false,
  },
  {
    name: "Automatización",
    tagline: "Para dejar de trabajar manual",
    price: "Desde $1,500",
    features: ["Tienda online o app a medida", "Bots y automatización", "Integraciones", "Panel de administración"],
    featured: true,
  },
  {
    name: "Solución completa",
    tagline: "Digitaliza todo el negocio",
    price: "Cotización",
    features: ["Sistema integral", "Marketing e IA", "Análisis de datos", "Soporte y evolución continua"],
    featured: false,
  },
];

export const faqs = [
  {
    q: "¿Trabajan con negocios pequeños o solo grandes empresas?",
    a: "Trabajamos con PYMEs de todos los tamaños. Empezamos con lo que más impacto te dé y crecemos desde ahí.",
  },
  {
    q: "¿Cuánto cuesta digitalizar mi negocio?",
    a: "Depende de lo que necesites. Una presencia digital arranca desde $600 y una automatización a medida desde $1,500.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Una web sencilla puede estar en 1-2 semanas. Una plataforma completa suele tomar entre 4 y 12 semanas.",
  },
  {
    q: "¿Puedo seguir usando mi WhatsApp e Instagram?",
    a: "Sí. Conectamos tus herramientas actuales con los nuevos sistemas para que trabajen juntas.",
  },
  {
    q: "¿Ofrecen soporte después del lanzamiento?",
    a: "Sí. Tenemos planes de mantenimiento y mejoras continuas para que la solución evolucione con tu negocio.",
  },
];

export const benefits = [
  "Menos tareas manuales y menos errores repetidos.",
  "Mejor atención a leads desde WhatsApp, redes y formularios.",
  "Datos claros para decidir sobre ventas, Ads y operación.",
  "Infraestructura web preparada para SEO, GEO, campañas, WordPress, Shopify y sistemas a medida.",
];

export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "WordPress",
  "Shopify",
  "Laravel",
  "Python",
  "Supabase",
  "PostgreSQL",
  "Zapier",
  "Google Workspace",
  "Meta Ads",
  "Google Ads",
  "SMTP/API",
  "IA",
];
