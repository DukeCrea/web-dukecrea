import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { clientes, estadosCliente } from "../../lib/clientes";
import { isPanelAuthorized } from "../actions";
import { PanelHeader } from "../panel-header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clientes | Panel DukeCrea",
  description: "Directorio interno de clientes y demos de DukeCrea.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function ClientesPage() {
  const autorizado = await isPanelAuthorized();
  if (!autorizado) {
    redirect("/panel?error=session");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <PanelHeader activo="clientes" />

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Directorio de clientes</h1>
          <p className="mt-2 text-gray-400">
            Cada proyecto con su demo publicado y su ficha técnica: alcance, cotización, stack,
            dominio y qué falta por cerrar.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clientes.map((cliente) => {
            const estado = estadosCliente[cliente.estado];
            const enlaceVivo = cliente.produccion || cliente.demo;

            return (
              <article
                key={cliente.slug}
                className="flex flex-col rounded-lg border border-gray-800 bg-gray-950 p-6 transition hover:border-gray-700"
              >
                <span
                  className={`self-start rounded-full border px-3 py-1 text-xs font-bold ${estado.clases}`}
                >
                  {estado.texto}
                </span>

                <h2 className="mt-4 text-xl font-bold text-white">
                  <Link href={`/panel/clientes/${cliente.slug}`} className="transition hover:text-lime-300">
                    {cliente.corto}
                  </Link>
                </h2>
                <p className="mt-1 text-xs text-gray-500">{cliente.sector}</p>
                <p className="mt-3 text-sm leading-6 text-gray-400">{cliente.resumen}</p>

                <div className="mt-6 flex flex-wrap gap-2 pt-2">
                  <Link
                    href={`/panel/clientes/${cliente.slug}`}
                    className="rounded-lg border border-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-lime-400 hover:text-lime-300"
                  >
                    Ficha técnica
                  </Link>
                  {enlaceVivo && (
                    <a
                      href={enlaceVivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-gray-950 transition hover:bg-lime-300"
                    >
                      {cliente.produccion ? "Sitio en vivo" : "Ver demo"}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
