'use client';

import { useState, useEffect, useMemo } from 'react';
import { UsersIcon, ChartIcon, CheckIcon, ZapIcon, WhatsAppIcon } from '../icons';

type Status = 'nuevo' | 'contactado' | 'propuesta' | 'ganado' | 'perdido';

type Lead = {
  id: string;
  name: string;
  company?: string;
  phone: string;
  source: string;
  service: string;
  status: Status;
  value?: number | null;
  createdAt: string;
};

const STATUS_META: Record<string, { label: string; badge: string }> = {
  nuevo: { label: 'Nuevo', badge: 'bg-blue-400/10 text-blue-300 border-blue-400/30' },
  contactado: { label: 'Contactado', badge: 'bg-amber-400/10 text-amber-300 border-amber-400/30' },
  propuesta: { label: 'Propuesta', badge: 'bg-purple-400/10 text-purple-300 border-purple-400/30' },
  ganado: { label: 'Ganado', badge: 'bg-lime-400/10 text-lime-300 border-lime-400/30' },
  perdido: { label: 'Perdido', badge: 'bg-gray-500/10 text-gray-400 border-gray-500/30' },
};

const SOURCE_LABEL: Record<string, string> = {
  formulario: 'Formulario',
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  referido: 'Referido',
};

function waLink(phone: string) {
  const digits = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits}`;
}

export default function Panel() {
  const [filter, setFilter] = useState<Status | 'todos'>('todos');
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/panel/leads')
      .then((r) => (r.ok ? r.json() : { leads: [] }))
      .then((d) => setAllLeads(Array.isArray(d.leads) ? d.leads : []))
      .catch(() => setAllLeads([]))
      .finally(() => setLoading(false));
  }, []);

  const leads = useMemo(
    () => (filter === 'todos' ? allLeads : allLeads.filter((l) => l.status === filter)),
    [filter, allLeads]
  );

  const stats = useMemo(() => {
    const total = allLeads.length;
    const nuevos = allLeads.filter((l) => l.status === 'nuevo').length;
    const enProceso = allLeads.filter((l) => l.status === 'contactado' || l.status === 'propuesta').length;
    const pipeline = allLeads
      .filter((l) => l.status !== 'perdido')
      .reduce((sum, l) => sum + (l.value ?? 0), 0);
    return { total, nuevos, enProceso, pipeline };
  }, [allLeads]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-900 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg" />
            <span className="font-bold text-lg">DukeCrea</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">Panel</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="w-8 h-8 rounded-full bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400 text-xs font-bold">DC</div>
            <a href="/api/panel/logout" className="text-gray-400 hover:text-lime-400 transition font-medium">Salir</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-1">Clientes y oportunidades</h1>
        <p className="text-gray-400 text-sm mb-8">Los leads del formulario de la web llegan aquí automáticamente.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<UsersIcon className="w-5 h-5" />} label="Leads totales" value={String(stats.total)} />
          <StatCard icon={<ZapIcon className="w-5 h-5" />} label="Nuevos sin atender" value={String(stats.nuevos)} accent />
          <StatCard icon={<ChartIcon className="w-5 h-5" />} label="En proceso" value={String(stats.enProceso)} />
          <StatCard icon={<CheckIcon className="w-5 h-5" />} label="Pipeline (USD)" value={`$${stats.pipeline.toLocaleString()}`} />
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {(['todos', 'nuevo', 'contactado', 'propuesta', 'ganado', 'perdido'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                filter === f ? 'bg-lime-400 text-gray-950 border-lime-400' : 'bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
            >
              {f === 'todos' ? 'Todos' : STATUS_META[f].label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-950 text-gray-400 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Interés</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Origen</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Fecha</th>
                <th className="px-4 py-3 font-medium text-right">Contacto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-500">Cargando…</td></tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    {allLeads.length === 0
                      ? 'Aún no hay leads. Cuando alguien complete el formulario de la web, aparecerá aquí.'
                      : 'No hay leads con este estado.'}
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="bg-black hover:bg-gray-950/60 transition">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{lead.name}</div>
                      {lead.company && <div className="text-gray-500 text-xs">{lead.company}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{lead.service}</td>
                    <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{SOURCE_LABEL[lead.source] || lead.source}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${(STATUS_META[lead.status] || STATUS_META.nuevo).badge}`}>
                        {(STATUS_META[lead.status] || STATUS_META.nuevo).label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                      {new Date(lead.createdAt).toLocaleDateString('es-PA')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={waLink(lead.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-lime-400 hover:text-lime-300 font-medium"
                        title={`Escribir a ${lead.phone}`}
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span className="hidden lg:inline">{lead.phone}</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, accent = false }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? 'border-lime-400/40 bg-lime-400/5' : 'border-gray-800 bg-gray-950'}`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${accent ? 'bg-lime-400/20 text-lime-400' : 'bg-gray-900 text-gray-400'}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}
