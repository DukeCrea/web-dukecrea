import { LegalPage } from "../legal-page";
import { buildMetadata } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildMetadata({
  title: "Términos de uso",
  description: "Condiciones generales de uso del sitio web de DukeCrea y de la información publicada.",
  path: "/terminos",
  index: false,
});

export default function TermsPage() {
  return (
    <LegalPage title="Términos de uso" intro="Estas condiciones regulan el acceso al sitio informativo de DukeCrea. Cada proyecto se rige además por su propuesta o contrato específico.">
      <section><h2>Contenido del sitio</h2><p className="mt-4">La información describe capacidades, procesos y rangos orientativos. No constituye una oferta contractual definitiva. Alcance, precio, calendario y responsabilidades se confirman por escrito para cada proyecto.</p></section>
      <section><h2>Uso permitido</h2><p className="mt-4">Puedes consultar y compartir enlaces al contenido. No puedes intentar vulnerar la web, acceder al panel privado sin autorización, automatizar solicitudes abusivas ni reutilizar textos, identidad o materiales de forma engañosa.</p></section>
      <section><h2>Propiedad intelectual</h2><p className="mt-4">La identidad, los textos y los materiales propios de DukeCrea están protegidos. Marcas y tecnologías de terceros pertenecen a sus respectivos titulares.</p></section>
      <section><h2>Disponibilidad y enlaces</h2><p className="mt-4">Procuramos mantener información correcta y el sitio disponible, pero pueden existir interrupciones por mantenimiento o proveedores. Los enlaces externos se ofrecen como referencia y no implican control sobre esos sitios.</p></section>
      <section><h2>Contacto</h2><p className="mt-4">Para preguntas sobre estos términos, escribe a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p></section>
    </LegalPage>
  );
}
