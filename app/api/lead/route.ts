import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { appendLead } from '@/lib/leads';

export async function POST(req: Request) {
  const form = await req.formData();

  // Campo trampa (honeypot): oculto para humanos, los bots lo llenan.
  if (String(form.get('website') || '')) {
    return NextResponse.json({ ok: true }); // fingir éxito, no guardar
  }

  const name = String(form.get('name') || '').trim();
  const phone = String(form.get('phone') || '').trim();
  const company = String(form.get('company') || '').trim();
  const service = String(form.get('service') || '').trim();

  if (!name || !phone) {
    return NextResponse.json({ error: 'Falta tu nombre o tu contacto.' }, { status: 400 });
  }

  try {
    await appendLead({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      phone,
      company: company || undefined,
      service: service || 'Sin especificar',
      source: 'formulario',
      status: 'nuevo',
    });
  } catch {
    return NextResponse.json({ error: 'No se pudo guardar. Intenta de nuevo.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
