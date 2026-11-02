"use client";

import { memo, useEffect, useRef } from "react";

/**
 * Ambient animated background: a few large, blurred gradient orbs that drift
 * slowly (pure CSS keyframes, GPU-composited) with an optional subtle
 * mouse-parallax layer.
 *
 * Performance & a11y:
 * - No canvas/JS animation loop. Drift runs on the compositor via CSS.
 * - `React.memo` + zero props means it never re-renders after first paint —
 *   scroll, hover, and client-side route changes cannot touch it.
 * - Markup is identical on server and client (no mount gate), so it renders
 *   with the page on first paint — no pop-in flicker, no hydration mismatch.
 * - Parallax updates only two CSS custom properties per frame, throttled to
 *   one write per animation frame — no React re-renders while moving.
 * - Animated layers use `transform`/`opacity` only, plus `will-change` and
 *   `backface-visibility: hidden` to force a stable GPU layer and avoid
 *   repaint flicker.
 * - `pointer-events-none` + `aria-hidden` so it never blocks clicks/selection
 *   and is ignored by assistive tech.
 * - `fixed inset-0` with `-z-10` keeps it behind content and causes no layout
 *   shift (CLS).
 * - Respects `prefers-reduced-motion`: drift animations are gated by the
 *   `motion-safe:` variant, and the pointer listener is not attached.
 */
function AnimatedBackgroundImpl() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Skip the parallax listener entirely for reduced-motion or touch/coarse
    // pointers (no hover), where it adds cost with no visual benefit.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const el = rootRef.current;
    if (!el) return;

    function onPointerMove(e: PointerEvent) {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        // Normalize cursor position to [-1, 1] around the viewport center.
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        const node = rootRef.current;
        if (!node) return;
        // Small max offset keeps it subtle; compositor handles the transform.
        node.style.setProperty("--px", `${nx * 18}px`);
        node.style.setProperty("--py", `${ny * 18}px`);
      });
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [--px:0px] [--py:0px]"
    >
      {/* Parallax layer: translated by the mouse-driven CSS vars. Promoted to
          its own GPU layer so transforms never trigger a repaint. */}
      <div
        className="absolute inset-0 [backface-visibility:hidden] [transform:translate3d(var(--px),var(--py),0)] [will-change:transform]"
      >
        {/* Orb A — cyan, top-left */}
        <span className="absolute -left-[10%] -top-[10%] h-[45vmax] w-[45vmax] rounded-full bg-cyan-400/20 blur-[100px] [backface-visibility:hidden] [will-change:transform] motion-safe:animate-drift-a dark:bg-cyan-500/25" />
        {/* Orb B — indigo, right */}
        <span className="absolute -right-[12%] top-[20%] h-[50vmax] w-[50vmax] rounded-full bg-indigo-400/20 blur-[110px] [backface-visibility:hidden] [will-change:transform] motion-safe:animate-drift-b dark:bg-indigo-500/25" />
        {/* Orb C — emerald, bottom */}
        <span className="absolute bottom-[-15%] left-[25%] h-[40vmax] w-[40vmax] rounded-full bg-emerald-400/15 blur-[100px] [backface-visibility:hidden] [will-change:transform] motion-safe:animate-drift-c dark:bg-emerald-500/20" />
      </div>

      {/* Readability guard: a soft wash of the theme background over the orbs
          so text contrast (WCAG AA) is preserved in both themes. */}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />

      {/* Subtle grid texture for the developer aesthetic; very low opacity. */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "hsl(var(--foreground))",
        }}
      />
    </div>
  );
}

/**
 * Memoized so the background is inert to parent/app re-renders. It takes no
 * props, so the memo comparison is always equal after the first render.
 */
export const AnimatedBackground = memo(AnimatedBackgroundImpl);
