import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckIcon, PackageIcon, ZapIcon } from "../../icons";
import {
  avanceDe,
  cobroDe,
  getEstadosTrabajo,
  listTrabajos,
  type Trabajo,
} from "../../lib/trabajos";
import {
  actualizarTrabajo,
  anadirTarea,
  borrarTrabajo,
  crearTrabajo,
  isPanelAuthorized,
  marcarTarea,
  quitarTarea,
} from "../actions";
import { AreaTexto, Aviso, BotonPrimario, Campo, Selector } from "../campos";
import { PanelHeader } from "../panel-header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trabajos | Panel DukeCrea",
  description: "Control de trabajos en curso, entregados y cobrados.",
  robots: { index: false, follow: false, nocache: true },
};

type Props = {
  searchParams?: Promise<{ estado?: string; aviso?: string }>;
};

const estilosEstado: Record<string, string> = {
  Propuesta: "border-amber-400/40 bg-amber-500/10 text-amber-200",
  "En curso": "border-blue-400/40 bg-blue-500/10 text-blue-200",
  Entregado: "border-cyan-400/40 bg-cyan-500/10 text-cyan-200",
  Cobrado: "border-lime-400/40 bg-lime-500/10 text-lime-200",
  Cancelado: "border-gray-700 bg-gray-900 text-gray-400",
};

