-- CRM DukeCrea — esquema de la base de datos (Supabase / Postgres)
-- Ejecutar en el proyecto Supabase cuando el VPS esté reinstalado y listo.
-- Los datos de clientes viven en Supabase (gestionado), no en el VPS.

-- ── Leads / clientes ──────────────────────────────────────────────
create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  name           text not null,
  company        text,
  email          text,
  phone          text,               -- WhatsApp
  source         text not null default 'formulario'
                 check (source in ('formulario','whatsapp','instagram','referido','otro')),
  service        text,               -- servicio de interés (e-commerce, automatización, etc.)
  status         text not null default 'nuevo'
                 check (status in ('nuevo','contactado','propuesta','ganado','perdido')),
  estimated_value numeric(10,2),     -- valor estimado del proyecto (USD)
  message        text,               -- lo que escribió el lead
  notes          text                -- notas internas del equipo
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_idx on public.leads (created_at desc);

-- Mantener updated_at al día
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists leads_touch on public.leads;
create trigger leads_touch before update on public.leads
  for each row execute function public.touch_updated_at();

-- ── Seguridad (RLS) ───────────────────────────────────────────────
-- Solo usuarios autenticados (Antonio, Noe) leen/gestionan leads.
-- La captura pública de leads se hace vía service_role desde el backend,
-- nunca exponiendo la tabla al público directamente.
alter table public.leads enable row level security;

drop policy if exists "equipo gestiona leads" on public.leads;
create policy "equipo gestiona leads" on public.leads
  for all to authenticated using (true) with check (true);
