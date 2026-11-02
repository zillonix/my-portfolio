"use client";

import Link from "next/link";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:opacity-90 border border-transparent",
  secondary:
    "bg-transparent text-foreground border border-border hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

const MotionLink = motion.create(Link);

// Use Framer Motion's prop types so motion's redefined DOM handlers
// (onDrag, onAnimationStart, ...) stay compatible when spread.
type ButtonAsButton = BaseProps &
  Omit<HTMLMotionProps<"button">, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof MotionLink>, keyof BaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Styled button primitive. Renders an anchor (via next/link) when `href`
 * is provided, otherwise a native button. Adds a subtle spring scale on
 * hover/tap (transform-only, GPU-friendly), disabled under reduced motion.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const reduceMotion = useReducedMotion();
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  // Spring micro-interaction; a no-op object when the user prefers reduced motion.
  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.04 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring" as const, stiffness: 400, damping: 17 },
      };

  if (rest.href !== undefined) {
    const { href, ...linkRest } = rest;
    return (
      <MotionLink href={href} className={classes} {...motionProps} {...linkRest}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...rest}>
      {children}
    </motion.button>
  );
}
