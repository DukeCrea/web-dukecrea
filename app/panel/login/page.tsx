'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export default function PanelLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const widgetLoaded = useRef(false);

  // Carga el script de Turnstile solo si hay site key configurada.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || widgetLoaded.current) return;
    widgetLoaded.current = true;
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/panel/login', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      });
      if (res.ok) {
        router.push('/panel');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'No se pudo iniciar sesión.');
        setLoading(false);
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 bg-lime-400 rounded-lg shadow-lg shadow-lime-400/40" />
          <span className="font-bold text-xl text-white">DukeCrea</span>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white mb-1">Panel de administración</h1>
          <p className="text-gray-400 text-sm mb-6">Acceso solo para el equipo.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm text-gray-300 mb-1.5">Correo electrónico</label>
              <input
                id="username"
                name="username"
                type="email"
                autoComplete="username"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-1.5">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="code" className="block text-sm text-gray-300 mb-1.5">
                Código 2FA <span className="text-gray-600 font-normal">(app de autenticación)</span>
              </label>
              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                maxLength={6}
                className="w-full px-4 py-2.5 rounded-lg bg-black border border-gray-800 text-white placeholder-gray-600 focus:border-lime-400 focus:outline-none transition tracking-widest"
                placeholder="000000"
              />
            </div>

            {TURNSTILE_SITE_KEY && (
              <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />
            )}

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 bg-lime-400 text-gray-950 rounded-lg font-bold hover:bg-lime-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando…' : 'Acceder'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">Protegido con Cloudflare Turnstile</p>
      </div>
    </div>
  );
}
