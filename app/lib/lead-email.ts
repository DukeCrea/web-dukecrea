import "server-only";

import { Resend } from "resend";

import { siteConfig } from "./site";

type LeadEmailPayload = {
  name: string;
  company?: string;
  email?: string;
  phone: string;
  projectType: string;
  need: string;
  budget?: string;
  timeline?: string;
  message?: string;
  sourcePath?: string;
  /** Se avisa en el correo cuando el lead NO pudo guardarse en la base. */
  storedInDatabase: boolean;
};

/**
 * Lee la configuración en cada llamada, no al cargar el módulo.
 *
 * Las variables marcadas como "Sensitive" en Vercel no están disponibles
 * mientras se construye el proyecto, así que leerlas arriba del archivo las
 * dejaba vacías y el envío se saltaba en silencio. Dentro de la función se
 * evalúan ya en ejecución, cuando el valor sí existe.
 */
function getConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim(),
    to: (process.env.LEADS_EMAIL_TO || siteConfig.email).trim(),
    // El dominio remitente debe estar verificado en Resend. Mientras tanto,
    // `onboarding@resend.dev` funciona sin verificar y solo entrega al correo
    // dueño de la cuenta, que es justo lo que se necesita para avisos internos.
    from: (process.env.LEADS_EMAIL_FROM || "DukeCrea <onboarding@resend.dev>").trim(),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
  </tr>`;
}

/**
 * Envía el aviso de lead nuevo por correo.
 *
 * Es la red de seguridad del formulario: la base de datos del plan gratuito de
 * Supabase se pausa sola tras varios días sin uso, y sin este correo un lead
 * llegado en ese periodo se perdería sin dejar rastro. Devuelve `false` en vez
 * de lanzar, para que un fallo de correo nunca tumbe la respuesta al visitante.
 */
export async function sendLeadEmail(lead: LeadEmailPayload): Promise<boolean> {
  const { apiKey, to, from } = getConfig();

  if (!apiKey) {
    // Se registra en vez de fallar callado: sin este aviso, un lead perdido
    // por falta de configuración es indistinguible de "nadie escribió".
    console.error("[leads] Falta RESEND_API_KEY: no se envió el aviso por correo.");
    return false;
  }

  const whatsappDigits = lead.phone.replace(/\D/g, "");
  const alerta = lead.storedInDatabase
    ? ""
    : `<p style="margin:0 0 16px;padding:12px 14px;background:#fef2f2;border-left:4px solid #dc2626;color:#991b1b;font-size:14px;">
         <strong>Atención:</strong> este lead NO pudo guardarse en la base de datos y no aparecerá en el panel.
         Este correo es la única copia. Responde desde aquí.
       </p>`;

  const html = `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#65a30d;font-weight:700;">DukeCrea</p>
      <h1 style="margin:0 0 20px;font-size:22px;color:#111827;">Nuevo lead: ${escapeHtml(lead.name)}</h1>
      ${alerta}
      <table style="border-collapse:collapse;width:100%;">
        ${row("Nombre", lead.name)}
        ${row("Empresa", lead.company)}
        ${row("WhatsApp", lead.phone)}
        ${row("Correo", lead.email)}
        ${row("Proyecto", lead.projectType)}
        ${row("Necesidad", lead.need)}
        ${row("Presupuesto", lead.budget)}
        ${row("Plazo", lead.timeline)}
        ${row("Página de origen", lead.sourcePath)}
      </table>
      ${
        lead.message
          ? `<p style="margin:18px 0 0;padding:14px;background:#f9fafb;border-radius:8px;color:#374151;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>`
          : ""
      }
      <p style="margin:24px 0 0;">
        <a href="https://wa.me/${whatsappDigits}" style="display:inline-block;background:#a3e635;color:#0a0a0a;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:14px;">Responder por WhatsApp</a>
      </p>
      <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">Panel de leads: ${siteConfig.url}/panel</p>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: lead.email || undefined,
      subject: `Nuevo lead: ${lead.name} — ${lead.projectType}`,
      html,
    });

    if (error) {
      console.error("[leads] Resend rechazó el envío:", error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[leads] Fallo al enviar el correo de lead:", error);
    return false;
  }
}
