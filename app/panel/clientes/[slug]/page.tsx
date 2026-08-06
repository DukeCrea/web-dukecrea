import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { buscarCliente, estadosCliente, type FilaDato } from "../../../lib/clientes";
import { isPanelAuthorized } from "../../actions";
import { PanelHeader } from "../../panel-header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ficha de cliente | Panel DukeCrea",
  description: "Ficha técnica interna de un cliente de DukeCrea.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

type FichaProps = {
  params: Promise<{ slug: string }>;
};

function BloqueDatos({ titulo, filas }: { titulo: string; filas: FilaDato[] }) {
  const visibles = filas.filter(([, valor]) => valor);
  if (visibles.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{titulo}</h2>
      <dl className="mt-4 border-t border-gray-900">
        {visibles.map(([clave, valor]) => (
          <div
            key={clave}
            className="grid gap-1 border-b border-gray-900 py-3 md:grid-cols-[220px_1fr] md:gap-6"
          >
            <dt className="text-sm text-gray-500">{clave}</dt>
            <dd className="text-sm break-words text-gray-100">{valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default async function FichaClientePage({ params }: FichaProps) {
  const autorizado = await isPanelAuthorized();
  if (!autorizado) {
    redirect("/panel?error=session");
  }

  const { slug } = await params;
  const cliente = buscarCliente(slug);
  if (!cliente) {
    notFound();
  }

  const estado = estadosCliente[cliente.estado];

  return (
    <main className="min-h-screen bg-black text-white">
      <PanelHeader activo="clientes" />

      <section className="mx-auto max-w-4xl px-6 py-10 md:px-8">
        <Link
          href="/panel/clientes"
          className="text-sm text-gray-500 transition hover:text-lime-300"
        >
          ← Todos los clientes
        </Link>

        <div className="mt-6 border-b border-gray-900 pb-8">
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${estado.clases}`}>
            {estado.texto}
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">{cliente.nombre}</h1>
          <p className="mt-2 text-sm text-gray-500">{cliente.sector}</p>
          <p className="mt-4 max-w-2xl leading-7 text-gray-300">{cliente.resumen}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {cliente.produccion && (
              <a
                href={cliente.produccion}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-lime-300"
              >
                Sitio en vivo
              </a>
            )}
            {cliente.demo && (
              <a
                href={cliente.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  cliente.produccion
                    ? "rounded-lg border border-gray-800 px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-lime-400 hover:text-lime-300"
                    : "rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-lime-300"
                }
              >
                Ver demo
              </a>
            )}
            {!cliente.produccion && !cliente.demo && (
              <p className="text-sm text-gray-500">Sin demo publicado todavía.</p>
            )}
          </div>
        </div>

        <BloqueDatos
          titulo="Identificación"
          filas={[
            ["Cliente", cliente.nombre],
            ["País", cliente.pais],
            ["Contacto", cliente.contacto],
            ["Alta", cliente.alta],
          ]}
        />

        {cliente.opciones && cliente.opciones.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
              Opciones presentadas
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cliente.opciones.map((opcion) => (
                <div key={opcion.letra} className="rounded-lg border border-gray-800 bg-gray-950 p-5">
                  <p className="text-2xl font-bold text-lime-400">{opcion.letra}</p>
                  <p className="mt-2 font-semibold text-white">{opcion.titulo}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">{opcion.nota}</p>
                  <a
                    href={opcion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-lg border border-gray-800 px-4 py-2 text-xs font-semibold text-gray-200 transition hover:border-lime-400 hover:text-lime-300"
                  >
                    Ver
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        <BloqueDatos titulo="Comercial" filas={cliente.comercial} />
        <BloqueDatos titulo="Técnico" filas={cliente.tecnico} />
        <BloqueDatos titulo="Infraestructura" filas={cliente.infra} />

        {cliente.pendientes.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Pendientes</h2>
            <ul className="mt-4 border-t border-gray-900">
              {cliente.pendientes.map((pendiente) => (
                <li
                  key={pendiente}
                  className="flex items-start gap-3 border-b border-gray-900 py-3 text-sm text-gray-200"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 h-3 w-3 shrink-0 rounded-sm border border-gray-700"
                  />
                  {pendiente}
                </li>
              ))}
            </ul>
          </section>
        )}

        {cliente.notas && (
          <section className="mt-10">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Notas</h2>
            <p className="mt-4 rounded-r-lg border border-l-2 border-gray-800 border-l-lime-400 bg-gray-950 p-5 text-sm leading-6 text-gray-300">
              {cliente.notas}
            </p>
          </section>
        )}
      </section>
    </main>
  );
}
