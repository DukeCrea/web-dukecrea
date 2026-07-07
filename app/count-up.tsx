"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** e.g. "15+", "100%", "16" */
  value: string;
  className?: string;
  durationMs?: number;
};

/**
 * Animates the numeric part of `value` from 0 to its target when it scrolls
 * into view (once). Keeps any prefix/suffix like "+" or "%".
 * Respects prefers-reduced-motion (shows the final value instantly).
 */
export function CountUp({ value, className, durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  useEffect(() => {
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue;
          started.current = true;

          const startTime = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - startTime) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
