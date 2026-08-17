"use client";

import Link from "next/link";
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
  megaMenuColumns,
  navLinks,
  plans,
  premiumStack,
  processSteps,
  serviceCategoryMap,
  siteConfig,
  team,
  technologies,
  workflowSteps,
  type Service,
} from "./lib/site";
import { LeadIntakeSection } from "./lead-intake-section";
import { AutoVideo } from "./auto-video";
import { Logo } from "./logo";
import { ProcesoScroll } from "./proceso-scroll";
import { CountUp } from "./count-up";
import { SiteFooter } from "./marketing-layout";

const iconMap = {
  bot: BotIcon,
  cart: CartIcon,
  chart: ChartIcon,
  package: PackageIcon,
  phone: PhoneIcon,
  users: UsersIcon,
  zap: ZapIcon,
} satisfies Record<Service["icon"], typeof BotIcon>;

type GsapRuntime = {
  gsap: (typeof import("gsap"))["gsap"];
  ScrollTrigger: (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];
};

let gsapRuntimePromise: Promise<GsapRuntime> | null = null;

function loadGsap() {
  if (!gsapRuntimePromise) {
    gsapRuntimePromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => ({
        gsap: gsapModule.gsap,
        ScrollTrigger: scrollTriggerModule.ScrollTrigger,
      }),
    );
  }

  return gsapRuntimePromise;
}

