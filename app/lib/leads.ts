import "server-only";

import { promises as fs } from "fs";
import path from "path";

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

const dataDir = path.join(process.cwd(), "data");
const leadsFile = path.join(dataDir, "leads.json");
const statuses: LeadStatus[] = ["Nuevo", "Contactado", "Propuesta", "Ganado", "Perdido"];

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

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readLeadsFile(): Promise<LeadRecord[]> {
  try {
    const content = await fs.readFile(leadsFile, "utf8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw error;
  }
}

async function writeLeadsFile(leads: LeadRecord[]) {
  await ensureDataDir();
  await fs.writeFile(leadsFile, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
}

export async function listLeads() {
  const leads = await readLeadsFile();
  return leads.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function createLead(input: LeadInput) {
  const valid = validateLead(input);
  const now = new Date().toISOString();
  const interest = `${valid.projectType} — ${valid.need}`;
  const lead: LeadRecord = {
    id: crypto.randomUUID(),
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
  };

  const leads = await readLeadsFile();
  leads.unshift(lead);
  await writeLeadsFile(leads);
  return lead;
}

export async function updateLeadStatus(id: string, status: string) {
  if (!statuses.includes(status as LeadStatus)) {
    throw new Error("Estado inválido.");
  }

  const leads = await readLeadsFile();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) {
    throw new Error("Lead no encontrado.");
  }

  leads[index] = {
    ...leads[index],
    status: status as LeadStatus,
    updatedAt: new Date().toISOString(),
  };
  await writeLeadsFile(leads);
}

export function getLeadStatuses() {
  return statuses;
}
