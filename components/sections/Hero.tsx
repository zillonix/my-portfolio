"use client";

import Image from "next/image";
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

  const avatar = reduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, scale: 0.92 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]"
        >
          <div className="max-w-3xl">
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
          </div>

          {/* Glowing avatar frame */}
          <motion.div
            variants={avatar}
            className="group relative mx-auto w-full max-w-[18rem] lg:mx-0 lg:ml-auto"
          >
            {/* Soft gradient glow behind the photo — gently pulses, and
                intensifies on hover. opacity-only animation keeps it cheap. */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400/40 via-indigo-400/30 to-emerald-400/40 opacity-70 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-100 motion-safe:animate-pulse dark:from-cyan-500/40 dark:via-indigo-500/30 dark:to-emerald-500/40"
            />
            <div className="relative aspect-square overflow-hidden rounded-full border-2 border-border/70 bg-card shadow-2xl ring-1 ring-accent/20 transition-all duration-500 ease-out group-hover:ring-2 group-hover:ring-accent/50">
              <Image
                src="/images/profile.jpg"
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 640px) 18rem, 70vw"
                className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              />
            </div>
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
