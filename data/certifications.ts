import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "ccna-intro-networks",
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco",
  },
  {
    id: "ukm-digital-transformation",
    name: "Kursus Transformasi Digital",
    issuer: "Universiti Kebangsaan Malaysia (UKM)",
  },
  {
    id: "aws-student-community-day-ai",
    name: "AWS Student Community Day: AI Track",
    issuer: "AWS Student Builder Group & Sunway University",
    description:
      "Hands-on training covering Model Context Protocol (MCP) server architecture, safe AI tool integration, and agentic development workflows using Kiro.",
    focusAreas: [
      'Talk: "Giving AI the Keys, Safely: Building MCP Servers from Scratch"',
      'Workshop: "Learn New Development Skills with Kiro — Builder Session"',
    ],
    image: "/images/aws-builder-group.jpeg",
    imageAlt:
      "AWS Student Community Day AI Track session hosted by the AWS Student Builder Group and Sunway University",
  },
];
