import type { ReactNode } from "react";

import { Breadcrumbs, MarketingHeader, SiteFooter } from "./marketing-layout";

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <MarketingHeader />
      <main>
        <header className="border-b border-gray-900 bg-gray-950 px-6 py-14 md:px-8">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: title, href: "#" }]} />
            <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">{intro}</p>
            <p className="mt-4 text-sm text-gray-300">Última actualización: 17 de agosto de 2026.</p>
          </div>
        </header>
        <div className="mx-auto max-w-4xl space-y-10 px-6 py-16 text-gray-300 md:px-8 [&_a]:text-lime-300 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_li]:leading-7 [&_p]:leading-8 [&_ul]:space-y-2">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
