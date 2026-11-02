"use client";

import { useState } from "react";
import { ShieldCheck, LayoutGrid } from "lucide-react";
import type { CaseStudyField } from "@/types";
import { caseStudies } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";

const fieldMeta: Record<CaseStudyField, { label: string; icon: typeof ShieldCheck }> = {
  cybersecurity: { label: "Cybersecurity", icon: ShieldCheck },
  ux: { label: "UI/UX & HCI", icon: LayoutGrid },
};

export function CaseStudies() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = caseStudies.find((c) => c.id === activeId) ?? null;

  return (
    <section id="case-studies" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Case Studies"
          title="Research & analysis"
          description="Academic work that shows how I reason about security, ethics, and user experience."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => {
            const meta = fieldMeta[study.field];
            const Icon = meta.icon;
            return (
              <button
                key={study.id}
                type="button"
                onClick={() => setActiveId(study.id)}
                aria-haspopup="dialog"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-left transition-all duration-300 ease-out hover:border-accent hover:shadow-lg hover:shadow-accent/10 motion-safe:hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {meta.label}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {study.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {study.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActiveId(null)}
        title={active?.title ?? ""}
      >
        {active ? (
          <div className="space-y-6">
            <p className="leading-relaxed text-muted-foreground">{active.body}</p>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Key Takeaways
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {active.takeaways.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
