"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { AnalyticsEvent, track } from "./lib/analytics";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/**
 * Dispara un `page_view` en cada cambio de ruta.
 *
 * En el App Router la navegación es del lado del cliente: el script de GA solo
 * se ejecuta una vez, así que sin esto todas las visitas se atribuirían a la
 * página de entrada y las páginas de servicios aparecerían con cero tráfico.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) return;

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    (window as GtagWindow).gtag?.("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Escucha los clics a nivel de documento en lugar de instrumentar cada enlace.
 *
 * Ventaja: cubre también los CTAs que viven en componentes de servidor
 * (las páginas de servicios), donde no se puede colgar un `onClick`, y ningún
 * enlace nuevo queda sin medir por olvido.
 */
function ClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const label = (link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
      // Saber DE DÓNDE salió el clic es lo que permite decidir después:
      // si el CTA del menú convierte y el del pie no, se sabe dónde invertir.
      const section =
        link.closest("[data-track-section]")?.getAttribute("data-track-section") ||
        link.closest("section")?.getAttribute("id") ||
        link.closest("header, nav, footer")?.tagName.toLowerCase() ||
        "sin-seccion";

      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        track(AnalyticsEvent.whatsappClick, { seccion: section, texto: label });
        return;
      }

      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        track("contacto_directo", {
          canal: href.startsWith("mailto:") ? "email" : "telefono",
          seccion: section,
        });
        return;
      }

      if (href.startsWith("/#") || href.startsWith("#")) {
        track(AnalyticsEvent.ctaClick, { destino: href, seccion: section, texto: label });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

export function AnalyticsScripts() {
  return (
    <>
      <ClickTracker />
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: false });
            `}
          </Script>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
        </>
      ) : null}

      {clarityId ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
