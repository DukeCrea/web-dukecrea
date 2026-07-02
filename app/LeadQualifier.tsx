'use client';

import { useState, FormEvent } from 'react';
import { CartIcon, ZapIcon, ChartIcon, BotIcon, PhoneIcon, PackageIcon, WhatsAppIcon, CheckIcon } from './icons';

const WHATSAPP_NUMBER = '50763006579';

type ProjectType = {
  id: string;
  label: string;
  Icon: (p: { className?: string }) => React.ReactElement;
};

const TYPES: ProjectType[] = [
  { id: 'Página web', label: 'Página web', Icon: PhoneIcon },
  { id: 'Tienda online', label: 'Tienda online / e-commerce', Icon: CartIcon },
  { id: 'Automatización', label: 'Automatización de procesos', Icon: ZapIcon },
  { id: 'Sistema o app a medida', label: 'Sistema o app a medida', Icon: PackageIcon },
  { id: 'Evaluación de sistemas', label: 'Evaluación de mis sistemas', Icon: ChartIcon },
  { id: 'Otra cosa', label: 'Otra cosa', Icon: BotIcon },
];

const SUBTYPES: Record<string, { q: string; options: string[] }> = {
  'Página web': { q: '¿Qué tipo de página?', options: ['Landing / una página', 'Corporativa (varias secciones)', 'Catálogo o portafolio', 'Con reservas o citas'] },
  'Tienda online': { q: '¿Qué vas a vender?', options: ['Productos físicos', 'Productos digitales', 'Servicios', 'En varios países'] },
  'Automatización': { q: '¿Qué quieres automatizar?', options: ['Ventas y cotizaciones', 'Atención al cliente (bots)', 'Redes sociales', 'Facturación / contable'] },
  'Sistema o app a medida': { q: '¿Para qué lo necesitas?', options: ['Reservas o citas', 'Inventario y stock', 'Membresías', 'Otro flujo interno'] },
};

export default function LeadQualifier() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [subtype, setSubtype] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const hasSub = Boolean(SUBTYPES[type]);
  const totalSteps = hasSub ? 4 : 3;
  const currentStep = !hasSub && step > 2 ? step - 1 : step;

  const summary = subtype ? `${type} — ${subtype}` : type;
  const message = `Hola DukeCrea 👋 Soy ${name}. Me interesa: ${summary}. Quiero digitalizar mi negocio, ¿cómo empezamos?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  function pickType(t: string) {
    setType(t);
    setSubtype('');
    setStep(SUBTYPES[t] ? 2 : 3);
  }

  function pickSubtype(s: string) {
    setSubtype(s);
    setStep(3);
  }

  function reset() {
    setStep(1);
    setType('');
    setSubtype('');
    setName('');
    setPhone('');
    setCompany('');
    setError('');
  }

  async function submitData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set('service', summary);
      const res = await fetch('/api/lead', { method: 'POST', body: fd });
      if (res.ok) {
        setStep(4);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'No se pudo enviar. Intenta de nuevo.');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 md:p-8 text-left">
      {/* Progreso */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition ${i < currentStep ? 'bg-lime-400' : 'bg-gray-800'}`} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-1">¿Qué quieres construir?</h3>
          <p className="text-gray-400 text-sm mb-6">Elige una opción y te decimos cómo lo hacemos.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => pickType(t.id)}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-800 bg-black hover:border-lime-400 hover:bg-lime-400/5 transition text-left"
              >
                <span className="w-10 h-10 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 shrink-0">
                  <t.Icon className="w-5 h-5" />
                </span>
                <span className="font-medium text-white">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && hasSub && (
        <div>
          <button onClick={() => setStep(1)} className="text-gray-500 text-sm hover:text-lime-400 mb-4">← Atrás</button>
          <h3 className="text-xl font-bold text-white mb-1">{SUBTYPES[type].q}</h3>
          <p className="text-gray-400 text-sm mb-6">Para <span className="text-lime-400">{type}</span></p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SUBTYPES[type].options.map((o) => (
              <button
                key={o}
                onClick={() => pickSubtype(o)}
                className="p-4 rounded-xl border border-gray-800 bg-black hover:border-lime-400 hover:bg-lime-400/5 transition text-left font-medium text-white"
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <button onClick={() => setStep(hasSub ? 2 : 1)} className="text-gray-500 text-sm hover:text-lime-400 mb-4">← Atrás</button>
          <h3 className="text-xl font-bold text-white mb-1">Déjanos tus datos</h3>
          <p className="text-gray-400 text-sm mb-5">
            Tu interés: <span className="text-lime-300 font-medium">{summary}</span>. Envíalos y sigue a WhatsApp.
          </p>
          <form onSubmit={submitData} className="space-y-3">
            {/* honeypot anti-bot (oculto) */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Tu nombre *"
              className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition"
            />
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Tu WhatsApp o teléfono *"
              className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition"
            />
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Tu negocio (opcional)"
              className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition"
            />
            {error && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="w-full px-6 py-3 bg-lime-400 text-gray-950 rounded-lg font-bold hover:bg-lime-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? 'Enviando…' : 'Enviar y continuar'}
            </button>
          </form>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-full bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400">
              <CheckIcon className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white">¡Recibido, {name.split(' ')[0]}!</h3>
          </div>
          <p className="text-gray-400 text-sm mb-5">
            Guardamos tu solicitud (<span className="text-lime-300 font-medium">{summary}</span>). Ahora termina de coordinar por WhatsApp:
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-lime-400 text-gray-950 rounded-lg font-bold hover:bg-lime-300 transition shadow-lg shadow-lime-400/20"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Continuar por WhatsApp
          </a>
          <button onClick={reset} className="w-full text-center text-gray-500 text-sm hover:text-gray-300 mt-4">
            Enviar otra solicitud
          </button>
        </div>
      )}
    </div>
  );
}
