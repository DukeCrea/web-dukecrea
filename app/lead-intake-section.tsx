"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  BotIcon,
  CartIcon,
  ChartIcon,
  CheckIcon,
  PackageIcon,
  PhoneIcon,
  WhatsAppIcon,
  ZapIcon,
} from "./icons";
import { getWhatsAppUrl, siteConfig } from "./lib/site";

type IconComponent = (props: { className?: string }) => React.ReactNode;

type Option = {
  label: string;
  description: string;
  icon: IconComponent;
};

const projectOptions: Option[] = [
  {
    label: "Página web, WordPress o rediseño",
    description: "Sitios corporativos, landings y presencia digital administrable.",
    icon: PhoneIcon,
  },
  {
    label: "E-commerce o Shopify",
    description: "Tiendas online, catálogos, pagos, inventario y ventas medibles.",
    icon: CartIcon,
  },
  {
    label: "Automatización de procesos",
    description: "WhatsApp, CRM, formularios, notificaciones, APIs y tareas repetitivas.",
    icon: ZapIcon,
  },
  {
    label: "Software o app a medida",
    description: "Sistemas internos, SaaS, portales, paneles y flujos operativos.",
    icon: PackageIcon,
  },
  {
    label: "Panel de datos, Ads o ROI",
    description: "Métricas, leads, campañas, inversión, dashboards y toma de decisiones.",
    icon: ChartIcon,
  },
  {
    label: "Auditoría de ecosistema digital",
    description: "Evaluamos web, redes, contenido, pauta y oportunidades de mejora.",
    icon: BotIcon,
  },
];

const needOptions = [
  "Captar más leads calificados",
  "Reducir tareas manuales",
  "Ordenar clientes, datos o CRM",
  "Vender mejor por web o tienda online",
  "Medir inversión, Ads y ROI",
  "No lo tengo claro y necesito diagnóstico",
];

const budgetOptions = [
  "Menos de USD 1,000",
  "USD 1,000 a 3,000",
  "USD 3,000 a 5,000",
  "USD 5,000 a 10,000",
  "Más de USD 10,000",
  "Prefiero definirlo en el diagnóstico",
];

const timelineOptions = [
  "Lo necesito este mes",
  "En 30 a 60 días",
  "En 2 a 3 meses",
  "Estoy explorando opciones",
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  budget: "",
  timeline: "",
  message: "",
};

export function LeadIntakeSection() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [need, setNeed] = useState("");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const whatsappUrl = useMemo(
    () =>
      getWhatsAppUrl(
        "Hola DukeCrea, completé el formulario de la web y quiero avanzar con mi diagnóstico.",
      ),
    [],
  );

  const progress = status === "success" ? 3 : step + 1;

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!projectType || !need) {
      setError("Selecciona el tipo de proyecto y la necesidad principal.");
      return;
    }

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Indica tu nombre y WhatsApp para poder contactarte.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          ...form,
          projectType,
          need,
          sourcePath: window.location.pathname,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "No pudimos registrar la solicitud.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No pudimos registrar la solicitud. Inténtalo nuevamente.",
      );
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 bg-lime-400 px-6 py-20 text-gray-950 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-800">
            Diagnóstico gratuito
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Cuéntanos tu proyecto</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-900">
            Responde unas preguntas rápidas y te decimos cómo convertir tu idea, operación o
            embudo comercial en infraestructura digital medible.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-xl border border-lime-300/30 bg-gray-950 p-5 text-white shadow-2xl shadow-black/30 sm:p-8">
          <div className="mb-8 grid grid-cols-3 gap-3" aria-label={`Paso ${progress} de 3`}>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`h-1.5 rounded-full ${
                  item <= progress ? "bg-lime-400" : "bg-gray-800"
                }`}
              />
            ))}
          </div>

          {status === "success" ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-gray-950">
                <CheckIcon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold">Recibimos tu solicitud</h3>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-300">
                Tu oportunidad quedó registrada en el panel interno. Revisaremos tus respuestas y te
                contactaremos para darte una ruta clara de implementación.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-6 py-3 font-bold text-gray-950 transition hover:bg-lime-300"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Continuar por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setProjectType("");
                    setNeed("");
                    setStep(0);
                    setStatus("idle");
                  }}
                  className="rounded-lg border border-gray-700 px-6 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-300"
                >
                  Registrar otro proyecto
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submitLead}>
              {step === 0 && (
                <div>
                  <h3 className="text-2xl font-bold">¿Qué quieres construir o mejorar?</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Elige el punto de partida para orientar el diagnóstico.
                  </p>
                  <div className="mt-7 grid gap-3 md:grid-cols-2">
                    {projectOptions.map((option) => {
                      const Icon = option.icon;
                      const selected = projectType === option.label;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => {
                            setProjectType(option.label);
                            setStep(1);
                          }}
                          className={`group min-h-28 rounded-lg border p-4 text-left transition hover:-translate-y-0.5 hover:border-lime-400 ${
                            selected
                              ? "border-lime-400 bg-lime-400/10"
                              : "border-gray-800 bg-black"
                          }`}
                        >
                          <span className="flex items-start gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-lime-400/40 bg-lime-400/10 text-lime-400">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block font-bold text-white group-hover:text-lime-200">
                                {option.label}
                              </span>
                              <span className="mt-1 block text-sm leading-6 text-gray-400">
                                {option.description}
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-bold">¿Qué necesitas resolver primero?</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Esto nos ayuda a estimar impacto, prioridad y ruta de implementación.
                  </p>
                  <div className="mt-7 grid gap-3 md:grid-cols-2">
                    {needOptions.map((option) => {
                      const selected = need === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setNeed(option);
                            setStep(2);
                          }}
                          className={`rounded-lg border px-4 py-4 text-left font-semibold transition hover:-translate-y-0.5 hover:border-lime-400 ${
                            selected
                              ? "border-lime-400 bg-lime-400/10 text-lime-200"
                              : "border-gray-800 bg-black text-white"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="mt-6 text-sm font-bold text-gray-400 transition hover:text-lime-300"
                  >
                    Volver al tipo de proyecto
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-bold">Datos para preparar tu diagnóstico</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    La solicitud llega al panel interno como una nueva oportunidad comercial.
                  </p>

                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      Nombre completo
                      <input
                        required
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder="Tu nombre"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      WhatsApp o teléfono
                      <input
                        required
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder="+507 0000 0000"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      Empresa
                      <input
                        value={form.company}
                        onChange={(event) => updateField("company", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder="Nombre de tu empresa"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      Correo
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder="correo@empresa.com"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      Inversión estimada
                      <select
                        value={form.budget}
                        onChange={(event) => updateField("budget", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                      >
                        <option value="">Seleccionar rango</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300">
                      Tiempo ideal
                      <select
                        value={form.timeline}
                        onChange={(event) => updateField("timeline", event.target.value)}
                        className="rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                      >
                        <option value="">Seleccionar tiempo</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-gray-300 md:col-span-2">
                      Cuéntanos el contexto
                      <textarea
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        className="min-h-28 rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                        placeholder="Qué tienes hoy, qué necesitas mejorar y qué resultado esperas."
                      />
                    </label>
                  </div>

                  {error && (
                    <p className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                      {error}
                    </p>
                  )}

                  <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-lg border border-gray-700 px-6 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-300"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-400 px-7 py-3 font-bold text-gray-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? "Registrando..." : "Enviar diagnóstico"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        <p className="mt-7 text-center text-sm text-gray-900">
          ¿Prefieres escribir directo?{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-bold underline underline-offset-4">
            Envíanos un email
          </a>
        </p>
      </div>
    </section>
  );
}
