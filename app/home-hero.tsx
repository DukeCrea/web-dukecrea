import Link from "next/link";

import { HeroCanvas } from "./hero-canvas";
import { Magnetic } from "./magnetic";

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6 pb-16 pt-32 md:px-8">
      <HeroCanvas />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-gray-950" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-medium text-lime-300">
          Firma tecnológica para infraestructura digital, adquisición y automatización
        </div>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
          Infraestructura digital para <span className="text-lime-400">vender, operar y escalar</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-100 md:text-xl">
          Diseñamos ecosistemas B2B que conectan web, e-commerce, WordPress, Shopify, software, Ads,
          automatizaciones y datos para reducir costos operativos y recuperar oportunidades.
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Magnetic>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3 font-bold text-gray-950 shadow-lg shadow-lime-400/30 transition hover:bg-lime-300"
            >
              Solicita tu diagnóstico gratis
            </Link>
          </Magnetic>
          <Link
            href="/servicios"
            className="rounded-lg border-2 border-white px-8 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-950"
          >
            Explorar soluciones
          </Link>
        </div>
        <p className="text-sm text-gray-300">
          Empresas en Panamá y Venezuela · Diagnóstico inicial gratis · Sin compromiso
        </p>
      </div>
    </section>
  );
}
