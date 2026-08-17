import { LeadIntakeSection } from "../lead-intake-section";
import { Breadcrumbs, MarketingHeader, SiteFooter } from "../marketing-layout";
import { breadcrumbJsonLd, buildMetadata, serializeJsonLd } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildMetadata({
  title: "Contacto y diagnóstico de proyecto",
  description:
    "Cuéntanos qué necesitas construir, automatizar o mejorar. DukeCrea prepara un diagnóstico inicial para empresas en Panamá y Venezuela.",
  path: "/contacto",
});

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ContactPage", name: "Contacto DukeCrea", url: `${siteConfig.url}/contacto` },
      breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contacto" }]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader />
      <main>
        <header className="border-b border-gray-900 bg-gray-950 px-6 py-14 md:px-8">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto", href: "/contacto" }]} />
            <h1 className="text-4xl font-bold md:text-5xl">Diagnóstico inicial para tu proyecto</h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">Selecciona el tipo de necesidad y deja el contexto esencial. La solicitud llega al panel interno para que podamos responder con una ruta concreta.</p>
          </div>
        </header>
        <LeadIntakeSection />
      </main>
      <SiteFooter />
    </div>
  );
}
