'use client';

import { useState, useRef, useEffect } from 'react';

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationId: number | null = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', resize);

    let time = 0;

    const drawFrame = () => {
      ctx.fillStyle = 'rgba(10, 15, 20, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.008;

      for (let x = 0; x < canvas.width; x += 50) {
        for (let y = 0; y < canvas.height; y += 50) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(distance * 0.015 - time * 4) * 4;
          const waveSize = Math.max(0, (10 - distance * 0.02) + wave);

          const intensity = Math.max(0, 1 - distance / 400);
          if (intensity <= 0) continue;

          const hue = 75 + Math.sin(time * 0.5 + distance * 0.02) * 20;

          ctx.fillStyle = `hsla(${hue}, 100%, 55%, ${intensity * 0.35})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1, waveSize * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reducedMotion) {
        animationId = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />;
}

const projects = [
  { id: 1, title: 'CamsMarketing', desc: 'Plataforma de marketing para autos con storefront Vite', tech: ['Laravel', 'Node.js'] },
  { id: 2, title: 'ChampionDesk', desc: 'Sistema de gestión de ventas y cotizaciones con Telegram', tech: ['Python', 'Telegram'] },
  { id: 3, title: 'EventosQR', desc: 'Validador de eventos con códigos QR integrado', tech: ['Node.js', 'Supabase'] },
  { id: 4, title: 'GymFlow/BerkFW', desc: 'Plataforma de reservas para gyms y fitness', tech: ['React', 'Next.js'] },
  { id: 5, title: 'DukeComment Bot', desc: 'Bot de Telegram para gestionar comentarios en redes', tech: ['Python', 'AI'] },
  { id: 6, title: 'Social Media Bot', desc: 'Automatización inteligente de publicaciones', tech: ['Python', 'Automation'] },
  { id: 7, title: 'MGC Ecosystem', desc: 'Soluciones empresariales completas en monorepo', tech: ['TypeScript', 'Enterprise'] },
];

const processSteps = [
  { step: 1, title: 'Briefing', desc: 'Entendemos tu visión y objetivos' },
  { step: 2, title: 'Diseño', desc: 'Planificamos la arquitectura' },
  { step: 3, title: 'Desarrollo', desc: 'Construimos con calidad' },
  { step: 4, title: 'Testing', desc: 'Validamos que todo funciona' },
  { step: 5, title: 'Deploy', desc: 'Lanzamos al mercado' },
];

const faqs = [
  { q: '¿Cuáles son tus tecnologías principales?', a: 'Node.js, Python, React, Next.js, TypeScript, PostgreSQL y tecnologías cloud como Vercel y AWS.' },
  { q: '¿Cuál es el tiempo de implementación?', a: 'Depende de la complejidad, pero típicamente 4-12 semanas para un proyecto completo.' },
  { q: '¿Ofrecen mantenimiento post-lanzamiento?', a: 'Sí, ofrecemos planes de mantenimiento y soporte continuo.' },
  { q: '¿Puedo empezar con un proyecto pequeño?', a: 'Por supuesto, comenzamos con un presupuesto acorde a tu necesidad.' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#projects', label: 'Proyectos' },
    { href: '#precios', label: 'Precios' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header Fijo */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur border-b border-gray-900 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg shadow-lg shadow-lime-400/50" />
            <span className="font-bold text-lg text-white">DukeCrea</span>
          </a>
          <nav className="hidden md:flex gap-12" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-300 font-medium hover:text-lime-400 transition text-sm">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden sm:block px-6 py-2.5 bg-lime-400 text-gray-950 rounded-lg text-sm font-bold hover:bg-lime-300 transition">
              Contáctame
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-900 bg-black px-6 py-4 flex flex-col gap-4" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 font-medium hover:text-lime-400 transition"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2.5 bg-lime-400 text-gray-950 rounded-lg text-sm font-bold text-center hover:bg-lime-300 transition"
            >
              Contáctame
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-8 min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
        <HeroCanvas />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Desarrollador <span className="text-lime-400">Full-Stack</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 drop-shadow-md">
            Construyo soluciones digitales escalables. Especializado en Node.js, Python, React y automatización con IA.
          </p>
          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            <a href="#contact" className="px-8 py-3 bg-lime-400 text-gray-950 rounded-lg font-bold hover:bg-lime-300 transition shadow-lg shadow-lime-400/30">
              Trabajemos juntos
            </a>
            <a
              href="https://github.com/DukeCrea"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-950 transition shadow-lg"
            >
              Ver GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-black py-12 px-6 md:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '7', label: 'Proyectos activos' },
              { value: '50+', label: 'Clientes satisfechos' },
              { value: '5+', label: 'Años de experiencia' },
              { value: '100%', label: 'Proyectos entregados' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-lime-400 mb-2">{stat.value}</div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Cómo trabajamos</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-lime-400 text-gray-950 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Potencias */}
      <section id="projects" className="bg-black py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Mis 7 Potencias</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <a
                key={proj.id}
                href="https://github.com/DukeCrea"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-950 p-6 rounded-xl border border-gray-800 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/20 transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-lime-400/10 border border-lime-400/30 rounded-lg flex items-center justify-center font-bold text-lime-400">
                    {proj.id}
                  </div>
                  <h3 className="font-bold text-white">{proj.title}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">{proj.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-lime-400/10 text-lime-300 border border-lime-400/20 text-xs font-medium rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Planes y precios</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Freelance */}
            <div className="border border-gray-800 rounded-xl p-8 bg-gray-950 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Freelance</h3>
              <p className="text-gray-400 font-medium mb-6">Para proyectos puntuales</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$50</span>
                <span className="text-gray-500">/hora</span>
              </div>
              <a href="#contact" className="mt-auto block w-full px-6 py-3 border-2 border-gray-700 text-white rounded-lg font-medium text-center hover:border-lime-400 hover:text-lime-400 transition">
                Solicitar presupuesto
              </a>
            </div>

            {/* Agencia */}
            <div className="border-2 border-lime-400 rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-950 flex flex-col shadow-lg shadow-lime-400/10">
              <div className="inline-block self-start px-3 py-1 bg-lime-400 text-gray-950 rounded-full text-xs font-bold mb-4">
                ⭐ Más popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Agencia</h3>
              <p className="text-gray-300 font-medium mb-6">Soluciones completas</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-lime-400">Personalizado</span>
              </div>
              <a href="#contact" className="mt-auto block w-full px-6 py-3 bg-lime-400 text-gray-950 rounded-lg font-bold text-center hover:bg-lime-300 transition">
                Contratar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-black py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-gray-950 p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition">
                <summary className="font-bold text-white hover:text-lime-400 cursor-pointer">
                  {faq.q}
                </summary>
                <p className="text-gray-400 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contact" className="bg-gradient-to-r from-lime-400 to-lime-500 py-20 px-6 md:px-8 scroll-mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-950">¿Listo para transformar tu negocio?</h2>
          <p className="text-xl mb-8 text-gray-900">
            Contáctame hoy y convirtamos tu idea en realidad
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://www.instagram.com/dukecrea"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gray-950 text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Instagram @dukecrea
            </a>
            <a href="mailto:duque629@gmail.com" className="px-8 py-3 border-2 border-gray-950 text-gray-950 rounded-lg font-bold hover:bg-gray-950 hover:text-white transition">
              Enviar email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-6 md:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Sitio</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#projects" className="hover:text-lime-400 transition">Proyectos</a></li>
                <li><a href="#precios" className="hover:text-lime-400 transition">Precios</a></li>
                <li><a href="#faq" className="hover:text-lime-400 transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Redes</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://github.com/DukeCrea" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/dukecrea" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contacto</h4>
              <p className="text-sm">
                <a href="mailto:duque629@gmail.com" className="hover:text-lime-400 transition">duque629@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} DukeCrea. Construido con Next.js + Vercel</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
