'use client';

import { useState, useMemo } from 'react';
import { UsersIcon, ChartIcon, CheckIcon, ZapIcon, WhatsAppIcon } from '../icons';

// Datos de ejemplo (mock). Se reemplazan por Supabase cuando el VPS esté listo.
type Status = 'nuevo' | 'contactado' | 'propuesta' | 'ganado' | 'perdido';

type Lead = {
  id: number;
  name: string;
  company: string;
  phone: string;
  source: 'formulario' | 'whatsapp' | 'instagram' | 'referido';
  service: string;
  status: Status;
  value: number | null;
  createdAt: string;
};

const MOCK_LEADS: Lead[] = [
  { id: 1, name: 'María Pérez', company: 'Boutique Luna', phone: '+507 6xxx', source: 'whatsapp', service: 'Tienda online', status: 'nuevo', value: 1500, createdAt: '2026-07-02' },
  { id: 2, name: 'Carlos Him', company: 'AutoRepuestos Him', phone: '+507 6xxx', source: 'formulario', service: 'Automatización', status: 'contactado', value: 3000, createdAt: '2026-07-01' },
  { id: 3, name: 'Gimnasio FitPro', company: 'FitPro', phone: '+507 6xxx', source: 'instagram', service: 'App de reservas', status: 'propuesta', value: 4500, createdAt: '2026-06-29' },
  { id: 4, name: 'Ana Rodríguez', company: 'Contadores AR', phone: '+507 6xxx', source: 'referido', service: 'Sistema contable', status: 'ganado', value: 6000, createdAt: '2026-06-25' },
  { id: 5, name: 'Luis Mendoza', company: 'Ferretería LM', phone: '+507 6xxx', source: 'formulario', service: 'Inventario', status: 'perdido', value: null, createdAt: '2026-06-20' },
  { id: 6, name: 'Restaurante Sabor', company: 'Sabor Panameño', phone: '+507 6xxx', source: 'whatsapp', service: 'Presencia digital', status: 'nuevo', value: 800, createdAt: '2026-07-02' },
];

const STATUS_META: Record<Status, { label: string; badge: string }> = {
  nuevo: { label: 'Nuevo', badge: 'bg-blue-400/10 text-blue-300 border-blue-400/30' },
  contactado: { label: 'Contactado', badge: 'bg-amber-400/10 text-amber-300 border-amber-400/30' },
  propuesta: { label: 'Propuesta', badge: 'bg-purple-400/10 text-purple-300 border-purple-400/30' },
  ganado: { label: 'Ganado', badge: 'bg-lime-400/10 text-lime-300 border-lime-400/30' },
  perdido: { label: 'Perdido', badge: 'bg-gray-500/10 text-gray-400 border-gray-500/30' },
};

const SOURCE_LABEL: Record<Lead['source'], string> = {
  formulario: 'Formulario',
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  referido: 'Referido',
};

export default function Panel() {
  const [filter, setFilter] = useState<Status | 'todos'>('todos');

  const leads = useMemo(
    () => (filter === 'todos' ? MOCK_LEADS : MOCK_LEADS.filter((l) => l.status === filter)),
    [filter]
  );

  const stats = useMemo(() => {
    const total = MOCK_LEADS.length;
    const nuevos = MOCK_LEADS.filter((l) => l.status === 'nuevo').length;
    const enProceso = MOCK_LEADS.filter((l) => l.status === 'contactado' || l.status === 'propuesta').length;
    const ganados = MOCK_LEADS.filter((l) => l.status === 'ganado');
    const pipeline = MOCK_LEADS
      .filter((l) => l.status !== 'perdido')
      .reduce((sum, l) => sum + (l.value ?? 0), 0);
    return { total, nuevos, enProceso, ganados: ganados.length, pipeline };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header del panel */}
      <header className="border-b border-gray-900 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg" />
            <span className="font-bold text-lg">DukeCrea</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">Panel</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="hidden sm:inline">Antonio Duque</span>
            <div className="w-8 h-8 rounded-full bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400 text-xs font-bold">AD</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-2 flex items-center gap-2">
          <h1 className="text-2xl font-bold">Clientes y oportunidades</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
            Vista previa · datos de ejemplo
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-8">Gestiona tus leads desde que llegan hasta que cierras la venta.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<UsersIcon className="w-5 h-5" />} label="Leads totales" value={String(stats.total)} />
          <StatCard icon={<ZapIcon className="w-5 h-5" />} label="Nuevos sin atender" value={String(stats.nuevos)} accent />
          <StatCard icon={<ChartIcon className="w-5 h-5" />} label="En proceso" value={String(stats.enProceso)} />
          <StatCard icon={<CheckIcon className="w-5 h-5" />} label="Pipeline (USD)" value={`$${stats.pipeline.toLocaleString()}`} />
        </div>

        {/* Filtros */}
        <div className="flex gap-2 flex-wrap mb-4">
          {(['todos', 'nuevo', 'contactado', 'propuesta', 'ganado', 'perdido'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                filter === f
                  ? 'bg-lime-400 text-gray-950 border-lime-400'
                  : 'bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
            >
              {f === 'todos' ? 'Todos' : STATUS_META[f].label}
            </button>
          ))}
        </div>

        {/* Tabla de leads */}
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-950 text-gray-400 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Servicio</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Origen</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium text-right">Valor</th>
                <th className="px-4 py-3 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {leads.map((lead) => (
                <tr key={lead.id} className="bg-black hover:bg-gray-950/60 transition">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{lead.name}</div>
                    <div className="text-gray-500 text-xs">{lead.company}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{lead.service}</td>
                  <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{SOURCE_LABEL[lead.source]}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${STATUS_META[lead.status].badge}`}>
                      {STATUS_META[lead.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">
                    {lead.value ? `$${lead.value.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-lime-400 hover:text-lime-300 font-medium"
                      title="Escribir por WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span className="hidden lg:inline">Escribir</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-600 text-xs mt-6">
          Los datos mostrados son de ejemplo. Al conectar Supabase, los leads reales entrarán aquí
          automáticamente desde el formulario y WhatsApp de la web.
        </p>
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
