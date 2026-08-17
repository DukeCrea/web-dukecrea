import Link from "next/link";

import { LegalPage } from "../legal-page";
import { buildMetadata } from "../lib/seo";
import { siteConfig } from "../lib/site";

export const metadata = buildMetadata({
  title: "Política de privacidad",
  description: "Cómo DukeCrea recopila, utiliza y protege los datos enviados por visitantes y clientes.",
  path: "/privacidad",
  index: false,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad" intro="Explicamos qué datos recopilamos, para qué los usamos y qué opciones tienes sobre su tratamiento.">
      <section><h2>Responsable y contacto</h2><p className="mt-4">DukeCrea es responsable del tratamiento descrito en esta política. Puedes escribir a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> para realizar consultas o ejercer tus derechos.</p></section>
      <section><h2>Datos que recopilamos</h2><ul className="mt-4 list-disc pl-6"><li>Nombre, empresa, correo y teléfono que envías voluntariamente.</li><li>Tipo de proyecto, necesidad, presupuesto, plazo y mensaje.</li><li>Página de origen y parámetros de campaña incluidos en la URL.</li><li>Datos de uso y dispositivo solo cuando aceptas la analítica opcional.</li></ul></section>
      <section><h2>Finalidades</h2><p className="mt-4">Usamos los datos para responder solicitudes, preparar diagnósticos, dar seguimiento comercial, prestar servicios contratados, proteger el formulario contra abuso y entender el rendimiento de la web cuando existe consentimiento.</p></section>
      <section><h2>Proveedores y transferencias</h2><p className="mt-4">Podemos procesar información mediante proveedores de alojamiento, base de datos, correo y analítica. Actualmente la web puede utilizar Supabase y Resend para recepción de leads; Google Analytics, Microsoft Clarity y Vercel Analytics solo se cargan después de aceptar la analítica opcional.</p></section>
      <section><h2>Conservación y seguridad</h2><p className="mt-4">Conservamos los datos durante el tiempo necesario para atender la relación comercial, cumplir obligaciones o resolver reclamaciones. Aplicamos controles de acceso y medidas técnicas razonables, aunque ningún sistema conectado a internet puede garantizar riesgo cero.</p></section>
      <section><h2>Tus decisiones</h2><p className="mt-4">Puedes solicitar acceso, corrección o eliminación cuando corresponda. También puedes rechazar o cambiar la analítica opcional desde la <Link href="/cookies">política de cookies</Link>.</p></section>
    </LegalPage>
  );
}
