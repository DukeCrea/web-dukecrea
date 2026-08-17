"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense, useEffect, useState } from "react";
import { AnalyticsEvent, track } from "./lib/analytics";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

const consentStorageKey = "dukecrea_analytics_consent_v1";

type ConsentStatus = "accepted" | "rejected";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

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
  const [consent, setConsent] = useState<ConsentStatus | null>(null);
  const [ready, setReady] = useState(false);
  const [gaReady, setGaReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(consentStorageKey);
      setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const chooseConsent = (value: ConsentStatus) => {
    window.localStorage.setItem(consentStorageKey, value);
    setConsent(value);
  };

  const initializeGoogleAnalytics = () => {
    if (!gaId) return;

    const win = window as GtagWindow;
    win.dataLayer = win.dataLayer || [];
    win.gtag = (...args: unknown[]) => win.dataLayer?.push(args);
    win.gtag("js", new Date());
    win.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    win.gtag("config", gaId, {
      send_page_view: false,
      anonymize_ip: true,
    });
    setGaReady(true);
  };

  return (
    <>
      {consent === "accepted" ? <ClickTracker /> : null}
      {consent === "accepted" && gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
            onLoad={initializeGoogleAnalytics}
          />
          {gaReady ? (
            <Suspense fallback={null}>
              <PageViewTracker />
            </Suspense>
          ) : null}
        </>
      ) : null}

      {consent === "accepted" && clarityId ? (
        <Script id="clarity-init" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      ) : null}

      {consent === "accepted" ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}

      {ready && consent === null ? (
        <div
          role="dialog"
          aria-label="Preferencias de analítica"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-lg border border-gray-700 bg-gray-950 p-5 text-white shadow-2xl shadow-black/60 sm:flex sm:items-center sm:justify-between sm:gap-6"
        >
          <div>
            <p className="font-bold">Tu privacidad importa</p>
            <p className="mt-1 text-sm leading-6 text-gray-300">
              Usamos analítica opcional para entender qué contenido ayuda y mejorar la web. No
              cargamos Google Analytics ni Clarity hasta que aceptes. Consulta la{" "}
              <Link href="/cookies" className="underline underline-offset-4 hover:text-lime-300">
                política de cookies
              </Link>
              .
            </p>
          </div>
          <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
            <button
              type="button"
              onClick={() => chooseConsent("rejected")}
              className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-bold text-white transition hover:border-gray-400"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => chooseConsent("accepted")}
              className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-gray-950 transition hover:bg-lime-300"
            >
              Aceptar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem(consentStorageKey);
        window.location.reload();
      }}
      className="rounded-lg border border-lime-400 px-5 py-2.5 font-bold text-lime-300 transition hover:bg-lime-400 hover:text-gray-950"
    >
      Cambiar preferencias de analítica
    </button>
  );
}
