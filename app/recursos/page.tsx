import Link from "next/link";

import { Breadcrumbs, MarketingHeader, SiteFooter } from "../marketing-layout";
import { resourceArticles } from "../lib/content";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildMetadata({
  title: "Recursos sobre software, automatización y crecimiento",
  description:
    "Guías prácticas de DukeCrea sobre plataformas web, automatización de leads, e-commerce, Ads, datos y ROI.",
  path: "/recursos",
});

export default function ResourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/recursos#page`,
        name: "Recursos DukeCrea",
        url: `${siteConfig.url}/recursos`,
        description: "Guías prácticas sobre software, automatización, comercio electrónico, publicidad y datos.",
        about: { "@id": organizationId },
      },
      breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Recursos", path: "/recursos" }]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader />
      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Recursos", href: "/recursos" }]} />
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Decisiones con contexto</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">Guías para elegir, implementar y medir mejor</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Respuestas directas y criterios prácticos para equipos que necesitan invertir en tecnología y crecimiento sin depender de promesas vagas.
            </p>
          </div>
        </section>
        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {resourceArticles.map((article) => (
              <article key={article.slug} className="flex flex-col rounded-lg border border-gray-800 bg-gray-950 p-7">
                <p className="text-sm font-semibold text-lime-300">{article.readingTime} de lectura</p>
                <h2 className="mt-3 text-2xl font-bold leading-tight">{article.title}</h2>
                <p className="mt-4 flex-1 leading-7 text-gray-300">{article.excerpt}</p>
                <Link href={`/recursos/${article.slug}`} className="mt-7 font-bold text-lime-300 underline underline-offset-4 hover:text-lime-200">
                  Leer guía
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
