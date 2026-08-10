/**
 * Páginas por industria (nicho vertical).
 *
 * Las páginas de servicio compiten por términos generales ("desarrollo de
 * software") donde un dominio nuevo no tiene ninguna opción. Estas compiten por
 * la intersección industria + problema, donde los competidores se cuentan por
 * decenas y no por miles, y el visitante llega con la necesidad ya definida.
 *
 * Regla de contenido: solo se describe lo que existe y está en producción. Sin
 * métricas inventadas ni clientes que no hayan sido publicados ya en la web.
 */

export type Industria = {
  slug: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  intro: string;
  problemas: string[];
  construimos: Array<{ title: string; desc: string }>;
  caso: { client: string; desc: string; detalles: string[] };
  faq: Array<{ q: string; a: string }>;
  serviciosRelacionados: string[];
  whatsapp: string;
};

export const industrias: Industria[] = [
  {
    slug: "concesionarios-de-autos",
    eyebrow: "Automoción",
    metaTitle: "Software para concesionarios de autos",
    metaDescription:
      "Automatizamos contratos, cotizaciones y seguimiento de saldos para concesionarios de autos, con lectura de documentos por OCR e integración con CRM.",
    heroTitle: "Software y automatización para concesionarios de autos",
    intro:
      "Un concesionario pierde horas en tareas que no venden un carro: redactar contratos, copiar datos de una cédula a un formulario, rehacer cotizaciones y perseguir saldos pendientes. Construimos sistemas que hacen ese trabajo solos y dejan al vendedor vendiendo.",
    problemas: [
      "Contratos y cotizaciones que se redactan a mano, uno por uno, con riesgo de errores en cifras y datos del cliente.",
      "Datos del comprador que se transcriben desde la cédula y se vuelven a escribir en cada documento.",
      "Saldos y abonos que se controlan en hojas de cálculo y se olvidan hasta que el cliente reclama.",
      "Información del cliente repartida entre WhatsApp, correo, el CRM y la carpeta compartida.",
    ],
    construimos: [
      {
        title: "Generación automática de contratos",
        desc: "El vendedor responde unas preguntas y el sistema arma el contrato y la cotización con los datos correctos, listos para firmar.",
      },
      {
        title: "Lectura de documentos con OCR",
        desc: "La cédula del cliente se lee automáticamente y los datos entran al sistema sin transcribir nada a mano.",
      },
      {
        title: "Integración con tu CRM y tu nube",
        desc: "Cada operación queda registrada en el CRM y los documentos archivados en la nube de la empresa, sin pasos manuales.",
      },
      {
        title: "Recordatorios de saldos pendientes",
        desc: "El sistema avisa de los abonos por cobrar antes de que se conviertan en un problema de caja.",
      },
      {
        title: "Operación desde el teléfono",
        desc: "Todo el flujo funciona desde un bot de mensajería, así que el vendedor lo usa en el piso de ventas y no atado a un escritorio.",
      },
    ],
    caso: {
      client: "Champion Motors",
      desc: "Concesionario de autos para el que construimos la web y ChampionDesk, el sistema que hoy maneja su operación documental.",
      detalles: [
        "Bot de Telegram que genera contratos y cotizaciones",
        "Lectura de cédulas con OCR",
        "Integración con Zoho CRM y Google Drive",
        "Recordatorios automáticos de saldos",
      ],
    },
    faq: [
      {
        q: "¿Sirve si ya uso un CRM?",
        a: "Sí, es lo habitual. El sistema se conecta con el CRM que ya usas en vez de reemplazarlo. En el caso de Champion Motors la integración es con Zoho CRM.",
      },
      {
        q: "¿Mis vendedores tienen que aprender un programa nuevo?",
        a: "No necesariamente. La operación puede vivir dentro de una app de mensajería que ya usan a diario, con preguntas guiadas. Esa fue la decisión de diseño en Champion Motors y por eso se adoptó rápido.",
      },
      {
        q: "¿Puede adaptarse a mis formatos de contrato?",
        a: "Sí. Los documentos se generan a partir de tus propias plantillas, con tus cláusulas y tu formato. No trabajamos con un contrato genérico.",
      },
      {
        q: "¿Cuánto toma implementarlo?",
        a: "Depende del volumen de documentos y de las integraciones. Lo definimos en el diagnóstico inicial, que no tiene costo, y lo entregamos por etapas para que empieces a usar lo primero sin esperar a que esté todo.",
      },
    ],
    serviciosRelacionados: [
      "desarrollo-de-software",
      "control-gestion-atencion-leads",
      "chatbot-whatsapp-redes-sociales-ia",
    ],
    whatsapp:
      "Hola DukeCrea, tengo un concesionario de autos y quiero automatizar contratos y cotizaciones. ¿Podemos hablar?",
  },
  {
    slug: "tiendas-multi-pais",
    eyebrow: "Retail y e-commerce",
    metaTitle: "E-commerce multi-país con inventario separado",
    metaDescription:
      "Una sola tienda online para vender en varios países, con precio, moneda, inventario y proceso de pago separados por mercado y una única administración.",
    heroTitle: "E-commerce para vender en varios países sin duplicar la operación",
    intro:
      "Cuando una marca vende en dos países, lo normal es terminar con dos tiendas, dos inventarios y dos formas de cobrar. Nosotros construimos una sola plataforma que separa lo que debe ir separado (precio, moneda, stock y pago) y unifica lo que debe ir junto (catálogo, pedidos y administración).",
    problemas: [
      "Dos tiendas distintas que hay que actualizar por separado cada vez que cambia un producto.",
      "Precios y monedas que no pueden ser iguales en ambos mercados, pero que hoy se manejan a mano.",
      "Inventario compartido en el papel y separado en la realidad, con ventas de productos que no hay en ese país.",
      "Medios de pago que funcionan en un mercado y no en el otro.",
      "Reportes que hay que juntar a mano para saber cómo va cada país.",
    ],
    construimos: [
      {
        title: "Catálogo único, reglas por país",
        desc: "Un solo producto, con precio, moneda, impuestos y disponibilidad definidos por mercado.",
      },
      {
        title: "Inventario separado por operación",
        desc: "Cada país descuenta de su propio stock, así no vendes lo que no tienes en esa bodega.",
      },
      {
        title: "Proceso de pago por mercado",
        desc: "Cada país con los medios de pago que realmente funcionan ahí, sin obligar al cliente a un método que no puede usar.",
      },
      {
        title: "Una sola administración",
        desc: "Tu equipo entra a un único panel para gestionar productos, pedidos y clientes de todos los mercados.",
      },
      {
        title: "Integración con el sistema que ya usas",
        desc: "La tienda puede conectarse con el ERP o el sistema administrativo que la empresa ya tiene, en vez de obligarte a cambiarlo.",
      },
    ],
    caso: {
      client: "Camsmark",
      desc: "Tienda online única con dos mercados, construida para administrar ventas sin duplicar la operación.",
      detalles: [
        "Precio y moneda separados por país",
        "Inventario y proceso de pago independientes",
        "Catálogo y administración unificados",
        "Construida sobre Laravel y Filament",
      ],
    },
    faq: [
      {
        q: "¿Por qué no simplemente dos tiendas separadas?",
        a: "Porque duplicas el trabajo para siempre: cada producto, cada foto y cada cambio de precio se hace dos veces, y los reportes hay que unirlos a mano. Una plataforma con reglas por país cuesta más al construirla y mucho menos al operarla.",
      },
      {
        q: "¿Puedo empezar con un país y sumar otro después?",
        a: "Sí, y suele ser lo más sensato. Se construye con la estructura multi-país desde el inicio y se activa el segundo mercado cuando la operación esté lista.",
      },
      {
        q: "¿Se integra con mi sistema administrativo o mi ERP?",
        a: "Sí. La tienda puede sincronizarse con el sistema que la empresa ya usa para no llevar dos inventarios distintos.",
      },
      {
        q: "¿Sirve para más de dos países?",
        a: "La estructura es la misma: cada mercado tiene sus reglas de precio, moneda, stock y pago. Sumar un tercero es configuración, no un desarrollo nuevo desde cero.",
      },
    ],
    serviciosRelacionados: ["e-commerce", "desarrollo-de-software", "panel-monitor-administrativo-inteligente"],
    whatsapp:
      "Hola DukeCrea, quiero vender en varios países con una sola tienda. ¿Podemos hablar?",
  },
];

export function getIndustriaBySlug(slug: string) {
  return industrias.find((industria) => industria.slug === slug);
}
