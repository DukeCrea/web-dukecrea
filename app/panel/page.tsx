import type { Metadata } from "next";
import Link from "next/link";
import {
  ChartIcon,
  CheckIcon,
  UsersIcon,
  WhatsAppIcon,
  ZapIcon,
} from "../icons";
import { getLeadStatuses, listLeads, type LeadRecord } from "../lib/leads";
import {
  isPanelAuthorized,
  loginPanel,
  panelPasswordConfigured,
  setLeadStatus,
} from "./actions";
import { PanelHeader } from "./panel-header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel interno | DukeCrea",
  description: "Panel privado de oportunidades comerciales de DukeCrea.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

type PanelPageProps = {
  searchParams?: Promise<{
    status?: string;
    error?: string;
  }>;
};

const statusStyles: Record<string, string> = {
  Nuevo: "border-blue-400/40 bg-blue-500/10 text-blue-200",
  Contactado: "border-cyan-400/40 bg-cyan-500/10 text-cyan-200",
  Propuesta: "border-amber-400/40 bg-amber-500/10 text-amber-200",
  Ganado: "border-lime-400/40 bg-lime-500/10 text-lime-200",
  Perdido: "border-red-400/40 bg-red-500/10 text-red-200",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-PA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatCurrency(value: number) {
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

function MetricCard({
  title,
  value,
  icon,
  highlight = false,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-5 ${
        highlight
          ? "border-lime-400/70 bg-lime-400/5"
          : "border-gray-800 bg-gray-950"
      }`}
    >
      <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-lime-400">
        {icon}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-gray-400">{title}</p>
    </div>
  );
}

function LoginPanel({ error, configured }: { error?: string; configured: boolean }) {
  const messages: Record<string, string> = {
    invalid: "La contraseña no es correcta.",
    session: "Inicia sesión nuevamente para continuar.",
    config: "Configura DUKECREA_PANEL_PASSWORD en producción antes de usar el panel.",
  };

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white md:px-8">
      <div className="mx-auto max-w-md rounded-xl border border-gray-800 bg-gray-950 p-8">
        <Link href="/" className="mb-8 flex items-center gap-2" aria-label="DukeCrea inicio">
          <div className="h-8 w-8 rounded-lg bg-lime-400 shadow-lg shadow-lime-400/50" />
          <span className="text-lg font-bold text-white">DukeCrea</span>
          <span className="rounded-full border border-gray-700 px-2 py-0.5 text-xs text-gray-400">
            Panel
          </span>
        </Link>
        <h1 className="text-2xl font-bold">Acceso interno</h1>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          Los leads del formulario de la web llegan aquí automáticamente.
        </p>

        {!configured && (
          <p className="mt-5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
            Falta configurar la contraseña del panel en el servidor.
          </p>
        )}

        {error && messages[error] && (
          <p className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {messages[error]}
          </p>
        )}

        <form action={loginPanel} className="mt-7 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-gray-300">
            Contraseña
            <input
              name="password"
              type="password"
              required
              className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
              placeholder="Contraseña del panel"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-lime-400 px-6 py-3 font-bold text-gray-950 transition hover:bg-lime-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

function LeadRow({ lead }: { lead: LeadRecord }) {
  return (
    <tr className="border-t border-gray-900 align-top">
      <td className="px-4 py-4">
        <p className="font-bold text-white">{lead.name}</p>
        {lead.company && <p className="text-xs text-gray-500">{lead.company}</p>}
        {lead.email && <p className="mt-1 text-xs text-gray-400">{lead.email}</p>}
      </td>
      <td className="min-w-[280px] px-4 py-4">
        <p className="font-medium text-gray-100">{lead.interest}</p>
        {lead.budget && <p className="mt-1 text-xs text-gray-500">Inversión: {lead.budget}</p>}
        {lead.timeline && <p className="text-xs text-gray-500">Tiempo: {lead.timeline}</p>}
        {lead.message && <p className="mt-2 max-w-lg text-xs leading-5 text-gray-400">{lead.message}</p>}
      </td>
      <td className="px-4 py-4 text-gray-300">{lead.origin}</td>
      <td className="px-4 py-4">
        <form action={setLeadStatus} className="flex items-center gap-2">
          <input type="hidden" name="id" value={lead.id} />
          <select
            name="status"
            defaultValue={lead.status}
            className={`rounded-full border px-3 py-1 text-xs font-bold outline-none ${statusStyles[lead.status]}`}
          >
            {getLeadStatuses().map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-full border border-gray-700 px-3 py-1 text-xs font-bold text-gray-300 transition hover:border-lime-400 hover:text-lime-300"
          >
            Guardar
          </button>
        </form>
      </td>
      <td className="px-4 py-4 text-gray-300">{formatDate(lead.createdAt)}</td>
      <td className="px-4 py-4">
        <a
          href={phoneHref(lead.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-lime-400 transition hover:text-lime-300"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {lead.phone}
        </a>
      </td>
    </tr>
  );
}

export default async function PanelPage({ searchParams }: PanelPageProps) {
  const params = searchParams ? await searchParams : {};
  const configured = await panelPasswordConfigured();
  const authorized = await isPanelAuthorized();

  if (!authorized) {
    return <LoginPanel error={params.error} configured={configured} />;
  }

  const selectedStatus = params.status || "Todos";
  const leads = await listLeads();
  const filteredLeads =
    selectedStatus === "Todos"
      ? leads
      : leads.filter((lead) => lead.status === selectedStatus);
  const openLeads = leads.filter((lead) => lead.status === "Nuevo").length;
  const activeLeads = leads.filter((lead) => ["Contactado", "Propuesta"].includes(lead.status)).length;
  const pipeline = leads
    .filter((lead) => !["Perdido", "Ganado"].includes(lead.status))
    .reduce((total, lead) => total + lead.valueUsd, 0);
  const filters = ["Todos", ...getLeadStatuses()];

  return (
    <main className="min-h-screen bg-black text-white">
      <PanelHeader activo="leads" />

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Clientes y oportunidades</h1>
          <p className="mt-2 text-gray-400">
            Los leads del formulario de la web llegan aquí automáticamente.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard title="Leads totales" value={String(leads.length)} icon={<UsersIcon className="h-5 w-5" />} />
          <MetricCard
            title="Nuevos sin atender"
            value={String(openLeads)}
            icon={<ZapIcon className="h-5 w-5" />}
            highlight
          />
          <MetricCard title="En proceso" value={String(activeLeads)} icon={<ChartIcon className="h-5 w-5" />} />
          <MetricCard title="Pipeline estimado" value={formatCurrency(pipeline)} icon={<CheckIcon className="h-5 w-5" />} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((status) => (
            <Link
              key={status}
              href={status === "Todos" ? "/panel" : `/panel?status=${encodeURIComponent(status)}`}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedStatus === status
                  ? "bg-lime-400 text-gray-950"
                  : "border border-gray-800 bg-gray-950 text-gray-300 hover:border-lime-400 hover:text-lime-300"
              }`}
            >
              {status}
            </Link>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-800 bg-gray-950">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="px-4 py-4 font-semibold">Cliente</th>
                <th className="px-4 py-4 font-semibold">Interés</th>
                <th className="px-4 py-4 font-semibold">Origen</th>
                <th className="px-4 py-4 font-semibold">Estado</th>
                <th className="px-4 py-4 font-semibold">Fecha</th>
                <th className="px-4 py-4 font-semibold">Contacto</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
              ) : (
                <tr className="border-t border-gray-900">
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    No hay oportunidades con este filtro todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
