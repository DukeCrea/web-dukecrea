'use client';

import { useState, useEffect, useRef } from 'react';

// ⚠️ REEMPLAZA con tu número real de WhatsApp (formato: 507 + 8 dígitos, sin espacios)
const WHATSAPP_NUMBER = '50700000000';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola DukeCrea, quiero digitalizar mi negocio. ¿Podemos hablar?'
)}`;

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

const services = [
  {
    icon: '🛒',
    title: 'Tiendas online y e-commerce',
    desc: 'Vende por internet con catálogo, carrito, pagos e inventario. Multi-país y multi-moneda si operas en más de un mercado.',
    tags: ['Laravel', 'Filament', 'Next.js'],
  },
  {
    icon: '⚙️',
    title: 'Automatización de operaciones',
    desc: 'Contratos, cotizaciones y facturas que se generan solos. Bots que leen cédulas con OCR y se conectan a tu CRM y Google Drive.',
    tags: ['Python', 'Telegram', 'Zoho CRM'],
  },
  {
    icon: '📊',
    title: 'Contabilidad y facturación fiscal',
    desc: 'Sistema contable localizado para Panamá: DGI, ITBMS, ISR y CSS. Balance, estado de resultados y reportería lista para el fisco.',
    tags: ['TypeScript', 'DGI', 'ITBMS'],
  },
  {
    icon: '🤖',
    title: 'Marketing y redes con IA',
    desc: 'Publicación automática de contenido, auto-respuesta de comentarios en Instagram y análisis de Google My Business con IA.',
    tags: ['IA / Claude', 'Instagram', 'Automation'],
  },
  {
    icon: '📱',
    title: 'Apps y plataformas a medida',
    desc: 'Sistemas web y SaaS para tu rubro: reservas, membresías, validación de eventos con QR o cualquier flujo propio de tu negocio.',
    tags: ['React', 'Next.js', 'Supabase'],
  },
  {
    icon: '📦',
    title: 'Inventario y gestión interna',
    desc: 'Controla stock, clientes y ventas desde un solo lugar. Menos hojas de cálculo sueltas y menos errores manuales.',
    tags: ['Python', 'MySQL', 'Dashboards'],
  },
];

const cases = [
  {
    client: 'Champion Motors',
    sector: 'Concesionario de autos',
    desc: 'Web del concesionario + ChampionDesk: bot de Telegram que genera contratos de compra/venta y cotizaciones, lee cédulas con OCR, se integra con Zoho CRM y Google Drive, y envía recordatorios de saldos.',
    tags: ['Laravel', 'Python', 'Telegram', 'Zoho CRM'],
  },
  {
    client: 'Camsmark',
    sector: 'E-commerce multi-país',
    desc: 'Tienda online única con dos mercados (Panamá y Venezuela): precio, moneda, stock y checkout separados por país. Construida en Laravel 10 + Filament 3.',
    tags: ['Laravel 10', 'Filament 3', 'MySQL'],
  },
  {
    client: 'LIBRO',
    sector: 'Contabilidad fiscal',
    desc: 'Sistema contable multi-país con partida doble: Balance, Estado de Resultados y Flujo de Caja, más reportería fiscal para Panamá (DGI, ITBMS, ISR, CSS) y Venezuela.',
    tags: ['TypeScript', 'Contabilidad', 'Fiscal'],
  },
  {
    client: 'GymFlow',
    sector: 'SaaS para entrenadores',
    desc: 'Plataforma para entrenadores personales: planes de entrenamiento, seguimiento de RPE y check-ins diarios de sus clientes.',
    tags: ['JavaScript', 'SaaS', 'React'],
  },
  {
    client: 'EventosQR',
    sector: 'Gestión de eventos',
    desc: 'Registro y validación de asistentes a eventos mediante códigos QR con verificación visual en la entrada.',
    tags: ['Next.js', 'TypeScript', 'QR'],
  },
  {
    client: 'DukeGBP + marketing bots',
    sector: 'Marketing con IA',
    desc: 'Analizador de Google My Business con recomendaciones generadas por IA, auto-respuesta de comentarios de Instagram y publicador automático de contenido.',
    tags: ['Python', 'IA / Claude', 'Instagram'],
  },
];

const processSteps = [
  { step: 1, title: 'Diagnóstico', desc: 'Entiendo tu negocio y detecto qué procesos te quitan más tiempo.' },
  { step: 2, title: 'Propuesta', desc: 'Te presento la solución, el alcance y el presupuesto claro.' },
  { step: 3, title: 'Desarrollo', desc: 'Construyo la solución con entregas parciales para que la veas crecer.' },
  { step: 4, title: 'Puesta en marcha', desc: 'Instalo, migro tus datos y capacito a tu equipo.' },
  { step: 5, title: 'Soporte', desc: 'Te acompaño con mantenimiento y mejoras continuas.' },
];

const plans = [
  {
    name: 'Presencia digital',
    tagline: 'Para empezar a existir en internet',
    price: 'Desde $600',
    features: ['Sitio web o landing profesional', 'Optimizado para Google (SEO)', 'Formulario y WhatsApp', 'Diseño responsive'],
    featured: false,
  },
  {
    name: 'Automatización',
    tagline: 'Para dejar de trabajar manual',
    price: 'Desde $1,500',
    features: ['Tienda online o app a medida', 'Bots y automatización de procesos', 'Integraciones (CRM, Drive, pagos)', 'Panel de administración'],
    featured: true,
  },
  {
    name: 'Solución completa',
    tagline: 'Digitaliza todo el negocio',
    price: 'Cotización',
    features: ['Sistema a medida end-to-end', 'Contabilidad y facturación fiscal', 'Marketing e IA', 'Soporte y evolución continua'],
    featured: false,
  },
];

const faqs = [
  { q: '¿Trabajas con negocios pequeños o solo grandes empresas?', a: 'Trabajo con PYMEs de todos los tamaños. Empezamos con lo que más impacto te dé y crecemos desde ahí, con un presupuesto acorde a tu realidad.' },
  { q: '¿Cuánto cuesta digitalizar mi negocio?', a: 'Depende de lo que necesites. Una presencia digital arranca desde $600 y una automatización a medida desde $1,500. Te doy un presupuesto claro tras el diagnóstico inicial, que es gratis.' },
  { q: '¿Cuánto tarda un proyecto?', a: 'Una web sencilla puede estar en 1-2 semanas. Una plataforma o automatización completa suele tomar entre 4 y 12 semanas, con entregas parciales para que veas el avance.' },
  { q: '¿Puedo seguir usando mi WhatsApp e Instagram?', a: 'Claro. De hecho conecto tus herramientas actuales (WhatsApp, Instagram, Google) con los nuevos sistemas para que todo trabaje junto, no por separado.' },
  { q: '¿Me ayudas con la parte fiscal de Panamá?', a: 'Sí. Tengo sistemas contables preparados para DGI, ITBMS, ISR y CSS, así tu facturación y reportería quedan al día con la ley panameña.' },
  { q: '¿Ofreces soporte después del lanzamiento?', a: 'Sí, ofrezco planes de mantenimiento y mejoras continuas para que tu solución siga funcionando y evolucionando con tu negocio.' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#casos', label: 'Casos' },
    { href: '#proceso', label: 'Proceso' },
    { href: '#planes', label: 'Planes' },
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
          <nav className="hidden md:flex gap-10" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-300 font-medium hover:text-lime-400 transition text-sm">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block px-6 py-2.5 bg-lime-400 text-gray-950 rounded-lg text-sm font-bold hover:bg-lime-300 transition"
            >
              Hablemos
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2.5 bg-lime-400 text-gray-950 rounded-lg text-sm font-bold text-center hover:bg-lime-300 transition"
            >
              Hablemos por WhatsApp
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-8 min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
        <HeroCanvas />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-300 text-sm font-medium">
            Software y automatización para PYMEs · Panamá 🇵🇦
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Digitaliza tu negocio y <span className="text-lime-400">deja de trabajar manual</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 drop-shadow-md max-w-2xl mx-auto">
            Convierto tus procesos en papel y WhatsApp manual en sistemas que trabajan solos:
            tiendas online, automatización de ventas, contabilidad y marketing con IA.
          </p>
          <div className="flex gap-4 justify-center mb-8 flex-wrap">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-lime-400 text-gray-950 rounded-lg font-bold hover:bg-lime-300 transition shadow-lg shadow-lime-400/30"
            >
              Habla conmigo por WhatsApp
            </a>
            <a href="#casos" className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-950 transition shadow-lg">
              Ver casos reales
            </a>
          </div>
          <p className="text-sm text-gray-400">Diagnóstico inicial gratis · Sin compromiso</p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-black py-12 px-6 md:px-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '15+', label: 'Proyectos entregados' },
              { value: '2', label: 'Países (PA · VE)' },
              { value: '5+', label: 'Años de experiencia' },
              { value: '100%', label: 'A medida de tu negocio' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-lime-400 mb-2">{stat.value}</div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">¿Qué puedo digitalizar de tu negocio?</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Desde tu primera tienda online hasta automatizar toda tu operación. Elige por dónde empezar.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-gray-950 p-6 rounded-xl border border-gray-800 hover:border-lime-400/50 transition">
                <div className="text-3xl mb-4" aria-hidden="true">{s.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{s.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {s.tags.map((t) => (
                    <span key={t} className="px-2 py-1 bg-lime-400/10 text-lime-300 border border-lime-400/20 text-xs font-medium rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos reales */}
      <section id="casos" className="bg-black py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Negocios que ya digitalicé</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Proyectos reales, en producción, para clientes reales de Panamá y la región.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <article key={c.client} className="bg-gray-950 p-6 rounded-xl border border-gray-800 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/20 transition flex flex-col">
                <div className="mb-4">
                  <h3 className="font-bold text-white text-lg">{c.client}</h3>
                  <p className="text-lime-400 text-sm font-medium">{c.sector}</p>
                </div>
                <p className="text-gray-400 text-sm mb-4 flex-1">{c.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {c.tags.map((t) => (
                    <span key={t} className="px-2 py-1 bg-gray-900 text-gray-300 border border-gray-800 text-xs font-medium rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://github.com/DukeCrea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border-2 border-gray-700 text-white rounded-lg font-medium hover:border-lime-400 hover:text-lime-400 transition"
            >
              Ver más en GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Cómo trabajamos juntos</h2>
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

      {/* Planes */}
      <section id="planes" className="bg-black py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Planes para cada etapa</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Precios de referencia para orientarte. El presupuesto final lo defino tras el diagnóstico gratis.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-8 flex flex-col ${
                  plan.featured
                    ? 'border-2 border-lime-400 bg-gradient-to-br from-gray-900 to-gray-950 shadow-lg shadow-lime-400/10'
                    : 'border border-gray-800 bg-gray-950'
                }`}
              >
                {plan.featured && (
                  <div className="inline-block self-start px-3 py-1 bg-lime-400 text-gray-950 rounded-full text-xs font-bold mb-4">
                    ⭐ Más elegido
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 font-medium mb-6">{plan.tagline}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-lime-400' : 'text-white'}`}>{plan.price}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-lime-400 mt-0.5" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full px-6 py-3 rounded-lg font-bold text-center transition ${
                    plan.featured
                      ? 'bg-lime-400 text-gray-950 hover:bg-lime-300'
                      : 'border-2 border-gray-700 text-white hover:border-lime-400 hover:text-lime-400'
                  }`}
                >
                  Solicitar cotización
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 md:px-8 border-t border-gray-900 scroll-mt-16">
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
          <h2 className="text-4xl font-bold mb-6 text-gray-950">¿Listo para digitalizar tu negocio?</h2>
          <p className="text-xl mb-8 text-gray-900">
            Cuéntame qué te quita el sueño de tu operación y te digo cómo automatizarlo. El diagnóstico es gratis.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gray-950 text-white rounded-lg font-bold hover:bg-gray-800 transition"
            >
              Escríbeme por WhatsApp
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-lime-400 rounded-lg" />
                <span className="font-bold text-white">DukeCrea</span>
              </div>
              <p className="text-sm">Digitalización de negocios en Panamá 🇵🇦</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Sitio</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#servicios" className="hover:text-lime-400 transition">Servicios</a></li>
                <li><a href="#casos" className="hover:text-lime-400 transition">Casos</a></li>
                <li><a href="#planes" className="hover:text-lime-400 transition">Planes</a></li>
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
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition">WhatsApp</a>
                </li>
                <li>
                  <a href="mailto:duque629@gmail.com" className="hover:text-lime-400 transition">duque629@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} DukeCrea. Digitalizo tu negocio con software a medida.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
