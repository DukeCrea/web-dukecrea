import Link from "next/link";

import { CheckIcon } from "../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter } from "../marketing-layout";
import { caseStudies } from "../lib/content";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildMetadata({
  title: "Casos de software, WordPress y e-commerce",
  description:
    "Casos reales de DukeCrea en automatización comercial, WordPress, e-commerce multi-país y tiendas educativas.",
  path: "/casos",
});

export default function CasesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/casos#page`,
        name: "Casos DukeCrea",
        description: metadata.description,
        url: `${siteConfig.url}/casos`,
        about: { "@id": organizationId },
      },
      breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Casos", path: "/casos" }]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader />
      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Casos", href: "/casos" }]} />
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Trabajo verificable</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">Sistemas construidos alrededor de operaciones reales</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Documentamos el problema, la arquitectura y el resultado funcional sin inflar cifras.
              Estos casos muestran cómo elegimos tecnología según el negocio.
            </p>
          </div>
        </section>
        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            {caseStudies.map((item) => (
              <article key={item.slug} className="flex flex-col rounded-lg border border-gray-800 bg-gray-950 p-7">
                <p className="text-sm font-semibold text-lime-300">{item.sector}</p>
                <h2 className="mt-2 text-2xl font-bold">{item.client}</h2>
                <p className="mt-4 flex-1 leading-7 text-gray-300">{item.solution}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.stack.map((tech) => <span key={tech} className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-200">{tech}</span>)}
                </div>
                <Link href={`/casos/${item.slug}`} className="mt-7 inline-flex items-center gap-2 font-bold text-lime-300 underline underline-offset-4 hover:text-lime-200">
                  Ver caso completo <CheckIcon className="h-4 w-4" />
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
