// Almacenamiento simple de leads en archivo (JSONL). Solo servidor.
// En producción se apunta fuera del repo con LEADS_FILE para que sobreviva a los deploys.
import { appendFile, readFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const LEADS_FILE = process.env.LEADS_FILE || './.data/leads.jsonl';

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  company?: string;
  service: string;
  source: string;
  status: string;
};

export async function appendLead(lead: Lead): Promise<void> {
  await mkdir(dirname(LEADS_FILE), { recursive: true });
  await appendFile(LEADS_FILE, JSON.stringify(lead) + '\n', 'utf8');
}

export async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await readFile(LEADS_FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Lead)
      .reverse(); // más recientes primero
  } catch {
    return [];
  }
}
