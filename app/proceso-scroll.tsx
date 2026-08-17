"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AutoVideo } from "./auto-video";

type Step = { step: number; title: string; desc: string };

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

type ProcesoScrollProps = {
  steps: Step[];
  eyebrow?: string;
  title: string;
  description: string;
};

/**
 * Scrollytelling ("pinned" / sticky scroll) section.
 * The inner block stays pinned while you scroll through a tall wrapper; the
 * active step (01..N) advances and a lime progress arc fills 0->100%.
 * Falls back to a plain grid when prefers-reduced-motion is set.
 */
export function ProcesoScroll({ steps, eyebrow = "Proceso", title, description }: ProcesoScrollProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        setProgress(p);
        setActive(Math.min(steps.length - 1, Math.floor(p * steps.length + 0.0001)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [steps.length, reduce]);

  // Reduced motion: simple, no pinning.
  if (reduce) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-lime-400">{eyebrow}</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-gray-300">{description}</p>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-5">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-lg font-bold text-gray-950">
                {item.step}
              </div>
              <h3 className="mb-2 font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-6 text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const R = 120;
  const C = 2 * Math.PI * R;
  const current = steps[active];

  return (
    <div
      ref={wrapRef}
      style={{ height: `calc(100vh + ${steps.length * 24}vh)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <AutoVideo src="/pulso.mp4" poster="/pulso.jpg" className="pointer-events-none absolute inset-0 opacity-15" />
        <div className="pointer-events-none absolute inset-0 bg-black/80" />

        <div className="relative z-10 mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-lime-400">{eyebrow}</p>
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
        </div>

        <div className="relative z-10 flex items-center justify-center">
          <svg viewBox="0 0 280 280" className="h-56 w-56 -rotate-90 md:h-72 md:w-72">
            <circle cx="140" cy="140" r={R} fill="none" stroke="#1f2937" strokeWidth="3" />
            <circle
              cx="140"
              cy="140"
              r={R}
              fill="none"
              stroke="#a3e635"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
              style={{ transition: "stroke-dashoffset 0.12s linear", filter: "drop-shadow(0 0 6px rgba(163,230,53,0.5))" }}
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-6xl font-bold text-lime-400 md:text-7xl">
              {String(current.step).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div key={current.step} className="relative z-10 mt-8 max-w-xl animate-[fadeIn_0.4s_ease] text-center">
          <h3 className="text-3xl font-bold text-white md:text-4xl">{current.title}</h3>
          <p className="mt-3 text-lg leading-7 text-gray-300">{current.desc}</p>
        </div>

        <div className="relative z-10 mt-8 flex gap-2">
          {steps.map((s, i) => (
            <span
              key={s.step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-lime-400" : "w-4 bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