function moneda(value: number) {
  return new Intl.NumberFormat("es-PA", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function Metrica({
  titulo,
  valor,
  icono,
  destacado = false,
}: {
  titulo: string;
  valor: string;
  icono: React.ReactNode;
  destacado?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-5 ${
        destacado ? "border-lime-400/70 bg-lime-400/5" : "border-gray-800 bg-gray-950"
      }`}
    >
      <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-lime-400">
        {icono}
      </div>
      <p className="text-3xl font-bold text-white">{valor}</p>
      <p className="mt-1 text-sm text-gray-400">{titulo}</p>
    </div>
  );
}

function Barra({
  etiqueta,
  porcentaje,
  detalle,
  tono,
}: {
  etiqueta: string;
  porcentaje: number;
  detalle: string;
  tono: "avance" | "cobro";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-semibold text-gray-400">{etiqueta}</span>
        <span className="text-gray-500">{detalle}</span>
      </div>
      <div
        role="progressbar"
        aria-label={etiqueta}
        aria-valuenow={porcentaje}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-900"
      >
        <div
          className={`h-full rounded-full transition-all ${
            tono === "avance" ? "bg-lime-400" : "bg-cyan-400"
          }`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}

function Tareas({ trabajo }: { trabajo: Trabajo }) {
  return (
    <div className="border-t border-gray-900 p-5">
      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
        Lo que lleva el proyecto
      </h3>

      {trabajo.tareas.length > 0 && (
        <ul className="mt-3">
          {trabajo.tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex items-center gap-3 border-b border-gray-900 py-2 last:border-b-0"
            >
              <form action={marcarTarea} className="flex">
                <input type="hidden" name="tareaId" value={tarea.id} />
                <input type="hidden" name="hecha" value={tarea.hecha ? "0" : "1"} />
                <button
                  type="submit"
                  aria-label={tarea.hecha ? `Desmarcar ${tarea.titulo}` : `Marcar ${tarea.titulo}`}
                  className={`flex h-5 w-5 items-center justify-center rounded border text-xs font-bold transition ${
                    tarea.hecha
                      ? "border-lime-400 bg-lime-400 text-gray-950"
                      : "border-gray-700 text-transparent hover:border-lime-400"
                  }`}
                >
                  ✓
                </button>
              </form>
              <span
                className={`flex-1 text-sm ${
                  tarea.hecha ? "text-gray-600 line-through" : "text-gray-200"
                }`}
              >
                {tarea.titulo}
              </span>
              <form action={quitarTarea}>
                <input type="hidden" name="tareaId" value={tarea.id} />
                <button
                  type="submit"
                  aria-label={`Borrar ${tarea.titulo}`}
                  className="text-xs text-gray-700 transition hover:text-red-400"
                >
                  ✕
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <form action={anadirTarea} className="mt-4 flex flex-wrap gap-2">
        <input type="hidden" name="trabajoId" value={trabajo.id} />
        <input
          name="titulo"
          required
          placeholder="Añadir algo por hacer…"
          className="min-w-[220px] flex-1 rounded-lg border border-gray-800 bg-black px-3 py-2 text-sm text-white outline-none transition focus:border-lime-400"
        />
        <button
          type="submit"
          className="rounded-lg border border-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-lime-400 hover:text-lime-300"
        >
          Añadir
        </button>
      </form>
    </div>
  );
}

function FichaTrabajo({ trabajo }: { trabajo: Trabajo }) {
  const pendiente = trabajo.montoUsd - trabajo.cobradoUsd;
  const avance = avanceDe(trabajo);
  const cobro = cobroDe(trabajo);
  const hechas = trabajo.tareas.filter((tarea) => tarea.hecha).length;

  return (
    <details className="rounded-lg border border-gray-800 bg-gray-950">
      <summary className="cursor-pointer list-none px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold ${
              estilosEstado[trabajo.estado] || estilosEstado.Cancelado
            }`}
          >
            {trabajo.estado}
          </span>
          <span className="font-bold text-white">{trabajo.titulo}</span>
          <span className="text-sm text-gray-500">{trabajo.cliente}</span>
          <span className="ml-auto text-sm text-gray-300">
            {moneda(trabajo.montoUsd)}
            {pendiente > 0 && trabajo.estado !== "Cancelado" && (
              <span className="ml-2 text-xs text-amber-200">faltan {moneda(pendiente)}</span>
            )}
          </span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Barra
            etiqueta="Avance"
            porcentaje={avance}
            detalle={
              trabajo.tareas.length > 0
                ? `${avance}% · ${hechas} de ${trabajo.tareas.length}`
                : "sin tareas cargadas"
            }
            tono="avance"
          />
          <Barra
            etiqueta="Cobrado"
            porcentaje={cobro}
            detalle={`${cobro}% · ${moneda(trabajo.cobradoUsd)} de ${moneda(trabajo.montoUsd)}`}
            tono="cobro"
          />
        </div>
      </summary>

      <Tareas trabajo={trabajo} />

      <form action={actualizarTrabajo} className="grid gap-4 border-t border-gray-900 p-5">
        <input type="hidden" name="id" value={trabajo.id} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Campo etiqueta="Cliente" nombre="cliente" requerido valor={trabajo.cliente} />
          <Campo etiqueta="Título" nombre="titulo" requerido valor={trabajo.titulo} />
          <Selector
            etiqueta="Estado"
            nombre="estado"
            opciones={getEstadosTrabajo()}
            valor={trabajo.estado}
          />
          <Campo etiqueta="Monto (USD)" nombre="montoUsd" tipo="number" valor={trabajo.montoUsd} />
          <Campo
            etiqueta="Cobrado (USD)"
            nombre="cobradoUsd"
            tipo="number"
            valor={trabajo.cobradoUsd}
          />
          <Campo
            etiqueta="Fecha de inicio"
            nombre="fechaInicio"
            tipo="date"
            valor={trabajo.fechaInicio}
          />
          <Campo
            etiqueta="Fecha de entrega"
            nombre="fechaEntrega"
            tipo="date"
            valor={trabajo.fechaEntrega}
          />
        </div>
        <AreaTexto etiqueta="Notas" nombre="notas" valor={trabajo.notas} filas={2} />
        <div className="flex flex-wrap items-center gap-4">
          <BotonPrimario>Guardar cambios</BotonPrimario>
        </div>
      </form>

      <form action={borrarTrabajo} className="border-t border-gray-900 px-5 py-3">
        <input type="hidden" name="id" value={trabajo.id} />
        <button
          type="submit"
          className="text-xs font-semibold text-gray-600 transition hover:text-red-400"
        >
          Borrar este trabajo
        </button>
      </form>
    </details>
  );
}

export default async function TrabajosPage({ searchParams }: Props) {
  const autorizado = await isPanelAuthorized();
  if (!autorizado) {
    redirect("/panel?error=session");
  }

  const query = searchParams ? await searchParams : {};
  const trabajos = await listTrabajos();

  const enCurso = trabajos.filter((t) => t.estado === "En curso");
  const activos = trabajos.filter((t) => !["Cobrado", "Cancelado"].includes(t.estado));
  const porCobrar = activos.reduce((total, t) => total + (t.montoUsd - t.cobradoUsd), 0);
  const cobradoTotal = trabajos.reduce((total, t) => total + t.cobradoUsd, 0);

  return (
    <main className="min-h-screen bg-black text-white">
      <PanelHeader activo="trabajos" />

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <Aviso mensaje={query.aviso} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Trabajos</h1>
          <p className="mt-2 text-gray-400">
            Qué estás haciendo, para quién, por cuánto y qué falta por cobrar.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Metrica
            titulo="En curso"
            valor={String(enCurso.length)}
            icono={<ZapIcon className="h-5 w-5" />}
            destacado
          />
          <Metrica
            titulo="Por cobrar"
            valor={moneda(porCobrar)}
            icono={<PackageIcon className="h-5 w-5" />}
          />
          <Metrica
            titulo="Cobrado en total"
            valor={moneda(cobradoTotal)}
            icono={<CheckIcon className="h-5 w-5" />}
          />
        </div>

        <details className="mt-8 rounded-lg border border-gray-800 bg-gray-950">
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-bold text-lime-400 transition hover:text-lime-300">
            + Nuevo trabajo
          </summary>
          <form action={crearTrabajo} className="grid gap-4 border-t border-gray-900 p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Campo etiqueta="Cliente" nombre="cliente" requerido placeholder="BARETEC Panamá" />
              <Campo
                etiqueta="Título del trabajo"
                nombre="titulo"
                requerido
                placeholder="Web corporativa en WordPress"
              />
              <Selector etiqueta="Estado" nombre="estado" opciones={getEstadosTrabajo()} />
              <Campo etiqueta="Monto (USD)" nombre="montoUsd" tipo="number" placeholder="400" />
              <Campo etiqueta="Cobrado (USD)" nombre="cobradoUsd" tipo="number" placeholder="0" />
              <Campo etiqueta="Fecha de entrega" nombre="fechaEntrega" tipo="date" />
            </div>
            <AreaTexto etiqueta="Notas" nombre="notas" filas={2} />
            <div>
              <BotonPrimario>Crear trabajo</BotonPrimario>
            </div>
          </form>
        </details>

        <div className="mt-6 grid gap-3">
          {trabajos.length > 0 ? (
            trabajos.map((trabajo) => <FichaTrabajo key={trabajo.id} trabajo={trabajo} />)
          ) : (
            <p className="rounded-lg border border-gray-800 bg-gray-950 px-5 py-10 text-center text-gray-400">
              Todavía no hay trabajos cargados. Créalos desde aquí o convierte un lead ganado en
              trabajo desde su ficha.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
