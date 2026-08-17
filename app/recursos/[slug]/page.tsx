import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckIcon } from "../../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter } from "../../marketing-layout";
import { getResourceArticle, resourceArticles } from "../../lib/content";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../../lib/seo";
import { getServiceBySlug, siteConfig } from "../../lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return resourceArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getResourceArticle((await params).slug);
  if (!article) return { title: "Recurso no encontrado", robots: { index: false, follow: false } };
  return buildMetadata({ title: article.metaTitle, description: article.metaDescription, path: `/recursos/${article.slug}` });
}

export default async function ResourcePage({ params }: Props) {
  const article = getResourceArticle((await params).slug);
  if (!article) notFound();
  const path = `/recursos/${article.slug}`;
  const related = article.relatedServices.map(getServiceBySlug).filter((service) => service !== undefined);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteConfig.url}${path}#article`,
        headline: article.title,
        description: article.metaDescription,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "es",
        image: `${siteConfig.url}/og.jpg`,
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        mainEntityOfPage: `${siteConfig.url}${path}`,
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}${path}#faq`,
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Recursos", path: "/recursos" },
        { name: article.title, path },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader />
      <main>
        <article>
          <header className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-4xl">
              <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Recursos", href: "/recursos" }, { label: article.title, href: path }]} />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Guía DukeCrea · {article.readingTime}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{article.title}</h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">{article.excerpt}</p>
              <p className="mt-5 text-sm text-gray-300">
                Publicado y revisado el <time dateTime={article.updatedAt}>17 de agosto de 2026</time> por el equipo de DukeCrea.
              </p>
            </div>
          </header>

          <section className="px-6 py-12 md:px-8">
            <div className="mx-auto max-w-4xl rounded-lg border border-lime-400/30 bg-lime-400/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-lime-300">Respuesta directa</p>
              <p className="mt-3 text-lg leading-8 text-white">{article.answer}</p>
            </div>
          </section>

          <div className="mx-auto max-w-4xl px-6 pb-20 md:px-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="border-b border-gray-900 py-10 last:border-0">
                <h2 className="text-3xl font-bold">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-lg leading-8 text-gray-300">{paragraph}</p>)}
                {section.bullets ? (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 rounded-lg border border-gray-800 bg-gray-950 p-4 text-gray-300"><CheckIcon className="mt-1 h-5 w-5 shrink-0 text-lime-400" />{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="py-10" aria-labelledby="resource-faq">
              <h2 id="resource-faq" className="text-3xl font-bold">Preguntas frecuentes</h2>
              <div className="mt-6 space-y-4">
                {article.faq.map((item) => (
                  <details key={item.q} className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                    <summary className="cursor-pointer font-bold">{item.q}</summary>
                    <p className="mt-4 leading-7 text-gray-300">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </article>

        <section className="border-t border-gray-900 bg-gray-950 px-6 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold">Soluciones relacionadas</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((service) => (
                <Link key={service.slug} href={`/servicios/${service.slug}`} className="rounded-lg border border-gray-800 bg-black p-6 hover:border-lime-400/70">
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
