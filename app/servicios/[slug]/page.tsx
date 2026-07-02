import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, WhatsAppIcon } from "../../icons";
import { getServiceBySlug, getWhatsAppUrl, services, siteConfig } from "../../lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Servicio no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const url = `/servicios/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "es_PA",
      url,
      title: service.metaTitle,
      description: service.metaDescription,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const relatedServices = service.related
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((related): related is NonNullable<typeof related> => Boolean(related));

  const serviceUrl = `${siteConfig.url}/servicios/${service.slug}`;
  const whatsappUrl = getWhatsAppUrl(`Hola DukeCrea, quiero información sobre ${service.title}.`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      category: service.categoryLabel,
      description: service.metaDescription,
      url: serviceUrl,
      provider: {
        "@type": "ProfessionalService",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
      },
      areaServed: [
        { "@type": "Country", name: "Panamá" },
        { "@type": "Country", name: "Venezuela" },
      ],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: serviceUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Soluciones",
          item: `${siteConfig.url}/#servicios`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: serviceUrl,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <header className="border-b border-gray-900 bg-black/95">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="DukeCrea inicio">
            <div className="h-8 w-8 rounded-lg bg-lime-400 shadow-lg shadow-lime-400/50" />
            <span className="text-lg font-bold text-white">DukeCrea</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm" aria-label="Navegación de solución">
            <Link href="/#servicios" className="font-medium text-gray-300 transition hover:text-lime-400">
              Soluciones
            </Link>
            <Link href="/#casos" className="font-medium text-gray-300 transition hover:text-lime-400">
              Casos
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 font-bold text-gray-950 transition hover:bg-lime-300"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Hablemos
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-semibold text-lime-300">
                {service.categoryLabel} · {service.eyebrow}
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
                {service.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3 font-bold text-gray-950 shadow-lg shadow-lime-400/20 transition hover:-translate-y-0.5 hover:bg-lime-300"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Solicitar diagnóstico
                </a>
                <Link
                  href="/#servicios"
                  className="rounded-lg border-2 border-gray-700 px-8 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
                >
                  Ver todas las soluciones
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-gray-800 bg-black p-6">
              <h2 className="text-xl font-bold text-white">Resultados esperados</h2>
              <ul className="mt-5 space-y-4">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm leading-6 text-gray-300">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-lime-400" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
                Entregables
              </p>
              <h2 className="text-3xl font-bold text-white">Qué incluye esta solución</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.deliverables.map((deliverable) => (
                  <div key={deliverable} className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                    <CheckIcon className="mb-3 h-5 w-5 text-lime-400" />
                    <p className="text-sm font-medium text-gray-200">{deliverable}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="rounded-xl border border-gray-800 bg-gray-950 p-6">
              <h3 className="text-lg font-bold text-white">Stack y herramientas</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.stack.map((item) => (
                  <span key={item} className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-200">
                    {item}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
              Proceso
            </p>
            <h2 className="text-center text-3xl font-bold text-white">Cómo lo implementamos</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-5">
              {service.process.map((step, index) => (
                <div key={step} className="rounded-xl border border-gray-800 bg-gray-950 p-5 text-center">
                  <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-lime-400 font-bold text-gray-950">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
                Preguntas
              </p>
              <h2 className="text-3xl font-bold text-white">Dudas frecuentes</h2>
              <p className="mt-4 leading-7 text-gray-400">
                Respuestas rápidas para entender alcance, tiempos y forma de trabajo antes de pedir diagnóstico.
              </p>
            </div>
            <div className="space-y-4">
              {service.faq.map((faq) => (
                <details key={faq.q} className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                  <summary className="cursor-pointer font-bold text-white hover:text-lime-400">{faq.q}</summary>
                  <p className="mt-4 leading-7 text-gray-400">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold text-white">Soluciones relacionadas</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/servicios/${related.slug}`}
                    className="rounded-xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-lime-400/70"
                  >
                    <p className="text-sm font-semibold text-lime-300">{related.categoryLabel}</p>
                    <h3 className="mt-2 text-lg font-bold text-white">{related.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400">{related.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-gray-950">¿Lo implementamos para tu negocio?</h2>
            <p className="mt-5 text-xl leading-8 text-gray-900">
              Cuéntanos tu caso y te proponemos una ruta concreta para empezar con esta solución.
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
    </div>
  );
}

