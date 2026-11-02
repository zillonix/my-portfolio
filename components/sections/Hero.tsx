"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
    },
  };

  const item = reduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            {profile.location}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {profile.headline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary">
              View Projects
            </Button>
            <Button href={profile.cvPath} variant="secondary" download>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </Button>
            <Button
              href={profile.github}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </Button>
            <Button
              href={profile.linkedin}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </Button>
          </motion.div>
        </motion.div>

        <a
          href="#about"
          aria-label="Scroll to About"
          className="mt-16 inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          Learn more
        </a>
      </div>
    </section>
  );
}
