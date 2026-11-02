// Shared TypeScript contracts — single source of truth for all data shapes.

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type ProjectCategory = "web" | "mobile" | "ai" | "cloud";

export type ProjectLinkKind = "github" | "live" | "docs";

export interface ProjectLink {
  label: string;
  href: string;
  kind: ProjectLinkKind;
}

export interface Project {
  /** Stable slug; used as React key and modal id. */
  id: string;
  title: string;
  category: ProjectCategory;
  /** One-line blurb shown on the card. */
  summary: string;
  /** Full modal body. */
  description: string;
  /** Bullet outcomes / technical reasoning. */
  highlights: string[];
  /** Display tech tags. */
  stack: string[];
  links: ProjectLink[];
  featured: boolean;
  /** e.g. "2025". */
  period?: string;
  /** e.g. "Jabatan Agama Islam Selangor". */
  collaborators?: string;
}

export type ExperienceType = "internship" | "operations" | "academic";

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  /** e.g. "Aug 2026". */
  start: string;
  /** e.g. "Nov 2026" | "Present". */
  end: string;
  type: ExperienceType;
  summary: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  id: string;
  /** e.g. "Full-Stack Web", "IT & Networking", "AI & Logic". */
  label: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  /** Optional longer description of what the training/credential covered. */
  description?: string;
  /** Optional focus areas / session breakdown (e.g. talk + workshop titles). */
  focusAreas?: string[];
  /** Optional image asset path under /public (e.g. "/images/foo.jpg"). */
  image?: string;
  /** Optional alt text for the image; required when `image` is set. */
  imageAlt?: string;
}

export type CaseStudyField = "cybersecurity" | "ux";

export interface CaseStudy {
  id: string;
  title: string;
  field: CaseStudyField;
  summary: string;
  /** Long-form modal body. */
  body: string;
  takeaways: string[];
  tags: string[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  /** Absolute public path, e.g. "/cv/Muhammad-Zulhusni-Irfan-CV.pdf". */
  cvPath: string;
  summary: string;
  education: {
    credential: string;
    institution: string;
    focus: string;
  };
}
