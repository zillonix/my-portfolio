import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "full-stack-web",
    label: "Full-Stack Web",
    skills: [
      { name: "Laravel", level: "advanced" },
      { name: "PHP", level: "advanced" },
      { name: "MySQL", level: "advanced" },
      { name: "JavaScript", level: "intermediate" },
      { name: "TypeScript", level: "intermediate" },
      { name: "HTML5 & CSS3", level: "advanced" },
      { name: "Python", level: "intermediate" },
      { name: "Flutter & Dart", level: "intermediate" },
      { name: "Firebase", level: "intermediate" },
    ],
  },
  {
    id: "it-networking",
    label: "IT & Networking",
    skills: [
      { name: "Networking (CCNA)", level: "intermediate" },
      { name: "Server Administration", level: "intermediate" },
      { name: "Moodle LMS", level: "intermediate" },
      { name: "Microsoft 365", level: "advanced" },
      { name: "Google Workspace", level: "advanced" },
      { name: "IT Support & Maintenance", level: "advanced" },
      { name: "Cybersecurity Fundamentals", level: "intermediate" },
    ],
  },
  {
    id: "ai-logic",
    label: "AI & Logic",
    skills: [
      { name: "SWI-Prolog", level: "intermediate" },
      { name: "Logic Programming", level: "intermediate" },
      { name: "Knowledge Engineering", level: "intermediate" },
      { name: "Constraint Satisfaction (CSP)", level: "intermediate" },
    ],
  },
];