function scheduleAnimationStart(callback: () => void) {
  let started = false;
  const run = () => {
    if (started) return;
    started = true;
    callback();
  };
  const timer = window.setTimeout(run, 5000);
  window.addEventListener("scroll", run, { once: true, passive: true });

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", run);
  };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
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
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;
    const cancelStart = scheduleAnimationStart(() => {
      void loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => {
          gsap.fromTo(
            sectionRef.current,
            { autoAlpha: 0.82, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 88%",
                once: true,
              },
            },
          );
        }, sectionRef.current);
      });
    });

    return () => {
      cancelled = true;
      cancelStart();
      context?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
    >
      {children}
    </section>
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const whatsappUrl = getWhatsAppUrl();
  const secondaryLinks = navLinks.filter((link) => link.label !== "Soluciones");

  useEffect(() => {
    if (!megaOpen || !panelRef.current || reduceMotion) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;
    void loadGsap().then(({ gsap }) => {
      if (cancelled || !panelRef.current) return;
      context = gsap.context(() => {
        gsap.fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 12, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" },
        );
      }, panelRef.current);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [megaOpen, reduceMotion]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-900 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="DukeCrea inicio">
          <Logo className="h-8 w-8 rounded-lg shadow-lg shadow-lime-400/50" />
          <span className="text-lg font-bold text-white">DukeCrea</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
          <div className="relative" onMouseEnter={() => setMegaOpen(true)}>
            <button
              type="button"
              onClick={() => setMegaOpen((open) => !open)}
              onFocus={() => setMegaOpen(true)}
              className="text-sm font-semibold text-gray-200 transition hover:text-lime-300"
              aria-expanded={megaOpen}
              aria-haspopup="true"
            >
              Soluciones
            </button>
          </div>
          {secondaryLinks.map((link) => (
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

      {megaOpen && (
        <div
          ref={panelRef}
          onMouseLeave={() => setMegaOpen(false)}
          className="absolute left-1/2 top-full hidden w-[min(960px,calc(100vw-3rem))] -translate-x-1/2 pt-3 md:block"
        >
          <div className="grid gap-6 rounded-xl border border-lime-400/20 bg-gray-950/98 p-6 shadow-2xl shadow-black/60 backdrop-blur lg:grid-cols-2">
            {megaMenuColumns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">{column.eyebrow}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{column.title}</h3>
                <div className="mt-5 grid gap-3">
                  {column.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMegaOpen(false)}
                      className="rounded-lg border border-gray-800 bg-black/60 p-4 transition hover:-translate-y-0.5 hover:border-lime-400/60 hover:bg-lime-400/10"
                    >
                      <span className="font-bold text-white">{item.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-gray-400">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {menuOpen && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-900 bg-black px-6 py-4 md:hidden" aria-label="Navegación móvil">
          <div className="space-y-5">
            {megaMenuColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">{column.eyebrow}</p>
                <div className="space-y-2">
                  {column.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg border border-gray-900 bg-gray-950 p-3 text-sm text-gray-300"
                    >
                      <span className="font-semibold text-white">{item.title}</span>
                      <span className="mt-1 block leading-5 text-gray-500">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="grid gap-3 border-t border-gray-900 pt-4">
              {secondaryLinks.map((link) => (
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
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function TechTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const tickerItems = [...premiumStack, ...premiumStack];

  useEffect(() => {
    if (reduceMotion || !trackRef.current) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;
    const cancelStart = scheduleAnimationStart(() => {
      void loadGsap().then(({ gsap }) => {
        if (cancelled || !trackRef.current) return;
        context = gsap.context(() => {
          gsap.to(trackRef.current, {
            xPercent: -50,
            duration: 28,
            ease: "none",
            repeat: -1,
          });
        }, trackRef.current);
      });
    });

    return () => {
      cancelled = true;
      cancelStart();
      context?.revert();
    };
  }, [reduceMotion]);

  return (
    <section className="overflow-hidden border-t border-gray-900 bg-gray-950 py-6" aria-label="Stack tecnológico DukeCrea">
      <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">
        Stack tecnológico para ecosistemas B2B
      </div>
      <div className="relative mx-auto max-w-7xl overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-950 to-transparent" />
        <div ref={trackRef} className={`flex w-max gap-3 px-6 ${reduceMotion ? "flex-wrap justify-center" : ""}`}>
          {tickerItems.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="rounded-full border border-lime-400/20 bg-black px-5 py-2 text-sm font-semibold text-lime-100 shadow-sm shadow-lime-400/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowAutomation() {
  const containerRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;
    const cancelStart = scheduleAnimationStart(() => {
      void loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => {
          if (pathRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            gsap.set(pathRef.current, {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
            });
            gsap.to(pathRef.current, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 82%",
                end: () => `+=${window.innerWidth < 768 ? 160 : 240}`,
                scrub: 0.3,
                invalidateOnRefresh: true,
              },
            });
          }

          gsap.fromTo(
            ".workflow-card",
            { autoAlpha: 0.82, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 78%",
              },
            },
          );
        }, containerRef.current);
      });
    });

    return () => {
      cancelled = true;
      cancelStart();
      context?.revert();
    };
  }, [reduceMotion]);

  return (
    <section ref={containerRef} id="automatizacion" className="relative overflow-hidden border-t border-gray-900 bg-black px-6 py-20 md:px-8">
      <AutoVideo src="/grid.mp4" poster="/grid.jpg" className="pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Automatización B2B"
          title="Del anuncio al CRM sin perder trazabilidad"
          description="Un flujo diseñado para reducir costos operativos, recuperar leads a tiempo y proteger datos relacionales con seguimiento comercial claro."
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative min-h-[320px] rounded-xl border border-gray-800 bg-gray-950 p-6">
            <svg viewBox="0 0 620 320" className="h-full min-h-[280px] w-full" role="img" aria-label="Flujo desde anuncio hasta CRM y panel de ROI">
              <defs>
                <filter id="workflowGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                ref={pathRef}
                d="M56 160 C140 70 214 70 300 160 S468 250 564 160"
                fill="none"
                stroke="#a3e635"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#workflowGlow)"
              />
              {[
                { x: 56, y: 160, label: "Ads" },
                { x: 176, y: 96, label: "Lead" },
                { x: 300, y: 160, label: "DB" },
                { x: 444, y: 224, label: "CRM" },
                { x: 564, y: 160, label: "ROI" },
              ].map((node) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r="34" fill="#050505" stroke="#a3e635" strokeWidth="2" />
                  <text x={node.x} y={node.y + 5} textAnchor="middle" className="fill-lime-200 text-[18px] font-bold">
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {workflowSteps.map((step) => (
              <div key={step.label} className="workflow-card rounded-xl border border-gray-800 bg-gray-950 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-gray-950">
                  {step.label}
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ hero }: { hero: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main>
        {hero}

        <section className="border-t border-gray-900 bg-black px-6 py-12 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { value: "15+", label: "Proyectos entregados" },
              { value: "16", label: "Soluciones digitales" },
              { value: "5+", label: "Años de experiencia" },
              { value: "100%", label: "A medida de tu negocio" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="mb-2 text-4xl font-bold text-lime-400">
                  <CountUp value={stat.value} />
                </div>
                <p className="font-medium text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <TechTicker />

        <Reveal id="servicios" className="scroll-mt-16 border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Soluciones"
              title="Infraestructura digital para cada punto crítico del negocio"
              description="Cada línea conecta páginas, comercio, automatización, datos y contenido para que la inversión digital tenga lectura de negocio."
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
                          <span className="text-sm font-bold text-lime-300">Ver solución</span>
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
                Sumamos infraestructura web, automatizaciones, datos y marketing alrededor de lo que ya existe en tu negocio.
                La meta no es tener más herramientas: es recuperar oportunidades, reducir fricción y operar con continuidad.
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

        <WorkflowAutomation />

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
            <div className="mt-12 flex flex-wrap justify-center gap-3 text-center">
              <Link
                href="/casos"
                className="inline-block rounded-lg bg-lime-400 px-8 py-3 font-bold text-gray-950 transition hover:bg-lime-300"
              >
                Leer casos completos
              </Link>
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

        <section id="proceso" className="scroll-mt-16 border-t border-gray-900 bg-black">
          <ProcesoScroll
            steps={processSteps}
            title="Cómo trabajamos"
            description="Un proceso claro para pasar de idea o problema operativo a solución funcionando."
          />
        </section>

        <div className="relative h-24 w-full overflow-hidden border-t border-gray-900 bg-black md:h-32" aria-hidden="true">
          <AutoVideo src="/divisor.mp4" poster="/divisor.jpg" className="pointer-events-none absolute inset-0" />
        </div>

        <Reveal className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Stack"
              title="Tecnologías y herramientas que usamos"
              description="Elegimos tecnología según el modelo operativo: a medida cuando hace falta control, WordPress o Shopify cuando conviene velocidad y administración."
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

        <section className="relative overflow-hidden border-t border-gray-900 bg-black">
          <AutoVideo
            src="/hero-loop.mp4"
            poster="/hero-loop-poster.jpg"
            label="De procesos manuales a inteligencia artificial"
            className="absolute inset-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-7xl items-center px-6 py-24 md:px-8">
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-lime-400">
                De lo manual a la IA
              </p>
              <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                Del caos operativo a flujos inteligentes
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Ordenamos tu operación con automatización, datos y software a medida — para que tu
                negocio venda, opere y escale.
              </p>
            </div>
          </div>
        </section>

        <LeadIntakeSection />
      </main>

      <SiteFooter />
    </div>
  );
}
