import { CookiePreferencesButton } from "../analytics-scripts";
import { LegalPage } from "../legal-page";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Política de cookies",
  description: "Cookies y tecnologías de analítica utilizadas por DukeCrea y cómo cambiar tus preferencias.",
  path: "/cookies",
  index: false,
});

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" intro="La web funciona sin analítica opcional. Google Analytics, Clarity y Vercel Analytics solo se activan cuando aceptas.">
      <section><h2>Cookies esenciales</h2><p className="mt-4">Son necesarias para funciones básicas, seguridad, sesión del panel privado y conservación de tu decisión de privacidad. No se utilizan para publicidad.</p></section>
      <section><h2>Analítica opcional</h2><p className="mt-4">Si aceptas, podemos cargar Google Analytics 4, Microsoft Clarity, Vercel Analytics y Speed Insights para medir visitas, interacción, errores y rendimiento. Estos proveedores pueden procesar identificadores técnicos según sus propias políticas.</p></section>
      <section><h2>Tu elección</h2><p className="mt-4">Puedes aceptar o rechazar desde el aviso inicial. Rechazar no bloquea el formulario, WhatsApp ni las páginas públicas. Usa el siguiente botón para volver a mostrar el selector.</p><div className="mt-6"><CookiePreferencesButton /></div></section>
      <section><h2>Controles del navegador</h2><p className="mt-4">También puedes borrar datos del sitio o bloquear cookies desde tu navegador. Al hacerlo, la web puede pedirte nuevamente tus preferencias.</p></section>
    </LegalPage>
  );
}
