import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../marketing-layout";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../lib/seo";
import { siteConfig, team } from "../lib/site";

export const metadata = buildMetadata({
  title: "Nosotros: equipo y forma de trabajo",
  description:
    "Conoce a los fundadores de DukeCrea y cómo combinamos desarrollo, automatización, datos y marketing para construir sistemas útiles.",
  path: "/nosotros",
});

export default function AboutPage() {
  const founders = team.filter((member) => member.initials);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteConfig.url}/nosotros#page`,
        name: "Nosotros",
        url: `${siteConfig.url}/nosotros`,
        about: { "@id": organizationId },
      },
      ...founders.map((member) => ({
        "@type": "Person",
        "@id": `${siteConfig.url}/nosotros#${member.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: member.name,
        jobTitle: member.role,
        worksFor: { "@id": organizationId },
      })),
      breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Nosotros", path: "/nosotros" }]),
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
              <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Nosotros", href: "/nosotros" }]} />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Equipo DukeCrea</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">Tecnología con dirección cercana y responsabilidad técnica</h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Los fundadores participan en el diagnóstico y la dirección de cada proyecto. Sumamos especialistas según el reto y documentamos decisiones para que la solución pueda mantenerse y evolucionar.
              </p>
            </div>
            <SystemVisual labels={["Diagnóstico", "Arquitectura", "Implementación", "Acompañamiento"]} />
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Fundadores</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {founders.map((member) => (
                <article id={member.name.toLowerCase().replace(/\s+/g, "-")} key={member.name} className="rounded-lg border border-gray-800 bg-gray-950 p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-lg font-bold text-gray-950">{member.initials}</div>
                  <h3 className="mt-5 text-2xl font-bold">{member.name}</h3>
                  <p className="mt-2 text-lime-300">{member.role}</p>
                  <p className="mt-4 leading-7 text-gray-300">Participa en la dirección de soluciones y en la coordinación del equipo necesario para cada implementación.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-gray-950 px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {[
              ["Decisiones explicables", "Cada plataforma, integración y prioridad debe responder a una necesidad operativa o comercial."],
              ["Entregas verificables", "Trabajamos por etapas que pueden revisarse antes de ampliar el alcance."],
              ["Continuidad", "Documentamos, medimos y ofrecemos acompañamiento para que el sistema no se estanque después del lanzamiento."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-gray-800 bg-black p-6"><h2 className="text-xl font-bold text-lime-300">{title}</h2><p className="mt-4 leading-7 text-gray-300">{body}</p></div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
