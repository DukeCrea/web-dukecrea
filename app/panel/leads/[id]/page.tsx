import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { WhatsAppIcon } from "../../../icons";
import { getLead, getLeadStatuses, listLeadNotes } from "../../../lib/leads";
import { getEstadosTrabajo, listTrabajosDeLead } from "../../../lib/trabajos";
import {
  agregarNota,
  borrarLead,
  crearTrabajo,
  guardarSeguimiento,
  isPanelAuthorized,
} from "../../actions";
import { AreaTexto, Aviso, BotonPrimario, Campo, Selector } from "../../campos";
import { PanelHeader } from "../../panel-header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Seguimiento de lead | Panel DukeCrea",
  description: "Ficha de seguimiento de una oportunidad comercial.",
  robots: { index: false, follow: false, nocache: true },
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ aviso?: string }>;
};

function formatFecha(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("es-PA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatFechaHora(value: string) {
  return new Intl.DateTimeFormat("es-PA", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function moneda(value: number) {
  return new Intl.NumberFormat("es-PA", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : `tel:${phone}`;
}

export default async function LeadPage({ params, searchParams }: Props) {
  const autorizado = await isPanelAuthorized();
  if (!autorizado) {
    redirect("/panel?error=session");
  }

  const { id } = await params;
  const query = searchParams ? await searchParams : {};
  const lead = await getLead(id);

  if (!lead) {
    notFound();
  }

  const [notas, trabajos] = await Promise.all([listLeadNotes(id), listTrabajosDeLead(id)]);

  return (
    <main className="min-h-screen bg-black text-white">
      <PanelHeader activo="leads" />

      <section className="mx-auto max-w-5xl px-6 py-10 md:px-8">
        <Link href="/panel" className="text-sm text-gray-500 transition hover:text-lime-300">
          ← Todos los leads
        </Link>

        <Aviso mensaje={query.aviso} />

        <div className="mt-6 border-b border-gray-900 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
            {lead.origin} · {formatFecha(lead.createdAt)}
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{lead.name}</h1>
          {lead.company && <p className="mt-1 text-gray-400">{lead.company}</p>}
          <p className="mt-4 text-gray-300">{lead.interest}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            <a
              href={phoneHref(lead.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-lime-400 transition hover:text-lime-300"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {lead.phone}
            </a>
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="text-gray-300 transition hover:text-lime-300">
                {lead.email}
              </a>
            )}
          </div>

          {lead.message && (
            <p className="mt-5 whitespace-pre-line rounded-lg border border-gray-800 bg-gray-950 p-4 text-sm leading-6 text-gray-300">
              {lead.message}
            </p>
          )}
        </div>

        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Seguimiento</h2>
          <form
            action={guardarSeguimiento}
            className="mt-4 grid gap-4 rounded-lg border border-gray-800 bg-gray-950 p-5 md:grid-cols-4"
          >
            <input type="hidden" name="id" value={lead.id} />
            <Selector etiqueta="Estado" nombre="status" opciones={getLeadStatuses()} valor={lead.status} />
            <Campo
              etiqueta="Valor estimado (USD)"
              nombre="valueUsd"
              tipo="number"
              valor={lead.valueUsd}
            />
            <Campo etiqueta="Próxima acción" nombre="nextAction" valor={lead.nextAction} />
            <Campo etiqueta="Para cuándo" nombre="nextActionAt" tipo="date" valor={lead.nextActionAt} />
            <div className="md:col-span-4">
              <BotonPrimario>Guardar seguimiento</BotonPrimario>
            </div>
          </form>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
            Historial de contacto
          </h2>

          <form action={agregarNota} className="mt-4 grid gap-3">
            <input type="hidden" name="id" value={lead.id} />
            <AreaTexto
              etiqueta="Nueva nota"
              nombre="nota"
              placeholder="Lo llamé, quedó en revisar la propuesta el viernes…"
            />
            <div>
              <BotonPrimario>Añadir nota</BotonPrimario>
            </div>
          </form>

          {notas.length > 0 ? (
            <ul className="mt-6 border-t border-gray-900">
              {notas.map((nota) => (
                <li key={nota.id} className="border-b border-gray-900 py-4">
                  <p className="text-xs text-gray-500">{formatFechaHora(nota.createdAt)}</p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-200">
                    {nota.nota}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-gray-500">
              Todavía no hay notas. Cada vez que hables con esta persona, déjalo escrito aquí.
            </p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
            Trabajos de este cliente
          </h2>

          {trabajos.length > 0 && (
            <ul className="mt-4 grid gap-3">
              {trabajos.map((trabajo) => (
                <li
                  key={trabajo.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-800 bg-gray-950 px-5 py-4"
                >
                  <div>
                    <p className="font-semibold text-white">{trabajo.titulo}</p>
                    <p className="text-xs text-gray-500">
                      {trabajo.estado} · {moneda(trabajo.montoUsd)} · cobrado{" "}
                      {moneda(trabajo.cobradoUsd)}
                    </p>
                  </div>
                  <Link
                    href="/panel/trabajos"
                    className="text-xs font-semibold text-gray-400 transition hover:text-lime-300"
                  >
                    Editar →
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <details className="mt-4 rounded-lg border border-gray-800 bg-gray-950">
            <summary className="cursor-pointer list-none px-5 py-4 text-sm font-bold text-lime-400 transition hover:text-lime-300">
              + Convertir en trabajo
            </summary>
            <form action={crearTrabajo} className="grid gap-4 border-t border-gray-900 p-5">
              <input type="hidden" name="leadId" value={lead.id} />
              <input type="hidden" name="volverA" value={`/panel/leads/${lead.id}`} />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Campo
                  etiqueta="Cliente"
                  nombre="cliente"
                  requerido
                  valor={lead.company || lead.name}
                />
                <Campo etiqueta="Título del trabajo" nombre="titulo" requerido valor={lead.projectType} />
                <Selector etiqueta="Estado" nombre="estado" opciones={getEstadosTrabajo()} />
                <Campo
                  etiqueta="Monto (USD)"
                  nombre="montoUsd"
                  tipo="number"
                  valor={lead.valueUsd || undefined}
                />
                <Campo etiqueta="Cobrado (USD)" nombre="cobradoUsd" tipo="number" valor={0} />
                <Campo etiqueta="Fecha de entrega" nombre="fechaEntrega" tipo="date" />
              </div>
              <AreaTexto etiqueta="Notas" nombre="notas" filas={2} />
              <div>
                <BotonPrimario>Crear trabajo</BotonPrimario>
              </div>
            </form>
          </details>
        </section>

        <section className="mt-14 border-t border-gray-900 pt-6">
          <form action={borrarLead}>
            <input type="hidden" name="id" value={lead.id} />
            <button
              type="submit"
              className="text-xs font-semibold text-gray-600 transition hover:text-red-400"
            >
              Borrar este lead
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
