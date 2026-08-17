import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { sendLeadEmail } from "./lead-email";

export type LeadStatus = "Nuevo" | "Contactado" | "Propuesta" | "Ganado" | "Perdido";

export type LeadRecord = {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone: string;
  projectType: string;
  need: string;
  interest: string;
  budget?: string;
  timeline?: string;
  message?: string;
  sourcePath?: string;
  origin: string;
  status: LeadStatus;
  valueUsd: number;
  nextAction?: string;
  nextActionAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadNote = {
  id: string;
  nota: string;
  createdAt: string;
};

type LeadInput = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  need?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  sourcePath?: unknown;
};

const statuses: LeadStatus[] = ["Nuevo", "Contactado", "Propuesta", "Ganado", "Perdido"];

let cachedClient: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    throw new Error(
      "Faltan las variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}

type LeadRow = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string;
  project_type: string;
  need: string;
  interest: string;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  source_path: string | null;
  origin: string;
  status: string;
  value_usd: number;
  next_action: string | null;
  next_action_at: string | null;
  created_at: string;
  updated_at: string;
};

function rowToLead(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    company: row.company || undefined,
    email: row.email || undefined,
    phone: row.phone,
    projectType: row.project_type,
    need: row.need,
    interest: row.interest,
    budget: row.budget || undefined,
    timeline: row.timeline || undefined,
    message: row.message || undefined,
    sourcePath: row.source_path || undefined,
    origin: row.origin || "Formulario",
    status: (statuses.includes(row.status as LeadStatus)
      ? (row.status as LeadStatus)
      : "Nuevo"),
    valueUsd: row.value_usd ?? 0,
    nextAction: row.next_action || undefined,
    nextActionAt: row.next_action_at || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function cleanText(value: unknown, maxLength = 240) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanMessage(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, 1200);
}

function estimateValueUsd(budget: string) {
  if (budget.includes("10,000")) return 10000;
  if (budget.includes("5,000")) return 6500;
  if (budget.includes("3,000")) return 3000;
  if (budget.includes("1,000")) return 1500;
  return 0;
}

function validateLead(input: LeadInput) {
  const name = cleanText(input.name, 120);
  const company = cleanText(input.company, 120);
  const email = cleanText(input.email, 160).toLowerCase();
  const phone = cleanText(input.phone, 80);
  const projectType = cleanText(input.projectType, 140);
  const need = cleanText(input.need, 180);
  const budget = cleanText(input.budget, 80);
  const timeline = cleanText(input.timeline, 80);
  const message = cleanMessage(input.message);
  const sourcePath = cleanText(input.sourcePath, 500);

  if (name.length < 2) {
    throw new Error("Indica tu nombre para poder registrar la oportunidad.");
  }

  if (phone.replace(/\D/g, "").length < 7) {
    throw new Error("Indica un WhatsApp o teléfono válido.");
  }

  if (!projectType) {
    throw new Error("Selecciona el tipo de proyecto.");
  }

  if (!need) {
    throw new Error("Selecciona la necesidad principal.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("El correo no tiene un formato válido.");
  }

  return {
    name,
    company,
    email,
    phone,
    projectType,
    need,
    budget,
    timeline,
    message,
    sourcePath,
  };
}

export async function listLeads() {
  const { data, error } = await getClient()
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`No pudimos cargar los leads: ${error.message}`);
  }

  return (data as LeadRow[]).map(rowToLead);
}

/**
 * Consulta mínima para mantener despierto el proyecto de Supabase.
 *
 * El plan gratuito pausa la base tras unos días sin actividad, y mientras está
 * pausada los leads no se registran. Cualquier petición cuenta como actividad,
 * así que basta con pedir una fila.
 */
export async function pingLeadsStore() {
  const { error } = await getClient().from("leads").select("id").limit(1);

  if (error) {
    throw new Error(`No pudimos consultar la base de datos: ${error.message}`);
  }

  return true;
}

/**
 * Registra un lead con doble destino: base de datos y correo.
 *
 * El correo es obligatorio como red de seguridad y la base es el registro
 * consultable desde el panel. Basta con que UNO de los dos funcione para dar la
 * solicitud por recibida; solo si fallan ambos se le pide al visitante que
 * reintente, porque solo entonces el contacto se habría perdido de verdad.
 */
export async function createLead(input: LeadInput) {
  const valid = validateLead(input);
  const interest = `${valid.projectType} — ${valid.need}`;

  const insertRow = {
    name: valid.name,
    company: valid.company || null,
    email: valid.email || null,
    phone: valid.phone,
    project_type: valid.projectType,
    need: valid.need,
    interest,
    budget: valid.budget || null,
    timeline: valid.timeline || null,
    message: valid.message || null,
    source_path: valid.sourcePath || null,
    origin: "Formulario",
    status: "Nuevo",
    value_usd: estimateValueUsd(valid.budget),
  };

  let stored: LeadRecord | null = null;
  let dbError = "";

  try {
    const { data, error } = await getClient()
      .from("leads")
      .insert(insertRow)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    stored = rowToLead(data as LeadRow);
  } catch (error) {
    // No se relanza todavía: primero se intenta el correo, que es el canal que
    // no depende de que la base esté despierta.
    dbError = error instanceof Error ? error.message : "error desconocido";
    console.error("[leads] No se pudo guardar en Supabase:", dbError);
  }

  const emailSent = await sendLeadEmail({
    name: valid.name,
    company: valid.company || undefined,
    email: valid.email || undefined,
    phone: valid.phone,
    projectType: valid.projectType,
    need: valid.need,
    budget: valid.budget || undefined,
    timeline: valid.timeline || undefined,
    message: valid.message || undefined,
    sourcePath: valid.sourcePath || undefined,
    storedInDatabase: Boolean(stored),
  });

  if (stored) return stored;

  if (!emailSent) {
    throw new Error(
      "No pudimos registrar la solicitud en este momento. Escríbenos por WhatsApp y te atendemos de inmediato.",
    );
  }

  // La base falló pero el aviso salió por correo: para el visitante la
  // solicitud está recibida, que es la verdad.
  const now = new Date().toISOString();
  return {
    id: "sin-registrar",
    name: valid.name,
    company: valid.company || undefined,
    email: valid.email || undefined,
    phone: valid.phone,
    projectType: valid.projectType,
    need: valid.need,
    interest,
    budget: valid.budget || undefined,
    timeline: valid.timeline || undefined,
    message: valid.message || undefined,
    sourcePath: valid.sourcePath || undefined,
    origin: "Formulario",
    status: "Nuevo",
    valueUsd: estimateValueUsd(valid.budget),
    createdAt: now,
    updatedAt: now,
  } satisfies LeadRecord;
}

