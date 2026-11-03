"use client";

import { memo, useEffect, useRef } from "react";

/**
 * OceanWavesBackground — a vibrant, flowing "digital cyber waves" backdrop on
 * an HTML5 Canvas. Several layered sine curves (each a sum of harmonics for an
 * organic, perlin-like flow) scroll left→right with soft vertical gradient
 * fills beneath them, evoking deep, living water. Moving the cursor raises a
 * gentle localized swell on the waves near it.
 *
 * Performance & a11y:
 * - Single `requestAnimationFrame` loop; all drawing is canvas, no React
 *   re-renders. `React.memo` + zero props means it is inert to page updates
 *   (scroll, hover, modals, route changes never touch it).
 * - `fixed inset-0 -z-10 pointer-events-none` → sits behind content, never
 *   blocks clicks/selection, and causes no layout shift (CLS).
 * - DPR capped at 2 to avoid overdraw; resize is debounced and reconfigures
 *   wave geometry to the new viewport.
 * - The loop pauses when the tab is hidden (visibilitychange) to idle the CPU;
 *   the mouse listener is only attached for fine pointers.
 * - Respects `prefers-reduced-motion`: draws a single static frame, no loop
 *   and no pointer interaction.
 * - A readability wash over the waves keeps text contrast crisp (WCAG AA).
 * - `aria-hidden` so assistive tech ignores it.
 */
interface WaveLayer {
  /** Vertical anchor as a fraction of viewport height (0 = top, 1 = bottom). */
  baseY: number;
  /** Primary amplitude in px. */
  amplitude: number;
  /** Primary angular frequency. */
  frequency: number;
  /** Horizontal phase speed (radians/frame). */
  speed: number;
  /** Current animated phase. */
  phase: number;
  /** Secondary harmonic multipliers for an organic, non-uniform crest. */
  harmonicFreq: number;
  harmonicAmp: number;
  /** Gradient stop colors (top → bottom of the fill). */
  colorTop: string;
  colorBottom: string;
}

