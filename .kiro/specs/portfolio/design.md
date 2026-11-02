# Design — Portfolio Website

## 1. Overview
A single-page (with anchored sections) Next.js App Router portfolio for Muhammad Zulhusni Irfan. Dark-mode default with a light toggle, Framer Motion micro-interactions, Lucide icons, and interactive modals for project deep-dives and academic case studies. Content is driven entirely by typed data modules so copy and layout stay decoupled.

## 2. Goals & Non-Goals
**Goals**
- Fast, accessible (WCAG AA target), responsive single-page experience.
- Recruiter can grasp fit and download the CV within ~15 seconds.
- Project and case-study detail available on demand via modals (no page nav cost).
- All content typed and centralized in `data/`.

**Non-Goals**
- No CMS/backend, auth, or database.
- No blog/MDX pipeline in v1.
- GitHub MCP data is a build/authoring aid, not a runtime client-side API dependency.

## 3. Information Architecture
Section order (also the top-nav anchor order):

1. **Hero** — name, headline (full-stack dev + IT/AI), location, primary CTAs (View Projects, Download CV), social links.
2. **About** — short narrative tying together the three value pillars; education (UPTM diploma).
3. **Projects** — grid of `ProjectCard`s; click opens a `Modal` with full detail.
4. **Experience** — vertical timeline (internship + operations roles).
5. **Skills** — grouped skill clusters with proficiency.
6. **Case Studies** — research cards (Uber breach ethics, Shopee UX) opening detail modals.
7. **Certifications** — CCNA, UKM Digital Transformation.
8. **Contact** — email, phone, LinkedIn, GitHub; CV download.

Global: sticky header with nav + `ThemeToggle`; footer with contact + copyright.

## 4. Data Contracts (`types/index.ts`)
```ts
export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type ProjectCategory =
  | "web"
  | "mobile"
  | "ai"
  | "cloud";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "live" | "docs";
}

export interface Project {
  id: string;                 // stable slug, used as React key & modal id
  title: string;
  category: ProjectCategory;
  summary: string;            // one-line card blurb
  description: string;        // full modal body
  highlights: string[];      // bullet outcomes / technical reasoning
  stack: string[];           // display tech tags
  links: ProjectLink[];
  featured: boolean;
  period?: string;            // e.g. "2025"
  collaborators?: string;     // e.g. "Jabatan Agama Islam Selangor"
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  start: string;              // "Aug 2026"
  end: string;                // "Nov 2026" | "Present"
  type: "internship" | "operations" | "academic";
  summary: string;
  achievements: string[];
}

export interface SkillGroup {
  id: string;
  label: string;              // "Full-Stack Web", "IT & Networking", "AI & Logic"
  skills: { name: string; level: SkillLevel }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  field: "cybersecurity" | "ux";
  summary: string;
  body: string;               // modal long-form
  takeaways: string[];
  tags: string[];
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  cvPath: string;             // "/cv/Muhammad-Zulhusni-Irfan-CV.pdf"
  summary: string;
}
```

## 5. Component Architecture
| Component | Dir | Client? | Responsibility |
|---|---|---|---|
| `layout.tsx` | app | server | fonts, metadata, `<ThemeProvider>`, header/footer |
| `page.tsx` | app | server | composes section components in IA order |
| `Hero` | sections | client (motion) | headline + CTAs + entrance animation |
| `About` | sections | server | narrative + education |
| `Projects` | sections | client | grid + modal open state |
| `ExperienceTimeline` | sections | client | animated timeline |
| `Skills` | sections | server | grouped skill clusters |
| `CaseStudies` | sections | client | research cards + modal |
| `Certifications` | sections | server | cert list |
| `Contact` | sections | server | contact links + CV |
| `Modal` | ui | client | focus-trapped dialog, Esc/overlay close |
| `ProjectCard` | ui | server* | presentational card (click handled by parent) |
| `Badge` | ui | server | tech/skill tag |
| `SectionHeading` | ui | server | consistent section title block |
| `ThemeToggle` | ui | client | dark/light switch, persists to localStorage |
| `Button` | ui | server | styled button/link primitive |

\* `ProjectCard` is presentational; the interactive wrapper handling the click lives in the `Projects` section (client).

## 6. Theming & Tokens
- Tailwind `darkMode: "class"`; dark is the default (`class="dark"` set pre-paint to avoid flash).
- CSS variables in `globals.css` for `--background`, `--foreground`, `--muted`, `--accent`, surfaced through the Tailwind theme.
- Accent color used sparingly for CTAs, links, and active nav state; verify ≥ 4.5:1 contrast in both themes.
- Typography: one `next/font` sans (e.g. Inter/Geist) via CSS variable.

## 7. Animation (Framer Motion)
- Hero: staggered fade/slide-up on mount.
- Sections: `whileInView` fade-up, `once: true`, small y-offset.
- Timeline: sequential reveal of entries.
- Modal: scale+fade enter/exit via `AnimatePresence`.
- All non-essential motion gated behind `prefers-reduced-motion`.

## 8. State Handling
- No global state library. Local `useState` only.
- Modal open state owned by the section that renders the cards; selected item id (or null) drives which modal content shows.
- Theme: `ThemeToggle` reads/writes `localStorage` + toggles `document.documentElement` class; an inline pre-hydration script applies the stored theme to prevent flash.
- Project/case-study modals: single active id pattern (`const [activeId, setActiveId] = useState<string | null>(null)`).

## 9. Accessibility Plan
- Skip-to-content link; landmark regions (`header`/`main`/`footer`).
- Modal: `role="dialog"`, `aria-modal`, labelled by its heading, focus trap, Esc close, focus restore.
- Nav anchors with visible focus; `aria-current` on active section (optional scroll-spy).
- Contrast and `alt` text audited per `tech.md`.

## 10. Performance Plan
- Server Components for all static sections; client islands only for Hero/Projects/Timeline/CaseStudies/Modal/ThemeToggle.
- `next/image` with explicit sizes; `next/font`; lazy-load modal bodies.
- Target Lighthouse: Perf ≥ 95, A11y 100, BP ≥ 95, SEO ≥ 95.

## 11. MCP Usage (authoring-time)
- **GitHub MCP** (`kl2408016855-beep`): fetch repo metadata, descriptions, and commit recency to populate/verify `data/projects.ts` links and periods during authoring.
- **Filesystem MCP**: verify presence of the CV PDF in `public/cv/` and project images in `public/images/` so `data` paths never 404.

## 12. Deployment
- Static/edge build; deploy to Vercel or Netlify.
- Validate production build (`next build`), Lighthouse budgets, and link integrity before release.
