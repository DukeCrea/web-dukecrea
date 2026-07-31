"use client";

/**
 * Capa única de eventos para toda la web.
 *
 * Cada evento se envía a las tres plataformas activas (Google Analytics 4,
 * Microsoft Clarity y Vercel Analytics). Si alguna no está configurada,
 * simplemente se omite: nunca lanza errores ni rompe la interacción del
 * usuario, porque medir jamás debe costar una conversión.
 */

import { track as vercelTrack } from "@vercel/analytics";

type EventParams = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

/** Nombres de eventos del embudo. Centralizados para no tener cadenas sueltas. */
export const AnalyticsEvent = {
  whatsappClick: "whatsapp_click",
  ctaClick: "cta_click",
  formStart: "form_start",
  formStep: "form_step",
  formSubmit: "form_submit",
  leadSuccess: "generate_lead",
  leadError: "form_error",
  whatsappAfterLead: "whatsapp_after_lead",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

function cleanParams(params?: EventParams) {
  if (!params) return {};
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number | boolean>;
}

export function track(name: AnalyticsEventName | string, params?: EventParams) {
  if (typeof window === "undefined") return;

  const payload = cleanParams(params);
  const win = window as GtagWindow;

  try {
    win.gtag?.("event", name, payload);
  } catch {
    // Ignorado a propósito: un bloqueador de anuncios no debe romper la web.
  }

  try {
    win.clarity?.("event", name);
  } catch {
    // Ídem.
  }

  try {
    vercelTrack(name, payload);
  } catch {
    // Ídem.
  }
}

/** Marca al visitante en Clarity para poder filtrar grabaciones por segmento. */
export function tagSession(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    (window as GtagWindow).clarity?.("set", key, value);
  } catch {
    // Ídem.
  }
}
