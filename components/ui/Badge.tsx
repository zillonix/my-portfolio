import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Small, content-agnostic tag for tech stacks and skills. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground",
        "transition-all duration-200 ease-out hover:border-accent/60 hover:text-foreground",
        "motion-safe:hover:scale-105",
        className,
      )}
    >
      {children}
    </span>
  );
}
