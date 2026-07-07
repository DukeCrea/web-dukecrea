import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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
  origin: "Formulario";
  status: LeadStatus;
  valueUsd: number;
  createdAt: string;
  updatedAt: string;
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
    origin: "Formulario",
    status: (statuses.includes(row.status as LeadStatus)
      ? (row.status as LeadStatus)
      : "Nuevo"),
    valueUsd: row.value_usd ?? 0,
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
  const sourcePath = cleanText(input.sourcePath, 160);

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

  const { data, error } = await getClient()
    .from("leads")
    .insert(insertRow)
    .select("*")
    .single();

  if (error) {
    throw new Error(`No pudimos registrar la solicitud: ${error.message}`);
  }

  return rowToLead(data as LeadRow);
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
