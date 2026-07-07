"use client";

import { useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Max pixels of pull toward the cursor. */
  strength?: number;
};

/**
 * Subtle "magnetic" hover: the wrapped element eases toward the cursor while
 * hovered, then springs back. Only on fine-pointer devices; disabled for
 * prefers-reduced-motion. Pure transform (GPU) — no layout cost.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const canMove = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!canMove()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const dx = Math.max(-strength, Math.min(strength, (x / rect.width) * strength * 2));
    const dy = Math.max(-strength, Math.min(strength, (y / rect.height) * strength * 2));
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ display: "inline-block", transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
