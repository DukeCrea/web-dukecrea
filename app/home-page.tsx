"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  BotIcon,
  CartIcon,
  ChartIcon,
  CheckIcon,
  PackageIcon,
  PhoneIcon,
  StarIcon,
  UsersIcon,
  WhatsAppIcon,
  ZapIcon,
} from "./icons";
import {
  benefits,
  cases,
  faqs,
  getWhatsAppUrl,
  navLinks,
  plans,
  processSteps,
  serviceCategoryMap,
  siteConfig,
  team,
  technologies,
  type Service,
} from "./lib/site";

const iconMap = {
  bot: BotIcon,
  cart: CartIcon,
  chart: ChartIcon,
  package: PackageIcon,
  phone: PhoneIcon,
  users: UsersIcon,
  zap: ZapIcon,
} satisfies Record<Service["icon"], typeof BotIcon>;

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationId: number | null = null;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    };

    const drawFrame = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.32)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += reducedMotion ? 0.002 : 0.008;

      const step = window.innerWidth < 768 ? 72 : 54;
      for (let x = 0; x < canvas.width; x += step) {
        for (let y = 0; y < canvas.height; y += step) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const intensity = Math.max(0, 1 - distance / 420);
          if (intensity <= 0) continue;

          const wave = Math.sin(distance * 0.015 - time * 4) * 4;
          const waveSize = Math.max(1, 10 - distance * 0.02 + wave);
          const hue = 78 + Math.sin(time * 0.5 + distance * 0.02) * 18;

          ctx.fillStyle = `hsla(${hue}, 100%, 55%, ${intensity * 0.34})`;
          ctx.beginPath();
          ctx.arc(x, y, waveSize * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reducedMotion) {
        animationId = requestAnimationFrame(drawFrame);
      }
    };

    resize();
    drawFrame();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-gray-400">{description}</p>}
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-gray-900 bg-black/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="DukeCrea inicio">
            <div className="h-8 w-8 rounded-lg bg-lime-400 shadow-lg shadow-lime-400/50" />
            <span className="text-lg font-bold text-white">DukeCrea</span>
          </Link>

          <nav className="hidden gap-8 md:flex" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 transition hover:text-lime-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-lime-400 px-6 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-lime-300 sm:flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Hablemos
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-900 hover:text-white md:hidden"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-gray-900 bg-black px-6 py-4 md:hidden" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-gray-300 transition hover:text-lime-400"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-lime-400 px-6 py-2.5 text-center text-sm font-bold text-gray-950 transition hover:bg-lime-300"
            >
              Hablemos por WhatsApp
            </a>
          </nav>
        )}
      </header>

      <main>
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6 pb-16 pt-32 md:px-8">
          <HeroCanvas />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-gray-950" />

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-medium text-lime-300"
            >
              Agencia de software, automatización e IA para negocios
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mb-6 text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-7xl"
            >
              Digitaliza tu negocio y <span className="text-lime-400">deja de trabajar manual</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-100 drop-shadow-md md:text-xl"
            >
              Convertimos procesos en papel, Excel y WhatsApp manual en sistemas que trabajan contigo:
              webs, e-commerce, software, automatizaciones, Ads, SEO/GEO y paneles inteligentes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mb-8 flex flex-wrap justify-center gap-4"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3 font-bold text-gray-950 shadow-lg shadow-lime-400/30 transition hover:-translate-y-0.5 hover:bg-lime-300"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Escríbenos por WhatsApp
              </a>
              <Link
                href="/#servicios"
                className="rounded-lg border-2 border-white px-8 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-950"
              >
                Explorar servicios
              </Link>
            </motion.div>
            <p className="text-sm text-gray-400">Diagnóstico inicial gratis · Sin compromiso</p>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-black px-6 py-12 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { value: "15+", label: "Proyectos entregados" },
              { value: "16", label: "Servicios digitales" },
              { value: "5+", label: "Años de experiencia" },
              { value: "100%", label: "A medida de tu negocio" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="mb-2 text-4xl font-bold text-lime-400">{stat.value}</div>
                <p className="font-medium text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <Reveal id="servicios" className="scroll-mt-16 border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Servicios"
              title="Todo lo que puedes sumar a tu sistema digital"
              description="La Home conserva su base actual y ahora conecta a páginas específicas para cada servicio, listas para SEO, GEO y campañas."
            />
            <div className="space-y-12">
              {serviceCategoryMap.map((category) => (
                <div key={category.id}>
                  <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div>
                      <p className="text-sm font-semibold text-lime-300">{category.label}</p>
                      <h3 className="mt-1 text-2xl font-bold text-white">{category.headline}</h3>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-gray-400">{category.description}</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {category.services.map((service) => {
                      const Icon = iconMap[service.icon];
                      return (
                        <Link
                          key={service.slug}
                          href={`/servicios/${service.slug}`}
                          className="group rounded-xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-lime-400/70 hover:shadow-lg hover:shadow-lime-400/10"
                        >
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-lime-400/30 bg-lime-400/10 text-lime-400">
                            <Icon className="h-6 w-6" />
                          </div>
                          <h4 className="mb-2 text-lg font-bold text-white group-hover:text-lime-300">
                            {service.title}
                          </h4>
                          <p className="mb-4 text-sm leading-6 text-gray-400">{service.summary}</p>
                          <span className="text-sm font-bold text-lime-300">Ver servicio</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
                Beneficios
              </p>
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                Un ecosistema digital, no piezas sueltas
              </h2>
              <p className="mt-4 leading-7 text-gray-400">
                Sumamos páginas, automatizaciones, datos y marketing alrededor de lo que ya existe en tu negocio.
                La meta no es tener más herramientas: es que el sistema trabaje mejor.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                  <CheckIcon className="mb-3 h-5 w-5 text-lime-400" />
                  <p className="text-sm leading-6 text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="casos" className="scroll-mt-16 border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Casos"
              title="Negocios y productos que ya digitalizamos"
              description="Proyectos reales de software, e-commerce, automatización, contabilidad, eventos y marketing con IA."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((caseItem) => (
                <article
                  key={caseItem.client}
                  className="flex flex-col rounded-xl border border-gray-800 bg-gray-950 p-6 transition hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/20"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white">{caseItem.client}</h3>
                    <p className="text-sm font-medium text-lime-400">{caseItem.sector}</p>
                  </div>
                  <p className="mb-4 flex-1 text-sm leading-6 text-gray-400">{caseItem.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-gray-800 bg-gray-900 px-2 py-1 text-xs font-medium text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-gray-700 px-8 py-3 font-medium text-white transition hover:border-lime-400 hover:text-lime-400"
              >
                Ver más en GitHub
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal id="equipo" className="scroll-mt-16 border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="Equipo"
              title="Fundadores al frente y especialistas según el reto"
              description="DukeCrea combina dirección cercana, desarrollo senior y especialistas que se integran según cada proyecto."
            />
            <div className="grid gap-6 sm:grid-cols-3">
              {team.map((member) => (
                <div key={member.name} className="rounded-xl border border-gray-800 bg-gray-950 p-8 text-center transition hover:border-lime-400/50">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-lime-400/40 bg-lime-400/10">
                    {member.initials ? (
                      <span className="text-2xl font-bold text-lime-400">{member.initials}</span>
                    ) : (
                      <UsersIcon className="h-8 w-8 text-lime-400" />
                    )}
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="proceso" className="scroll-mt-16 border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="Cómo trabajamos" description="Un proceso claro para pasar de idea o problema operativo a solución funcionando." />
            <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
              {processSteps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-lg font-bold text-gray-950">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                  <p className="text-sm font-medium leading-6 text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Stack"
              title="Tecnologías y herramientas que usamos"
              description="Elegimos herramientas modernas, mantenibles y apropiadas para el tamaño real del negocio."
            />
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm font-medium text-lime-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="planes" className="scroll-mt-16 border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Planes"
              title="Planes para cada etapa"
              description="Precios de referencia para orientarte. El presupuesto final se define tras el diagnóstico inicial."
            />
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col rounded-xl p-8 ${
                    plan.featured
                      ? "border-2 border-lime-400 bg-gradient-to-br from-gray-900 to-gray-950 shadow-lg shadow-lime-400/10"
                      : "border border-gray-800 bg-gray-950"
                  }`}
                >
                  {plan.featured && (
                    <div className="mb-4 inline-flex items-center gap-1.5 self-start rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-gray-950">
                      <StarIcon className="h-3.5 w-3.5" />
                      Más elegido
                    </div>
                  )}
                  <h3 className="mb-1 text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mb-6 font-medium text-gray-400">{plan.tagline}</p>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.featured ? "text-lime-400" : "text-white"}`}>
                      {plan.price}
                    </span>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={getWhatsAppUrl(`Hola DukeCrea, quiero una cotización para ${plan.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full rounded-lg px-6 py-3 text-center font-bold transition ${
                      plan.featured
                        ? "bg-lime-400 text-gray-950 hover:bg-lime-300"
                        : "border-2 border-gray-700 text-white hover:border-lime-400 hover:text-lime-400"
                    }`}
                  >
                    Solicitar cotización
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="faq" className="scroll-mt-16 border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading title="Preguntas frecuentes" />
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="rounded-lg border border-gray-800 bg-gray-950 p-6 transition hover:border-gray-700">
                  <summary className="cursor-pointer font-bold text-white hover:text-lime-400">{faq.q}</summary>
                  <p className="mt-4 leading-7 text-gray-400">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>

        <section id="contact" className="scroll-mt-16 bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-950">¿Listo para digitalizar tu negocio?</h2>
            <p className="mb-8 text-xl text-gray-900">
              Cuéntanos qué te quita tiempo, ventas o claridad operativa y te decimos cómo automatizarlo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-8 py-3 font-bold text-white transition hover:bg-gray-800"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Escríbenos por WhatsApp
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-lg border-2 border-gray-950 px-8 py-3 font-bold text-gray-950 transition hover:bg-gray-950 hover:text-white"
              >
                Enviar email
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-900 bg-gray-950 px-6 py-12 text-gray-400 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-lime-400" />
                <span className="font-bold text-white">DukeCrea</span>
              </div>
              <p className="text-sm">Agencia de digitalización de negocios.</p>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-white">Sitio</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-lime-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-white">Servicios</h4>
              <ul className="space-y-2 text-sm">
                {serviceCategoryMap.map((category) => (
                  <li key={category.id}>
                    <Link href="/#servicios" className="transition hover:text-lime-400">
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-white">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-lime-400">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="transition hover:text-lime-400">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="transition hover:text-lime-400">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} DukeCrea. Digitalizamos tu negocio con software a medida.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

