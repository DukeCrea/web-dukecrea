import Link from "next/link";

import { CheckIcon } from "../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../marketing-layout";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../lib/seo";
import { serviceCategoryMap, siteConfig } from "../lib/site";

export const metadata = buildMetadata({
  title: "Soluciones de software, automatización y marketing",
  description:
    "Explora desarrollo web, WordPress, Shopify, software a medida, automatizaciones, SEO/GEO, Ads, contenido y analítica de DukeCrea.",
  path: "/servicios",
});

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/servicios#page`,
        name: "Soluciones DukeCrea",
        description: metadata.description,
        url: `${siteConfig.url}/servicios`,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": organizationId },
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Soluciones", path: "/servicios" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader />
      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Soluciones", href: "/servicios" }]} />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Ecosistema DukeCrea</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
                Soluciones conectadas con la operación y el crecimiento
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
                Diseñamos infraestructura web, software, automatización y marketing medible. Puedes
                empezar por una necesidad concreta y conectar nuevas capacidades a medida que el
                negocio crece.
              </p>
            </div>
            <SystemVisual labels={["Web y commerce", "Software", "Automatización", "Marketing y datos"]} />
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl space-y-14">
            {serviceCategoryMap.map((category) => (
              <section key={category.id} aria-labelledby={`category-${category.id}`}>
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-semibold text-lime-300">{category.label}</p>
                    <h2 id={`category-${category.id}`} className="mt-2 text-3xl font-bold text-white">
                      {category.headline}
                    </h2>
                  </div>
                  <Link href={`/soluciones/${category.id}`} className="font-bold text-lime-300 underline underline-offset-4 hover:text-lime-200">
                    Ver ecosistema completo
                  </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/servicios/${service.slug}`}
                      className="group rounded-lg border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-lime-400/70"
                    >
                      <CheckIcon className="mb-4 h-5 w-5 text-lime-400" />
                      <h3 className="text-lg font-bold text-white group-hover:text-lime-300">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-gray-300">{service.summary}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-900 bg-lime-400 px-6 py-16 text-gray-950 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">¿No sabes por dónde empezar?</h2>
            <p className="mt-4 text-lg leading-8">Cuéntanos el cuello de botella y te ayudamos a priorizar una primera implementación medible.</p>
            <Link href="/contacto" className="mt-7 inline-flex rounded-lg bg-gray-950 px-7 py-3 font-bold text-white hover:bg-gray-800">
              Solicitar diagnóstico
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
