"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ExperienceType } from "@/types";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

const typeLabel: Record<ExperienceType, string> = {
  internship: "Internship",
  operations: "Operations",
  academic: "Academic",
};

export function ExperienceTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="An IT support internship alongside an operations background that built my reliability under pressure."
        />

        <ol className="mt-12 space-y-8 border-l border-border pl-6">
          {experience.map((item, index) => (
            <motion.li
              key={item.id}
              className="relative"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.08 }}
            >
              <span
                className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-accent"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.role}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {item.start} – {item.end}
                </span>
              </div>
              <p className="text-sm font-medium text-accent">
                {item.organization}
                {item.location ? (
                  <span className="text-muted-foreground"> · {item.location}</span>
                ) : null}
                <span className="ml-2 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  {typeLabel[item.type]}
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {item.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
