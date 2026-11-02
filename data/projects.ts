import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "coia-management-system",
    title: "Class Of Iqra Al-Mubarak (COIA) Management System",
    category: "web",
    summary:
      "Final-year Laravel management system for religious-class administration, built with Jabatan Agama Islam Selangor.",
    description:
      "A full administrative platform for managing Iqra Al-Mubarak classes, developed as my Final Year Project in collaboration with Jabatan Agama Islam Selangor. It handles the full lifecycle of student management — enrollment, attendance, and scheduling — behind a role-based access control layer so administrators, teachers, and staff each see only what their role permits.",
    highlights: [
      "Role-based access control (RBAC) separating admin, teacher, and staff permissions.",
      "Student enrollment and record management via Eloquent ORM over MySQL.",
      "Attendance tracking with per-class session records.",
      "Administrative scheduling for classes and sessions.",
    ],
    stack: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "HTML5", "CSS3", "JavaScript"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/kl2408016855-beep/COIA-SYSTEM.git",
        kind: "github",
      },
    ],
    featured: true,
    collaborators: "Jabatan Agama Islam Selangor",
  },
  {
    id: "medical-diagnosis-expert-system",
    title: "Medical Diagnosis & Treatment Expert System",
    category: "ai",
    summary:
      "SWI-Prolog expert system using backward chaining and constraint satisfaction to reason about diagnoses and treatments.",
    description:
      "A knowledge-engineering project that models medical diagnosis and treatment as a logic program in SWI-Prolog. It uses Horn clauses and backward chaining with negation-by-failure to infer likely conditions, treats the matching of symptoms to conditions as a constraint satisfaction problem, and supports emergency overrides and dynamic memory assertions so the knowledge base can adapt during a consultation.",
    highlights: [
      "Constraint Satisfaction Problem (CSP) formulation for symptom-to-condition matching.",
      "Horn clauses with backward chaining and negation-by-failure (\\+).",
      "Emergency override rules that short-circuit standard inference.",
      "Dynamic memory assertions to update the knowledge base at runtime.",
    ],
    stack: ["SWI-Prolog", "Logic Programming", "AI", "Knowledge Engineering"],
    links: [],
    featured: true,
  },
  {
    id: "uptm-bizz",
    title: "UPTM Bizz Mobile App",
    category: "mobile",
    summary:
      "Flutter + Firebase campus commerce app and vendor directory for student-run businesses.",
    description:
      "A mobile-first campus commerce portal that connects UPTM students with on-campus vendors. Built with Flutter and backed by Firebase, it provides a vendor directory, catalog browsing, and a student business storefront experience tailored to campus life.",
    highlights: [
      "Campus commerce directory of student-run businesses.",
      "Vendor catalog browsing with a mobile-first layout.",
      "Firebase-backed data and authentication.",
    ],
    stack: ["Flutter", "Dart", "Firebase"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/kl2408016855-beep/uptmbizz.git",
        kind: "github",
      },
    ],
    featured: true,
  },
  {
    id: "ogn-cloud-portfolio",
    title: "OGN Cloud Portfolio",
    category: "cloud",
    summary:
      "Static portfolio with automated Netlify CI/CD and Git-driven build workflows.",
    description:
      "A cloud-deployed static portfolio demonstrating a modern front-end build and delivery pipeline. Changes pushed to Git trigger automated Netlify builds and deploys, giving a continuous delivery workflow from commit to live site.",
    highlights: [
      "Automated Netlify CI/CD on every push.",
      "Git-driven build workflows.",
      "Hand-built with core web fundamentals (HTML5/CSS3/JS).",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Netlify", "Git"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/kl2408016855-beep/ogn-portfolio.git",
        kind: "github",
      },
    ],
    featured: false,
  },
];
