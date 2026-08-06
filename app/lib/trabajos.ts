import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type EstadoTrabajo = "Propuesta" | "En curso" | "Entregado" | "Cobrado" | "Cancelado";

export type Trabajo = {
  id: string;
  leadId?: string;
  cliente: string;
  titulo: string;
  estado: EstadoTrabajo;
  montoUsd: number;
  cobradoUsd: number;
  fechaInicio?: string;
  fechaEntrega?: string;
  notas?: string;
  createdAt: string;
  updatedAt: string;
};

const estados: EstadoTrabajo[] = ["Propuesta", "En curso", "Entregado", "Cobrado", "Cancelado"];

let cachedClient: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    throw new Error("Faltan las variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  }

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}

type TrabajoRow = {
  id: string;
  lead_id: string | null;
  cliente: string;
  titulo: string;
  estado: string;
  monto_usd: number;
  cobrado_usd: number;
  fecha_inicio: string | null;
  fecha_entrega: string | null;
  notas: string | null;
  created_at: string;
  updated_at: string;
};

function rowToTrabajo(row: TrabajoRow): Trabajo {
  return {
    id: row.id,
    leadId: row.lead_id || undefined,
    cliente: row.cliente,
    titulo: row.titulo,
    estado: estados.includes(row.estado as EstadoTrabajo)
      ? (row.estado as EstadoTrabajo)
      : "Propuesta",
    montoUsd: row.monto_usd ?? 0,
    cobradoUsd: row.cobrado_usd ?? 0,
    fechaInicio: row.fecha_inicio || undefined,
    fechaEntrega: row.fecha_entrega || undefined,
    notas: row.notas || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function cleanText(value: unknown, maxLength = 240) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanNotas(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, 1200);
}

function cleanDate(value: unknown) {
  const text = cleanText(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function cleanAmount(value: unknown) {
  const number = Number(typeof value === "string" ? value.replace(/[^\d.-]/g, "") : value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.round(Math.min(number, 10_000_000));
}

export function getEstadosTrabajo() {
  return estados;
}

export async function listTrabajos() {
  const { data, error } = await getClient()
    .from("trabajos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`No pudimos cargar los trabajos: ${error.message}`);
  }

  return (data as TrabajoRow[]).map(rowToTrabajo);
}

export async function listTrabajosDeLead(leadId: string) {
  const { data, error } = await getClient()
    .from("trabajos")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`No pudimos cargar los trabajos del lead: ${error.message}`);
  }

  return (data as TrabajoRow[]).map(rowToTrabajo);
}

type TrabajoInput = {
  leadId?: unknown;
  cliente?: unknown;
  titulo?: unknown;
  estado?: unknown;
  montoUsd?: unknown;
  cobradoUsd?: unknown;
  fechaInicio?: unknown;
  fechaEntrega?: unknown;
  notas?: unknown;
};

function validate(input: TrabajoInput) {
  const cliente = cleanText(input.cliente, 140);
  const titulo = cleanText(input.titulo, 180);
  const estadoInput = cleanText(input.estado, 30);

  if (!cliente) throw new Error("Indica de qué cliente es el trabajo.");
  if (!titulo) throw new Error("Ponle un título al trabajo.");

  const montoUsd = cleanAmount(input.montoUsd);
  const cobradoUsd = cleanAmount(input.cobradoUsd);

  if (cobradoUsd > montoUsd) {
    throw new Error("Lo cobrado no puede ser mayor que el monto del trabajo.");
  }

  return {
    cliente,
    titulo,
    estado: estados.includes(estadoInput as EstadoTrabajo)
      ? (estadoInput as EstadoTrabajo)
      : "Propuesta",
    montoUsd,
    cobradoUsd,
    fechaInicio: cleanDate(input.fechaInicio),
    fechaEntrega: cleanDate(input.fechaEntrega),
    notas: cleanNotas(input.notas),
  };
}

export async function createTrabajo(input: TrabajoInput) {
  const valid = validate(input);
  const leadId = cleanText(input.leadId, 60);

  const { data, error } = await getClient()
    .from("trabajos")
    .insert({
      lead_id: leadId || null,
      cliente: valid.cliente,
      titulo: valid.titulo,
      estado: valid.estado,
      monto_usd: valid.montoUsd,
      cobrado_usd: valid.cobradoUsd,
      fecha_inicio: valid.fechaInicio || null,
      fecha_entrega: valid.fechaEntrega || null,
      notas: valid.notas || null,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`No pudimos guardar el trabajo: ${error.message}`);
  }

  return rowToTrabajo(data as TrabajoRow);
}

export async function updateTrabajo(id: string, input: TrabajoInput) {
  const valid = validate(input);

  const { error } = await getClient()
    .from("trabajos")
    .update({
      cliente: valid.cliente,
      titulo: valid.titulo,
      estado: valid.estado,
      monto_usd: valid.montoUsd,
      cobrado_usd: valid.cobradoUsd,
      fecha_inicio: valid.fechaInicio || null,
      fecha_entrega: valid.fechaEntrega || null,
      notas: valid.notas || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`No pudimos actualizar el trabajo: ${error.message}`);
  }
}

export async function deleteTrabajo(id: string) {
  const { error } = await getClient().from("trabajos").delete().eq("id", id);

  if (error) {
    throw new Error(`No pudimos borrar el trabajo: ${error.message}`);
  }
}