export async function updateLeadStatus(id: string, status: string) {
  if (!statuses.includes(status as LeadStatus)) {
    throw new Error("Estado inválido.");
  }

  const { error } = await getClient()
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(`No pudimos actualizar el lead: ${error.message}`);
  }
}

export function getLeadStatuses() {
  return statuses;
}

export async function getLead(id: string) {
  const { data, error } = await getClient().from("leads").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(`No pudimos cargar el lead: ${error.message}`);
  }

  return data ? rowToLead(data as LeadRow) : null;
}

export const origenesManuales = [
  "Prospección",
  "Referido",
  "WhatsApp",
  "Instagram",
  "LinkedIn",
  "Llamada",
  "Evento",
  "Otro",
];

type ManualLeadInput = LeadInput & {
  origin?: unknown;
  status?: unknown;
  valueUsd?: unknown;
  nextAction?: unknown;
  nextActionAt?: unknown;
};

function cleanDate(value: unknown) {
  const text = cleanText(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function cleanAmount(value: unknown) {
  const number = Number(typeof value === "string" ? value.replace(/[^\d.-]/g, "") : value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.round(Math.min(number, 10_000_000));
}

/**
 * Alta de un lead desde el panel.
 *
 * A diferencia de `createLead`, este NO manda correo: el aviso existe para
 * enterarte de algo que llegó solo, y aquí lo estás escribiendo tú. También
 * deja fijar origen, estado y valor de entrada, que en el formulario público
 * se deducen.
 */
export async function createManualLead(input: ManualLeadInput) {
  const valid = validateLead(input);
  const origin = cleanText(input.origin, 60) || "Prospección";
  const statusInput = cleanText(input.status, 30);
  const status = statuses.includes(statusInput as LeadStatus) ? statusInput : "Nuevo";
  const interest = `${valid.projectType} — ${valid.need}`;

  const { data, error } = await getClient()
    .from("leads")
    .insert({
      name: valid.name,
      company: valid.company || null,
      email: valid.email || null,
      phone: valid.phone,
      project_type: valid.projectType,
      need: valid.need,
      interest,
      budget: valid.budget || null,
      timeline: valid.timeline || null,
      message: valid.message || null,
      source_path: null,
      origin,
      status,
      value_usd: cleanAmount(input.valueUsd),
      next_action: cleanText(input.nextAction, 200) || null,
      next_action_at: cleanDate(input.nextActionAt) || null,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`No pudimos guardar el lead: ${error.message}`);
  }

  return rowToLead(data as LeadRow);
}

export async function updateLeadDetails(
  id: string,
  input: { status?: unknown; valueUsd?: unknown; nextAction?: unknown; nextActionAt?: unknown },
) {
  const statusInput = cleanText(input.status, 30);

  if (statusInput && !statuses.includes(statusInput as LeadStatus)) {
    throw new Error("Estado inválido.");
  }

  const { error } = await getClient()
    .from("leads")
    .update({
      ...(statusInput ? { status: statusInput } : {}),
      value_usd: cleanAmount(input.valueUsd),
      next_action: cleanText(input.nextAction, 200) || null,
      next_action_at: cleanDate(input.nextActionAt) || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`No pudimos actualizar el lead: ${error.message}`);
  }
}

export async function deleteLead(id: string) {
  const { error } = await getClient().from("leads").delete().eq("id", id);

  if (error) {
    throw new Error(`No pudimos borrar el lead: ${error.message}`);
  }
}

export async function listLeadNotes(leadId: string): Promise<LeadNote[]> {
  const { data, error } = await getClient()
    .from("lead_notes")
    .select("id, nota, created_at")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`No pudimos cargar el seguimiento: ${error.message}`);
  }

  return (data as { id: string; nota: string; created_at: string }[]).map((row) => ({
    id: row.id,
    nota: row.nota,
    createdAt: row.created_at,
  }));
}

export async function addLeadNote(leadId: string, nota: unknown) {
  const texto = cleanMessage(nota);

  if (!texto) {
    throw new Error("Escribe algo antes de guardar la nota.");
  }

  const { error } = await getClient().from("lead_notes").insert({ lead_id: leadId, nota: texto });

  if (error) {
    throw new Error(`No pudimos guardar la nota: ${error.message}`);
  }

  await getClient().from("leads").update({ updated_at: new Date().toISOString() }).eq("id", leadId);
}
