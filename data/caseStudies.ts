import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "uber-2016-breach-ethics",
    title: "2016 Uber Data Breach & ACM Ethics Governance",
    field: "cybersecurity",
    summary:
      "A governance and ethics analysis of the 2016 Uber breach, mapped to ACM Code of Ethics and concrete security guardrails.",
    body:
      "This case study examines the 2016 Uber data breach — in which attackers accessed credentials left in a code repository — through the lens of the ACM Code of Ethics and professional governance. It analyzes how the incident was handled, where disclosure and accountability obligations were not met, and what technical and organizational controls would have changed the outcome. The analysis translates ethics principles into actionable engineering practice.",
    takeaways: [
      "Secret scanning and credential hygiene prevent repository-leaked keys from becoming breaches.",
      "Multi-factor authentication (MFA) guardrails raise the cost of credential compromise.",
      "Transparent breach disclosure is both an ethical and a governance obligation.",
      "Mapping incidents to the ACM Code of Ethics clarifies professional responsibility.",
    ],
    tags: ["Cybersecurity", "Ethics", "Governance", "Secret Scanning", "MFA"],
  },
  {
    id: "shopee-ux-redesign",
    title: "Shopee E-Commerce Interface Redesign & Usability Testing",
    field: "ux",
    summary:
      "A UI/UX and HCI redesign of the Shopee shopping interface, validated with a think-aloud usability testing framework.",
    body:
      "This case study applies human-computer interaction principles to redesign key flows of the Shopee e-commerce interface, focusing on clarity, findability, and reduced friction in the browse-to-checkout journey. The redesign is evaluated with a think-aloud usability testing framework, surfacing where users hesitated or made errors and feeding those observations back into iterative design improvements.",
    takeaways: [
      "Think-aloud protocols reveal friction that heuristic review alone misses.",
      "Reducing steps in the browse-to-checkout flow improves task completion.",
      "HCI heuristics provide a shared vocabulary for prioritizing fixes.",
      "Iterating from observed user behavior beats designing from assumption.",
    ],
    tags: ["UI/UX", "HCI", "Usability Testing", "Think-Aloud", "E-Commerce"],
  },
];
