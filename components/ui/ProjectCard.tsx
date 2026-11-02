import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** Invoked when the card is activated (opens the detail modal). */
  onOpen: (id: string) => void;
}

const categoryLabel: Record<Project["category"], string> = {
  web: "Web",
  mobile: "Mobile",
  ai: "AI / Logic",
  cloud: "Cloud",
};

/**
 * Presentational, clickable project card. The modal and open state are
 * owned by the parent section; this component only reports activation.
 */
export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project.id)}
      aria-haspopup="dialog"
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          {categoryLabel[project.category]}
        </span>
        <ArrowUpRight
          className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
        {project.stack.length > 4 ? (
          <Badge>+{project.stack.length - 4}</Badge>
        ) : null}
      </div>
    </button>
  );
}
