"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationId: number | null = null;
    let startTimer: ReturnType<typeof setTimeout> | null = null;
    let started = false;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      startAnimation();
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        startAnimation();
      }
    };

    const drawFrame = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.32)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += reducedMotion ? 0.002 : 0.008;

      const step = window.innerWidth < 768 ? 72 : 54;
      for (let x = 0; x < canvas.width; x += step) {
        for (let y = 0; y < canvas.height; y += step) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const intensity = Math.max(0, 1 - distance / 420);
          if (intensity <= 0) continue;

          const wave = Math.sin(distance * 0.015 - time * 4) * 4;
          const waveSize = Math.max(1, 10 - distance * 0.02 + wave);
          const hue = 78 + Math.sin(time * 0.5 + distance * 0.02) * 18;

          ctx.fillStyle = `hsla(${hue}, 100%, 55%, ${intensity * 0.34})`;
          ctx.beginPath();
          ctx.arc(x, y, waveSize * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reducedMotion) animationId = requestAnimationFrame(drawFrame);
    };

    const startAnimation = () => {
      if (started) return;
      started = true;
      if (startTimer) clearTimeout(startTimer);
      drawFrame();
    };

    resize();
    if (reducedMotion) {
      startAnimation();
    } else {
      startTimer = setTimeout(startAnimation, 3200);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resize);
      if (startTimer) clearTimeout(startTimer);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
