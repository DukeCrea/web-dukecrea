'use client';

import { useState } from 'react';
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

  const hasSub = Boolean(SUBTYPES[type]);
  const totalSteps = hasSub ? 3 : 2;
  const currentStep = step === 3 && !hasSub ? 2 : step;

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
  }

  const summary = subtype ? `${type} — ${subtype}` : type;
  const message = `Hola DukeCrea 👋${name ? ` Soy ${name}.` : ''} Me interesa: ${summary}. Quiero digitalizar mi negocio, ¿cómo empezamos?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 md:p-8 text-left">
      {/* Progreso */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition ${i < currentStep ? 'bg-lime-400' : 'bg-gray-800'}`}
          />
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
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-full bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400">
              <CheckIcon className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-white">¡Listo!</h3>
          </div>
          <p className="text-gray-400 text-sm mb-5">
            Tu interés: <span className="text-lime-300 font-medium">{summary}</span>. Déjanos tu nombre (opcional) y hablemos.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre (opcional)"
            className="w-full mb-4 px-4 py-2.5 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition"
          />
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
            Empezar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
