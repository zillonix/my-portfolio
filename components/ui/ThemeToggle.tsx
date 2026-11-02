"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

/**
 * Dark/light theme switch. Persists the choice to localStorage and toggles
 * the `dark` class on <html>. The initial class is applied pre-hydration by
 * the inline script in app/layout.tsx to avoid a flash of the wrong theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync React state with the external DOM theme (applied pre-hydration by
    // the inline script in layout.tsx) and with localStorage. This is a
    // one-time mount sync with an external system — the intended use of an
    // effect — not a reactive state cascade.
    const stored = window.localStorage.getItem("theme");
    const isDark = stored
      ? stored === "dark"
      : document.documentElement.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("theme", next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch. */}
      {mounted && !isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
