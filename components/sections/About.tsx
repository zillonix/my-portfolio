import { Code2, ServerCog, BrainCircuit, GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  {
    icon: Code2,
    title: "Full-Stack Web Delivery",
    description:
      "Ships production systems with Laravel, PHP, Python, and modern TypeScript — from data models to UI.",
  },
  {
    icon: ServerCog,
    title: "System Reliability & IT Ops",
    description:
      "Networking (CCNA), server and LMS administration, and real IT support experience keep systems running.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Logic Systems",
    description:
      "Applies knowledge engineering and constraint-based reasoning to real problem domains, not buzzwords.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="A builder who keeps systems running"
          description={profile.summary}
        />

        <div className="mt-6 inline-flex items-start gap-3 rounded-xl border border-border bg-card p-4">
          <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <p className="font-medium text-foreground">
              {profile.education.credential}
            </p>
            <p className="text-sm text-muted-foreground">
              {profile.education.institution} — {profile.education.focus}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <pillar.icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
