import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckIcon } from "../../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../../marketing-layout";
import { getSolutionHub, solutionHubs } from "../../lib/content";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../../lib/seo";
import { services, siteConfig } from "../../lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionHubs.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = getSolutionHub((await params).slug);
  if (!hub) return { title: "Ecosistema no encontrado", robots: { index: false, follow: false } };
  return buildMetadata({ title: hub.metaTitle, description: hub.metaDescription, path: `/soluciones/${hub.slug}` });
}

export default async function SolutionHubPage({ params }: Props) {
  const hub = getSolutionHub((await params).slug);
  if (!hub) notFound();
  const hubServices = services.filter((service) => service.category === hub.slug);
  const path = `/soluciones/${hub.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}${path}#page`,
        name: hub.title,
        description: hub.metaDescription,
        url: `${siteConfig.url}${path}`,
        about: { "@id": organizationId },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: hubServices.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteConfig.url}/servicios/${service.slug}`,
            name: service.title,
          })),
        },
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Soluciones", path: "/servicios" },
        { name: hub.eyebrow, path },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader whatsappMessage={`Hola DukeCrea, quiero conversar sobre ${hub.eyebrow}.`} />
      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Soluciones", href: "/servicios" }, { label: hub.eyebrow, href: path }]} />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">{hub.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{hub.title}</h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">{hub.answer}</p>
            </div>
            <SystemVisual labels={hubServices.slice(0, 4).map((service) => service.shortTitle)} />
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Señales de prioridad</p>
              <h2 className="mt-3 text-3xl font-bold">Problemas que resolvemos</h2>
              <ul className="mt-7 space-y-4">
                {hub.problems.map((problem) => (
                  <li key={problem} className="flex gap-3 rounded-lg border border-gray-800 bg-gray-950 p-5 text-gray-300">
                    <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-lime-400" />{problem}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Método</p>
              <h2 className="mt-3 text-3xl font-bold">Cómo lo abordamos</h2>
              <ol className="mt-7 space-y-4">
                {hub.method.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-lg border border-gray-800 bg-gray-950 p-5 text-gray-300">
                    <span className="font-bold text-lime-300">{String(index + 1).padStart(2, "0")}</span>{step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-gray-950 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold">Capacidades disponibles</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hubServices.map((service) => (
                <Link key={service.slug} href={`/servicios/${service.slug}`} className="rounded-lg border border-gray-800 bg-black p-6 transition hover:border-lime-400/70">
                  <p className="text-sm font-semibold text-lime-300">{service.eyebrow}</p>
                  <h3 className="mt-2 text-lg font-bold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">{service.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
