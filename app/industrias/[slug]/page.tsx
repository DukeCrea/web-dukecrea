import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, WhatsAppIcon } from "../../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../../marketing-layout";
import { caseStudies } from "../../lib/content";
import { getIndustriaBySlug, industrias } from "../../lib/industrias";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../../lib/seo";
import { getServiceBySlug, getWhatsAppUrl, siteConfig } from "../../lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return industrias.map((industria) => ({ slug: industria.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industria = getIndustriaBySlug(slug);

  if (!industria) {
    return {
      title: "Industria no encontrada",
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: industria.metaTitle,
    description: industria.metaDescription,
    path: `/industrias/${industria.slug}`,
  });
}

export default async function IndustriaPage({ params }: Props) {
  const { slug } = await params;
  const industria = getIndustriaBySlug(slug);

  if (!industria) notFound();

  const url = `${siteConfig.url}/industrias/${industria.slug}`;
  const whatsappUrl = getWhatsAppUrl(industria.whatsapp);
  const relacionados = industria.serviciosRelacionados
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service) => service !== undefined);
  const relatedCase = caseStudies.find((item) => item.client === industria.caso.client);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: industria.metaTitle,
      url,
      description: industria.metaDescription,
      provider: { "@id": organizationId },
      areaServed: [
        { "@type": "Country", name: "Panamá" },
        { "@type": "Country", name: "Venezuela" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: industria.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      ...breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Industrias", path: "/servicios" },
        { name: industria.eyebrow, path: `/industrias/${industria.slug}` },
      ]),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <MarketingHeader whatsappMessage={industria.whatsapp} />

      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Soluciones", href: "/servicios" }, { label: industria.eyebrow, href: `/industrias/${industria.slug}` }]} />
              <div className="mb-5 inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-semibold text-lime-300">{industria.eyebrow}</div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">{industria.heroTitle}</h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">{industria.intro}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3 font-bold text-gray-950 shadow-lg shadow-lime-400/20 transition hover:-translate-y-0.5 hover:bg-lime-300"><WhatsAppIcon className="h-5 w-5" />Solicitar diagnóstico gratis</a>
                <Link href="/casos" className="rounded-lg border-2 border-gray-700 px-8 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-400">Ver casos reales</Link>
              </div>
            </div>
            <SystemVisual labels={industria.construimos.slice(0, 4).map((item) => item.title)} />
          </div>
        </section>

        <section className="border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
              El problema
            </p>
            <h2 className="text-3xl font-bold text-white">Lo que suele estar pasando</h2>
            <ul className="mt-8 space-y-4">
              {industria.problemas.map((problema) => (
                <li
                  key={problema}
                  className="rounded-xl border border-gray-800 bg-gray-950 p-5 leading-7 text-gray-300"
                >
                  {problema}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
              La solución
            </p>
            <h2 className="text-3xl font-bold text-white">Qué construimos</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {industria.construimos.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-800 bg-gray-950 p-6">
                  <CheckIcon className="mb-4 h-5 w-5 text-lime-400" />
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-4xl rounded-xl border border-gray-800 bg-gray-950 p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
              Caso real
            </p>
            <h2 className="text-3xl font-bold text-white">{industria.caso.client}</h2>
            <p className="mt-4 leading-7 text-gray-300">{industria.caso.desc}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {industria.caso.detalles.map((detalle) => (
                <div key={detalle} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-lime-400" />
                  <p className="text-sm leading-6 text-gray-300">{detalle}</p>
                </div>
              ))}
            </div>
            {relatedCase ? (
              <Link href={`/casos/${relatedCase.slug}`} className="mt-7 inline-flex font-bold text-lime-300 underline underline-offset-4 hover:text-lime-200">
                Leer el caso completo
              </Link>
            ) : null}
          </div>
        </section>

        <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
                Preguntas
              </p>
              <h2 className="text-3xl font-bold text-white">Dudas frecuentes</h2>
            </div>
            <div className="space-y-4">
              {industria.faq.map((item) => (
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

        {relacionados.length > 0 && (
          <section className="border-t border-gray-900 px-6 py-20 md:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold text-white">Soluciones que aplican</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {relacionados.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="rounded-xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-lime-400/70"
                  >
                    <p className="text-sm font-semibold text-lime-300">{service.categoryLabel}</p>
                    <h3 className="mt-2 text-lg font-bold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400">{service.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-gray-950">¿Lo montamos para tu empresa?</h2>
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
