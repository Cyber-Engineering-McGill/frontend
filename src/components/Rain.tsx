"use client";

import { useEffect, useRef } from "react";

export default function Rain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    w: number;
    h: number;
    columns: number;
    prevColumns: number;
    uniformDrops: number[];
    randomDrops: (number | null)[];
    frame: number;
    fontSize: number;
    chars: string[];
    density: number;
    resetProb: number;
    spawnProb: number;
    spawnDelayFrames: number;
    frameDelayMs: number;
    running: boolean;
    rafId: number | null;
    lastTs: number;
    accMs: number;
    dpr: number;
  } | null>(null);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionMedia.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = {
      fontSize: 16,
      chars: "Nokcha0123456789()CyberEngMcGill{!#$RAIN^*~}".split(""),
      density: 1,
      resetProb: 1,
      spawnProb: 0.002,
      spawnDelayFrames: 40,
      frameDelayMs: 75,
    } as const;

    stateRef.current = {
      w: 0,
      h: 0,
      columns: 0,
      prevColumns: 0,
      uniformDrops: [],
      randomDrops: [],
      frame: 0,
      fontSize: cfg.fontSize,
      chars: cfg.chars,
      density: cfg.density,
      resetProb: cfg.resetProb,
      spawnProb: cfg.spawnProb,
      spawnDelayFrames: cfg.spawnDelayFrames,
      frameDelayMs: cfg.frameDelayMs,
      running: true,
      rafId: null,
      lastTs: performance.now(),
      accMs: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    };

    const getVisualViewport = (): VisualViewport | undefined => {
      return typeof window !== "undefined" && "visualViewport" in window
        ? (window.visualViewport as VisualViewport | undefined)
        : undefined;
    };

    const getViewportSize = () => {
      const vv = getVisualViewport();
      const width = Math.floor(vv?.width ?? window.innerWidth);
      const height = Math.floor(vv?.height ?? window.innerHeight);
      return { width, height };
    };

    const resize = () => {
      const s = stateRef.current;
      if (!s) return;
      const { width, height } = getViewportSize();

      const cssW = width;
      const cssH = height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.dpr = dpr;
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      s.w = cssW;
      s.h = cssH;
      s.columns = Math.floor(cssW / s.fontSize) + 1;

      if (s.columns > s.prevColumns) {
        for (let i = s.prevColumns; i < s.columns; i++) {
          s.uniformDrops[i] =
            s.prevColumns === 0 ? 1 : Math.ceil(s.h / s.fontSize) + 1;
          s.randomDrops[i] = null;
        }
      }
      s.uniformDrops.length = s.columns;
      s.randomDrops.length = s.columns;
      s.prevColumns = s.columns;

      ctx.textBaseline = "top";
      ctx.font = `${s.fontSize}px 'Author-Regular', monospace`;
    };

    let resizeScheduled = false;
    const scheduleResize = () => {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(() => {
        resizeScheduled = false;
        resize();
      });
    };

    const drawStep = () => {
      const s = stateRef.current;
      if (!s) return;
      s.frame++;

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, s.w, s.h);
      ctx.globalCompositeOperation = "source-over";

      ctx.fillStyle = "#ED1B2F";
      ctx.font = `${s.fontSize}px 'Author-Regular', monospace`;

      for (let i = 0; i < s.uniformDrops.length; i++) {
        const y = s.uniformDrops[i] ?? 0;
        if (Math.random() < s.density) {
          ctx.fillText(
            s.chars[(Math.random() * s.chars.length) | 0],
            i * s.fontSize,
            y * s.fontSize
          );
        }
        if (y * s.fontSize > s.h && Math.random() > s.resetProb)
          s.uniformDrops[i] = 0;
        s.uniformDrops[i] = (s.uniformDrops[i] ?? 0) + 1;
      }

      if (s.frame > s.spawnDelayFrames) {
        for (let i = 0; i < s.columns; i++) {
          if (s.randomDrops[i] === null && Math.random() < s.spawnProb)
            s.randomDrops[i] = 1;
        }
      }
      for (let i = 0; i < s.randomDrops.length; i++) {
        const y = s.randomDrops[i];
        if (y == null) continue;
        if (Math.random() < s.density) {
          ctx.fillText(
            s.chars[(Math.random() * s.chars.length) | 0],
            i * s.fontSize,
            y * s.fontSize
          );
        }
        if (y * s.fontSize > s.h) s.randomDrops[i] = null;
        else s.randomDrops[i] = y + 1;
      }
    };

    const loop = (ts: number) => {
      const s = stateRef.current;
      if (!s || !s.running) return;

      const dt = ts - s.lastTs;
      s.lastTs = ts;
      s.accMs += dt;

      while (s.accMs >= s.frameDelayMs) {
        drawStep();
        s.accMs -= s.frameDelayMs;
      }
      s.rafId = requestAnimationFrame(loop);
    };

    resize();
    {
      const s = stateRef.current;
      if (s) {
        s.rafId = requestAnimationFrame(loop);
      }
    }

    const onVisibility: EventListener = () => {
      const s = stateRef.current;
      if (!s) return;
      const shouldRun = document.visibilityState === "visible";
      s.running = shouldRun;
      if (shouldRun && s.rafId == null) {
        s.lastTs = performance.now();
        s.accMs = 0;
        s.rafId = requestAnimationFrame(loop);
      } else if (!shouldRun && s.rafId != null) {
        cancelAnimationFrame(s.rafId);
        s.rafId = null;
      }
    };

    const onResize = () => scheduleResize();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);

    const vv = getVisualViewport();
    vv?.addEventListener("resize", onResize, { passive: true });

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      const s = stateRef.current;
      if (!s) return;
      s.running = false;
      if (s.rafId != null) cancelAnimationFrame(s.rafId);

      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      vv?.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0"
      aria-hidden
    />
  );
}
