import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          description="Open to full-stack, IT support, and junior engineering roles. The fastest way to reach me is email."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-xl">
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
              <span className="text-sm">{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
              <span className="text-sm">{profile.phone}</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button href={profile.cvPath} variant="primary" download>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </Button>
            <Button
              href={profile.github}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </Button>
            <Button
              href={profile.linkedin}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
