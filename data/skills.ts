import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "full-stack-web",
    label: "Full-Stack Web",
    skills: [
      { name: "Laravel", level: "advanced" },
      { name: "PHP", level: "advanced" },
      { name: "MySQL", level: "advanced" },
      { name: "JavaScript", level: "advanced" },
      { name: "TypeScript", level: "advanced" },
      { name: "HTML5 & CSS3", level: "advanced" },
      { name: "Python", level: "advanced" },
      { name: "Flutter & Dart", level: "advanced" },
      { name: "Firebase", level: "advanced" },
    ],
  },
  {
    id: "it-networking",
    label: "IT & Networking",
    skills: [
      { name: "Networking (CCNA)", level: "advanced" },
      { name: "Server Administration", level: "advanced" },
      { name: "Moodle LMS", level: "advanced" },
      { name: "Microsoft 365", level: "advanced" },
      { name: "Google Workspace", level: "advanced" },
      { name: "IT Support & Maintenance", level: "advanced" },
      { name: "Cybersecurity Fundamentals", level: "advanced" },
    ],
  },
  {
    id: "ai-logic",
    label: "AI & Logic",
    skills: [
      { name: "SWI-Prolog", level: "advanced" },
      { name: "Logic Programming", level: "advanced" },
      { name: "Knowledge Engineering", level: "advanced" },
      { name: "Constraint Satisfaction (CSP)", level: "advanced" },
    ],
  },
];
