'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 15, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.008;

      for (let x = 0; x < canvas.width; x += 50) {
        for (let y = 0; y < canvas.height; y += 50) {
          const dx = mousePos.x - x;
          const dy = mousePos.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(distance * 0.015 - time * 4) * 35;
          const waveSize = Math.max(0, 50 - distance * 0.08) + wave;

          const intensity = Math.max(0, 1 - distance / 350);
          const hue = 75 + Math.sin(time * 0.5 + distance * 0.02) * 20;

          ctx.fillStyle = `hsla(${hue}, 120%, 55%, ${intensity * 0.6})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(3, waveSize * 0.6), 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${intensity * 0.5})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, waveSize * 0.8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePos]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function Home() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const heroRef = useRef(null);

  const projects = [
    { id: 1, title: 'CamsMarketing', desc: 'Plataforma de marketing para autos con storefront Vite', tech: 'Laravel, Node.js' },
    { id: 2, title: 'ChampionDesk', desc: 'Sistema de gestión de ventas y cotizaciones con Telegram', tech: 'Python, Telegram' },
    { id: 3, title: 'EventosQR', desc: 'Validador de eventos con códigos QR integrado', tech: 'Node.js, Supabase' },
    { id: 4, title: 'GymFlow/BerkFW', desc: 'Plataforma de reservas para gyms y fitness', tech: 'React, Next.js' },
    { id: 5, title: 'DukeComment Bot', desc: 'Bot de Telegram para gestionar comentarios en redes', tech: 'Python, AI' },
    { id: 6, title: 'Social Media Bot', desc: 'Automatización inteligente de publicaciones', tech: 'Python, Automation' },
    { id: 7, title: 'MGC Ecosystem', desc: 'Soluciones empresariales completas en monorepo', tech: 'TypeScript, Enterprise' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header Fijo */}
      <header className="fixed top-0 w-full bg-black/95 border-b border-gray-900 z-50">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg shadow-lg shadow-lime-400/50" />
            <span className="font-bold text-lg">DukeCrea</span>
          </div>
          <nav className="hidden md:flex gap-12">
            <a href="#projects" className="text-gray-800 font-medium hover:text-lime-600 transition text-sm">Proyectos</a>
            <a href="#precios" className="text-gray-800 font-medium hover:text-lime-600 transition text-sm">Precios</a>
            <a href="#faq" className="text-gray-800 font-medium hover:text-lime-600 transition text-sm">FAQ</a>
          </nav>
          <a href="#contact" className="px-6 py-2.5 bg-lime-400 text-white rounded-lg text-sm font-medium hover:bg-lime-500 transition">
            Comenzar gratis
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-16 px-8 min-h-screen flex items-center justify-center overflow-hidden bg-gray-950"
      >
        <HeroCanvas />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Full-Stack Developer - Tema Oscuro
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 drop-shadow-md">
            Construyo soluciones digitales escalables. Especializado en Node.js, Python, React y automatización con IA.
          </p>
          <div className="flex gap-4 justify-center mb-12 flex-wrap">
            <a href="#contact" className="px-8 py-3 bg-lime-400 text-white rounded-lg font-bold hover:bg-lime-500 transition shadow-lg">
              Comenzar gratis
            </a>
            <a href="https://github.com/DukeCrea" target="_blank" className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-950 transition shadow-lg">
              Ver GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-black py-12 px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-lime-400 mb-2">7</div>
              <p className="text-gray-300 font-medium">Proyectos activos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-lime-400 mb-2">50+</div>
              <p className="text-gray-300 font-medium">Clientes satisfechos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-lime-400 mb-2">5+</div>
              <p className="text-gray-300 font-medium">Años de experiencia</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-lime-400 mb-2">100%</div>
              <p className="text-gray-300 font-medium">Proyectos entregados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Cómo trabajamos</h2>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: 1, title: 'Briefing', desc: 'Entendemos tu visión y objetivos' },
              { step: 2, title: 'Diseño', desc: 'Planificamos la arquitectura' },
              { step: 3, title: 'Desarrollo', desc: 'Construimos con calidad' },
              { step: 4, title: 'Testing', desc: 'Validamos todo funciona' },
              { step: 5, title: 'Deploy', desc: 'Lanzamos al mercado' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-lime-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Potencias */}
      <section id="projects" className="bg-black py-20 px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Mis 7 Potencias</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <a
                key={proj.id}
                href={`https://github.com/DukeCrea/${proj.title.toLowerCase().replace(/\s+/g, '-')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-950 p-6 rounded-xl border border-gray-800 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/20 transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-lime-400">
                    {proj.id}
                  </div>
                  <h3 className="font-bold text-white">{proj.title}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">{proj.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {proj.tech.split(', ').map((t) => (
                    <span key={t} className="px-2 py-1 bg-lime-100 text-lime-700 text-xs font-medium rounded-full">
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
      <section id="precios" className="py-20 px-8 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Planes y precios</h2>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-900 rounded-lg p-1 border border-gray-800">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  billingCycle === 'monthly'
                    ? 'bg-gray-800 text-white shadow'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  billingCycle === 'annual'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Anual
              </button>
            </div>
          </div>

          {/* Tarjetas */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Freelance */}
            <div className="border border-gray-800 rounded-xl p-8 bg-gray-950">
              <h3 className="text-2xl font-bold text-white mb-2">Freelance</h3>
              <p className="text-gray-400 font-medium mb-6">Para proyectos puntuales</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">$50</span>
                <span className="text-gray-500">/hora</span>
              </div>
              <a href="#contact" className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-medium text-center hover:border-gray-400 transition">
                Solicitar presupuesto
              </a>
            </div>

            {/* Agencia */}
            <div className="border-2 border-lime-400 rounded-xl p-8 bg-gradient-to-br from-blue-50 to-white">
              <div className="inline-block px-3 py-1 bg-lime-400 text-white rounded-full text-xs font-bold mb-4">
                ⭐ Más popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Agencia</h3>
              <p className="text-gray-300 font-medium mb-6">Soluciones completas</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-lime-400">Personalizado</span>
              </div>
              <a href="#contact" className="block w-full px-6 py-3 bg-lime-400 text-white rounded-lg font-medium text-center hover:bg-lime-500 transition">
                Contratar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-black py-20 px-8 border-t border-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              { q: '¿Cuáles son tus tecnologías principales?', a: 'Node.js, Python, React, Next.js, TypeScript, PostgreSQL y tecnologías cloud como Vercel y AWS.' },
              { q: '¿Cuál es el tiempo de implementación?', a: 'Depende de la complejidad, pero típicamente 4-12 semanas para un proyecto completo.' },
              { q: '¿Ofrecen mantenimiento post-lanzamiento?', a: 'Sí, ofrecemos planes de mantenimiento y soporte continuo.' },
              { q: '¿Puedo empezar con un proyecto pequeño?', a: 'Por supuesto, comenzamos con un presupuesto acorde a tu necesidad.' },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-950 p-6 rounded-lg border border-gray-800 cursor-pointer hover:border-gray-700 transition">
                <summary className="font-bold text-white hover:text-lime-400">
                  {faq.q}
                </summary>
                <p className="text-gray-400 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contact" className="bg-gradient-to-r from-lime-400 to-lime-500 text-white py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para transformar tu negocio?</h2>
          <p className="text-xl mb-8 text-lime-100">
            Contáctame hoy y convirtamos tu idea en realidad
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://www.instagram.com/dukecrea" target="_blank" className="px-8 py-3 bg-white text-lime-400 rounded-lg font-medium hover:bg-gray-100 transition">
              Instagram @dukecrea
            </a>
            <a href="mailto:duque629@gmail.com" className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-lime-400 transition">
              Enviar email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#projects" className="hover:text-white transition">Proyectos</a></li>
                <li><a href="#precios" className="hover:text-white transition">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/DukeCrea" target="_blank" className="hover:text-white transition">GitHub</a></li>
                <li><a href="https://www.instagram.com/dukecrea" target="_blank" className="hover:text-white transition">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contacto</h4>
              <p className="text-sm">duque629@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 DukeCrea. Construido con Vercel + Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