function OceanWavesBackgroundImpl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const context = el.getContext("2d", { alpha: true });
    if (!context) return;
    // Stable non-null aliases captured by the nested functions below.
    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let layers: WaveLayer[] = [];
    let rafId: number | null = null;
    let running = false;

    // Pointer swell state. Smoothed toward the raw cursor for a gentle lag.
    const pointer = { x: -9999, y: -9999, active: false };
    const smooth = { x: -9999, y: -9999 };

    type PaletteStop = Pick<WaveLayer, "colorTop" | "colorBottom">;

    // Dark mode: vibrant deep-tech glow (cyan/teal/emerald + neon blue).
    const darkPalette: PaletteStop[] = [
      { colorTop: "rgba(16, 60, 90, 0.55)", colorBottom: "rgba(8, 20, 40, 0.0)" }, // deep neon-blue base
      { colorTop: "rgba(20, 130, 150, 0.45)", colorBottom: "rgba(10, 40, 60, 0.0)" }, // teal
      { colorTop: "rgba(34, 211, 190, 0.40)", colorBottom: "rgba(12, 60, 70, 0.0)" }, // emerald/teal glow
      { colorTop: "rgba(45, 220, 235, 0.38)", colorBottom: "rgba(12, 70, 90, 0.0)" }, // vibrant cyan front
    ];

    // Light mode: very soft pastel/translucent waves on a clean white base so
    // content never washes out. Low alpha (~0.16–0.22) keeps text crisp.
    const lightPalette: PaletteStop[] = [
      { colorTop: "rgba(125, 211, 252, 0.16)", colorBottom: "rgba(186, 230, 253, 0.0)" }, // sky-300
      { colorTop: "rgba(94, 234, 212, 0.18)", colorBottom: "rgba(153, 246, 228, 0.0)" }, // teal-300
      { colorTop: "rgba(110, 231, 183, 0.18)", colorBottom: "rgba(167, 243, 208, 0.0)" }, // emerald-300
      { colorTop: "rgba(103, 232, 249, 0.22)", colorBottom: "rgba(165, 243, 252, 0.0)" }, // cyan-300
    ];

    let isDark = document.documentElement.classList.contains("dark");
    function palette(): PaletteStop[] {
      return isDark ? darkPalette : lightPalette;
    }
    // Crest line alpha: bright in dark, whisper-soft in light.
    function crestAlpha(): number {
      return isDark ? 0.9 : 0.35;
    }

    function buildLayers() {
      // 4 layers stacked from back (higher) to front (lower), each flowing
      // left→right at a slightly different speed for parallax depth.
      const specs = [
        { baseY: 0.62, amplitude: 26, frequency: 0.0016, speed: 0.012, harmonicFreq: 2.3, harmonicAmp: 0.5 },
        { baseY: 0.72, amplitude: 32, frequency: 0.0020, speed: 0.018, harmonicFreq: 1.7, harmonicAmp: 0.6 },
        { baseY: 0.82, amplitude: 38, frequency: 0.0024, speed: 0.024, harmonicFreq: 2.9, harmonicAmp: 0.45 },
        { baseY: 0.92, amplitude: 44, frequency: 0.0030, speed: 0.030, harmonicFreq: 1.3, harmonicAmp: 0.7 },
      ];
      const pal = palette();
      layers = specs.map((s, i) => ({
        ...s,
        phase: Math.random() * Math.PI * 2,
        colorTop: pal[i]!.colorTop,
        colorBottom: pal[i]!.colorBottom,
      }));
    }

    // Recolor existing layers in place (used on theme toggle) without resetting
    // their animated phase, so the wave motion stays continuous.
    function recolorLayers() {
      const pal = palette();
      layers.forEach((layer, i) => {
        layer.colorTop = pal[i]!.colorTop;
        layer.colorBottom = pal[i]!.colorBottom;
      });
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildLayers();
    }

    // Height of a wave layer at horizontal position x (plus pointer swell).
    function waveY(layer: WaveLayer, x: number): number {
      const base = layer.baseY * height;
      const primary = Math.sin(x * layer.frequency + layer.phase) * layer.amplitude;
      const harmonic =
        Math.sin(x * layer.frequency * layer.harmonicFreq + layer.phase * 1.5) *
        layer.amplitude *
        layer.harmonicAmp;

      // Localized swell: lift the crest near the smoothed cursor x, falling off
      // with horizontal distance (a soft Gaussian-ish bump).
      let swell = 0;
      if (smooth.x > -9998) {
        const dx = x - smooth.x;
        const influence = Math.exp(-(dx * dx) / (2 * 140 * 140));
        swell = -influence * 34; // negative = rise toward the top
      }
      return base + primary + harmonic + swell;
    }

    function drawLayer(layer: WaveLayer) {
      const step = 14; // sample spacing; coarse enough to be cheap, fine enough to look fluid
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, waveY(layer, 0));
      for (let x = step; x <= width; x += step) {
        ctx.lineTo(x, waveY(layer, x));
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const topY = layer.baseY * height - layer.amplitude * 1.8;
      const grad = ctx.createLinearGradient(0, topY, 0, height);
      grad.addColorStop(0, layer.colorTop);
      grad.addColorStop(1, layer.colorBottom);
      ctx.fillStyle = grad;
      ctx.fill();

      // Glowing crest line along the top edge of the wave.
      ctx.beginPath();
      ctx.moveTo(0, waveY(layer, 0));
      for (let x = step; x <= width; x += step) {
        ctx.lineTo(x, waveY(layer, x));
      }
      ctx.strokeStyle = layer.colorTop;
      ctx.globalAlpha = crestAlpha();
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function draw() {
      // Ease the smoothed pointer toward the raw position for a gentle swell.
      if (pointer.active) {
        smooth.x += (pointer.x - smooth.x) * 0.08;
        smooth.y += (pointer.y - smooth.y) * 0.08;
      } else if (smooth.x > -9998) {
        // Drift the swell away when the pointer leaves.
        smooth.x += (width * 1.5 - smooth.x) * 0.02;
      }

      ctx.clearRect(0, 0, width, height);
      for (const layer of layers) {
        layer.phase += layer.speed;
        drawLayer(layer);
      }
    }

    function loop() {
      draw();
      rafId = window.requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      rafId = window.requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (smooth.x < -9998) {
        smooth.x = e.clientX;
        smooth.y = e.clientY;
      }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    let resizeTimer: number | null = null;
    function onResize() {
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    }

    // Re-read the theme when the `dark` class on <html> toggles, and recolor
    // the waves to the matching palette. Under reduced motion, repaint the
    // static frame so the new colors take effect immediately.
    const themeObserver = new MutationObserver(() => {
      const nextDark = document.documentElement.classList.contains("dark");
      if (nextDark === isDark) return;
      isDark = nextDark;
      recolorLayers();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    if (reduceMotion) {
      draw(); // static single frame
    } else {
      start();
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerLeave, { passive: true });
    }

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Vertical backdrop behind the canvas. Light: clean white/off-white so
          content never darkens. Dark: deep-ocean gradient for tech depth. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#eef2f7] dark:from-[#04101a] dark:via-[#06202e] dark:to-[#020a12]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Readability guard so content text stays high-contrast (WCAG AA).
          Lighter in light mode since the base is already bright. */}
      <div className="absolute inset-0 bg-background/30 dark:bg-background/55" />
    </div>
  );
}

/**
 * Memoized so the background is inert to parent/app re-renders. It takes no
 * props, so the memo comparison is always equal after the first render.
 */
export const OceanWavesBackground = memo(OceanWavesBackgroundImpl);
