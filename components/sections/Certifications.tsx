import Image from "next/image";
import { Award } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Training & credentials"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {certifications.map((cert) => {
            const isRich = Boolean(
              cert.description || cert.focusAreas?.length || cert.image,
            );
            return (
              <div
                key={cert.id}
                className={cn(
                  "group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-out hover:border-accent hover:shadow-lg hover:shadow-accent/10",
                  // Rich cards (with image/details) span the full row.
                  isRich ? "sm:col-span-2" : "",
                )}
              >
                {cert.image ? (
                  <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
                    <Image
                      src={cert.image}
                      alt={cert.imageAlt ?? cert.name}
                      fill
                      sizes="(min-width: 640px) 100vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="flex items-start gap-4 p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                      {cert.year ? ` · ${cert.year}` : ""}
                    </p>

                    {cert.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {cert.description}
                      </p>
                    ) : null}

                    {cert.focusAreas?.length ? (
                      <ul className="mt-3 space-y-1.5">
                        {cert.focusAreas.map((area) => (
                          <li
                            key={area}
                            className="flex gap-2 text-sm text-muted-foreground"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
