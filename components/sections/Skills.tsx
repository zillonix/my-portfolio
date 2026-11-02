import type { SkillLevel } from "@/types";
import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const levelStyles: Record<SkillLevel, string> = {
  advanced: "bg-accent/15 text-accent border-accent/30",
  intermediate: "bg-muted text-foreground border-border",
  beginner: "bg-muted text-muted-foreground border-border",
};

const levelLabel: Record<SkillLevel, string> = {
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Beginner",
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Across the stack and the infrastructure"
          description="Grouped by domain — from full-stack web delivery to IT operations and AI logic."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm text-foreground">{skill.name}</span>
                    <span
                      className={cn(
                        "rounded-md border px-2 py-0.5 text-xs font-medium",
                        levelStyles[skill.level],
                      )}
                    >
                      {levelLabel[skill.level]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
