"use client";

import { useEffect, useRef, useState } from "react";

type AutoVideoProps = {
  src: string;
  poster: string;
  className?: string;
  /** Descriptive label for accessibility. */
  label?: string;
};

/**
 * Performance-safe background video:
 * - Shows the poster instantly; the <video> only loads + plays when it scrolls
 *   into view (IntersectionObserver), and pauses when it leaves.
 * - muted + loop + playsInline + preload="none" so it never blocks the page,
 *   never plays audio, and works as an autoplay background on iOS/Android.
 * - Respects prefers-reduced-motion: keeps the still poster, no video.
 */
export function AutoVideo({ src, poster, className, label }: AutoVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden={!label} aria-label={label}>
      {/* Poster: instant paint, zero video cost until in view */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative background poster behind a video, kept as a plain img to avoid next/image layout overhead */}
      <img
        src={poster}
        alt={label ?? ""}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {active ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
        />
      ) : null}
    </div>
  );
}
