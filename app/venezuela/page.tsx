import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, WhatsAppIcon } from "../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../marketing-layout";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../lib/seo";
import { getWhatsAppUrl, services, siteConfig } from "../lib/site";

const metaTitle = "Software e IA para empresas en Venezuela";
const metaDescription =
  "Desarrollo de software, e-commerce, automatización con IA y Ads para empresas en Venezuela. Trabajamos en remoto y con operación multi-país Panamá-Venezuela.";

const baseMetadata = buildMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/venezuela",
  locale: "es_VE",
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "/venezuela",
    languages: {
      "es-PA": "/",
      "es-VE": "/venezuela",
      "x-default": "/",
    },
  },
};

const whatsappUrl = getWhatsAppUrl(
  "Hola DukeCrea, tengo una empresa en Venezuela y quiero digitalizarla. ¿Podemos hablar?",
);

const casos = [
  {
    client: "Camsmark",
    sector: "E-commerce multi-país",
    desc: "Tienda online única con dos mercados: precio, moneda, inventario y proceso de pago separados por país. Construida para administrar ventas sin duplicar operación.",
  },
  {
    client: "LIBRO",
    sector: "Contabilidad fiscal",
    desc: "Sistema contable multi-país con partida doble, estados financieros y reportería fiscal para Panamá y Venezuela.",
  },
];

const comoTrabajamos = [
  {
    title: "Todo el proceso es remoto",
    desc: "Levantamiento, avances y entregas por WhatsApp y videollamada. No hace falta que estés en Panamá ni que nosotros viajemos a Venezuela.",
  },
  {
    title: "Entregamos en la nube",
    desc: "Tu web, tienda o sistema queda desplegado en infraestructura internacional, accesible desde cualquier país y sin depender de un servidor local.",
  },
  {
    title: "Pensado para operar en dos países",
    desc: "Si vendes o facturas en Venezuela y en Panamá, construimos el sistema para manejar precios, monedas, inventario y reportes separados desde una sola administración.",
  },
];

const faq = [
  {
    q: "¿Trabajan con empresas que están en Venezuela?",
    a: "Sí. El trabajo es remoto de principio a fin: reuniones por videollamada, seguimiento por WhatsApp y entrega en la nube. Ya tenemos sistemas en producción que operan con Venezuela y Panamá al mismo tiempo.",
  },
  {
    q: "¿Pueden manejar una operación en dos países a la vez?",
    a: "Es justamente lo que hicimos en Camsmark y en LIBRO: precio, moneda, inventario, facturación y reportes separados por país, administrados desde un solo panel, sin montar dos sistemas paralelos.",
  },
  {
    q: "¿Qué servicios aplican para una empresa venezolana?",
    a: "Los mismos que ofrecemos en Panamá: páginas web, tiendas online, software a medida, chatbots de WhatsApp con IA, automatizaciones, paneles administrativos, gestión de Ads y auditorías de contenido y redes.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Escríbenos por WhatsApp y agendamos un diagnóstico inicial sin costo. Revisamos tu operación actual y te proponemos una ruta concreta, con alcance y orden de prioridades.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo de software, automatización e IA para empresas en Venezuela",
    url: `${siteConfig.url}/venezuela`,
    description: metaDescription,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Venezuela" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
  {
    "@context": "https://schema.org",
    ...breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Empresas en Venezuela", path: "/venezuela" },
    ]),
  },
];

export default function VenezuelaPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <MarketingHeader whatsappMessage="Hola DukeCrea, tengo una empresa en Venezuela y quiero digitalizarla. ¿Podemos hablar?" />

      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Empresas en Venezuela", href: "/venezuela" }]} />
              <div className="mb-5 inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-semibold text-lime-300">Venezuela · Trabajo 100% remoto</div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">Software, automatización e IA para empresas en <span className="text-lime-400">Venezuela</span></h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">Desarrollamos webs, tiendas online, software a medida y automatizaciones con inteligencia artificial para empresas venezolanas. Tenemos sistemas en producción que operan con Venezuela y Panamá al mismo tiempo.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3 font-bold text-gray-950 shadow-lg shadow-lime-400/20 transition hover:-translate-y-0.5 hover:bg-lime-300"><WhatsAppIcon className="h-5 w-5" />Solicitar diagnóstico gratis</a>
                <Link href="/servicios" className="rounded-lg border-2 border-gray-700 px-8 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-400">Ver todas las soluciones</Link>
              </div>
            </div>
            <SystemVisual labels={["Operación remota", "Multi-país", "Automatización", "Soporte"]} />
          </div>
        </section>

        <section className="border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
              Cómo trabajamos
            </p>
            <h2 className="text-3xl font-bold text-white">
              La distancia no es el problema, la operación sí
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {comoTrabajamos.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-800 bg-gray-950 p-6">
                  <CheckIcon className="mb-4 h-5 w-5 text-lime-400" />
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
              Casos multi-país
            </p>
            <h2 className="text-3xl font-bold text-white">
              Sistemas nuestros que ya operan con Venezuela
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {casos.map((caso) => (
                <div key={caso.client} className="rounded-xl border border-gray-800 bg-gray-950 p-6">
                  <p className="text-sm font-semibold text-lime-300">{caso.sector}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{caso.client}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{caso.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
              Soluciones
            </p>
            <h2 className="text-3xl font-bold text-white">Qué podemos construir para tu empresa</h2>
            <p className="mt-4 max-w-3xl leading-7 text-gray-400">
              Todo nuestro catálogo aplica igual para una empresa venezolana. Estas son las
              soluciones disponibles.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className="rounded-xl border border-gray-800 bg-gray-950 p-5 transition hover:-translate-y-1 hover:border-lime-400/70"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-lime-300">
                    {service.categoryLabel}
                  </p>
                  <h3 className="mt-2 font-bold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{service.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
                Preguntas
              </p>
              <h2 className="text-3xl font-bold text-white">Dudas frecuentes</h2>
              <p className="mt-4 leading-7 text-gray-400">
                Lo que suelen preguntarnos las empresas venezolanas antes de empezar.
              </p>
            </div>
            <div className="space-y-4">
              {faq.map((item) => (
                <details key={item.q} className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                  <summary className="cursor-pointer font-bold text-white hover:text-lime-400">
                    {item.q}
                  </summary>
                  <p className="mt-4 leading-7 text-gray-400">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-gray-950">¿Empezamos con tu empresa?</h2>
            <p className="mt-5 text-xl leading-8 text-gray-900">
              Cuéntanos cómo operas hoy y te proponemos una ruta concreta. El diagnóstico inicial no
              tiene costo.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gray-950 px-8 py-3 font-bold text-white transition hover:bg-gray-800"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Hablar con DukeCrea
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
