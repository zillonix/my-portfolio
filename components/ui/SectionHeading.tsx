import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small label above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** HTML id for anchor navigation (rendered on the wrapper). */
  id?: string;
  className?: string;
  align?: "left" | "center";
}

/** Consistent section title block used across all page sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}
