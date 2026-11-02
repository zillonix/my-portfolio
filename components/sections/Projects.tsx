"use client";

import { useState } from "react";
import { Github, ExternalLink, FileText } from "lucide-react";
import type { ProjectLinkKind } from "@/types";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";

const linkIcon: Record<ProjectLinkKind, typeof Github> = {
  github: Github,
  live: ExternalLink,
  docs: FileText,
};

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === activeId) ?? null;

  return (
    <section id="projects" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Production systems and research builds across web, mobile, AI, and cloud. Open any card for the full breakdown."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setActiveId}
            />
          ))}
        </div>
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActiveId(null)}
        title={active?.title ?? ""}
      >
        {active ? (
          <div className="space-y-6">
            {active.collaborators ? (
              <p className="text-sm text-muted-foreground">
                In collaboration with{" "}
                <span className="font-medium text-foreground">
                  {active.collaborators}
                </span>
              </p>
            ) : null}

            <p className="leading-relaxed text-muted-foreground">
              {active.description}
            </p>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Highlights
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {active.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            {active.links.length > 0 ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {active.links.map((link) => {
                  const Icon = linkIcon[link.kind];
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
