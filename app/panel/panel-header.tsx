import Link from "next/link";
import { logoutPanel } from "./actions";

type PanelHeaderProps = {
  activo: "leads" | "clientes";
};

const pestanas = [
  { id: "leads" as const, etiqueta: "Leads", href: "/panel" },
  { id: "clientes" as const, etiqueta: "Clientes", href: "/panel/clientes" },
];

export function PanelHeader({ activo }: PanelHeaderProps) {
  return (
    <header className="border-b border-gray-900 bg-gray-950 px-6 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="DukeCrea inicio">
          <div className="h-8 w-8 rounded-lg bg-lime-400 shadow-lg shadow-lime-400/50" />
          <span className="text-lg font-bold text-white">DukeCrea</span>
          <span className="rounded-full border border-gray-700 px-2 py-0.5 text-xs text-gray-400">
            Panel
          </span>
        </Link>

        <nav aria-label="Secciones del panel" className="flex gap-1">
          {pestanas.map((pestana) => (
            <Link
              key={pestana.id}
              href={pestana.href}
              aria-current={activo === pestana.id ? "page" : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                activo === pestana.id
                  ? "bg-lime-400 text-gray-950"
                  : "text-gray-300 hover:text-lime-300"
              }`}
            >
              {pestana.etiqueta}
            </Link>
          ))}
        </nav>

        <form action={logoutPanel} className="ml-auto">
          <button type="submit" className="font-semibold text-gray-300 transition hover:text-lime-300">
            Salir
          </button>
        </form>
      </div>
    </header>
  );
}
