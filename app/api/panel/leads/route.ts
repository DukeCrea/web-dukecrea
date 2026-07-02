import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readSession } from '@/lib/session';
import { readLeads } from '@/lib/leads';

const SECRET = process.env.SESSION_SECRET || '';

export async function GET() {
  const jar = await cookies();
  const session = await readSession(jar.get('dc_panel')?.value, SECRET);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const leads = await readLeads();
  return NextResponse.json({ leads });
}
