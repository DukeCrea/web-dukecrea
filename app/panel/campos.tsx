// Piezas de formulario compartidas por las pantallas del panel.

const baseInput =
  "w-full rounded-lg border border-gray-800 bg-black px-3 py-2 text-sm text-white outline-none transition focus:border-lime-400";

type CampoProps = {
  etiqueta: string;
  nombre: string;
  tipo?: string;
  valor?: string | number;
  requerido?: boolean;
  placeholder?: string;
  ayuda?: string;
};

export function Campo({
  etiqueta,
  nombre,
  tipo = "text",
  valor,
  requerido = false,
  placeholder,
  ayuda,
}: CampoProps) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-gray-400">
      {etiqueta}
      {requerido && <span className="sr-only">(obligatorio)</span>}
      <input
        name={nombre}
        type={tipo}
        defaultValue={valor}
        required={requerido}
        placeholder={placeholder}
        className={baseInput}
      />
      {ayuda && <span className="font-normal text-gray-600">{ayuda}</span>}
    </label>
  );
}

export function Selector({
  etiqueta,
  nombre,
  opciones,
  valor,
}: {
  etiqueta: string;
  nombre: string;
  opciones: readonly string[];
  valor?: string;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-gray-400">
      {etiqueta}
      <select name={nombre} defaultValue={valor} className={baseInput}>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AreaTexto({
  etiqueta,
  nombre,
  valor,
  placeholder,
  filas = 3,
}: {
  etiqueta: string;
  nombre: string;
  valor?: string;
  placeholder?: string;
  filas?: number;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-gray-400">
      {etiqueta}
      <textarea
        name={nombre}
        rows={filas}
        defaultValue={valor}
        placeholder={placeholder}
        className={`${baseInput} resize-y leading-6`}
      />
    </label>
  );
}

export function BotonPrimario({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-lime-300"
    >
      {children}
    </button>
  );
}

export function Aviso({ mensaje }: { mensaje?: string }) {
  if (!mensaje) return null;

  return (
    <p
      role="alert"
      className="mb-6 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
    >
      {mensaje}
    </p>
  );
}
