# Structure Steering — Directory Layout & Organization

## Directory Layout
```
portfolio/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout: fonts, theme provider, metadata
│   ├── page.tsx               # Home — composes section components
│   ├── globals.css            # Tailwind layers + CSS variables (theme tokens)
│   └── favicon.ico
├── components/
│   ├── sections/              # Page sections (one concern each)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── Skills.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   └── ui/                    # Reusable, content-agnostic primitives
│       ├── Modal.tsx
│       ├── ProjectCard.tsx
│       ├── Badge.tsx
│       ├── SectionHeading.tsx
│       ├── ThemeToggle.tsx
│       └── Button.tsx
├── data/                      # Typed content (source of truth for UI)
│   ├── profile.ts
│   ├── projects.ts
│   ├── experience.ts
│   ├── skills.ts
│   ├── certifications.ts
│   └── caseStudies.ts
├── types/                     # Shared TypeScript contracts
│   └── index.ts
├── lib/                       # Framework-agnostic helpers
│   └── utils.ts               # cn() and small utilities
├── public/                    # Static assets served as-is
│   ├── cv/                    # Downloadable CV (PDF)
│   ├── images/                # Project/profile imagery
│   └── icons/
├── .kiro/                     # Kiro primitives (steering, hooks, specs, mcp)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

## Placement Rules
- **Sections vs UI:** `components/sections/` owns layout + content wiring for one page region. `components/ui/` owns reusable, content-agnostic primitives. A primitive must not import from `data/`.
- **Data:** all copy, project metadata, timeline entries, skills, and case studies live in `data/` as typed exports. Components import data; they never inline it.
- **Types:** every entity shape is declared/exported from `types/index.ts` and consumed by both `data/` and components.
- **lib:** pure, framework-agnostic utilities only. No React, no Next imports beyond types.
- **public:** the CV PDF lives in `public/cv/`; reference it by absolute path (`/cv/...`). Images go in `public/images/`.

## Naming Conventions
- Components & types: `PascalCase`. Data files & utilities: `camelCase`.
- Data module exports a named const matching the file (e.g. `projects.ts` → `export const projects`).
- Props interfaces: `<ComponentName>Props`.

## Import Order (top to bottom)
1. React / Next
2. Third-party libraries (framer-motion, lucide-react)
3. Internal types (`@/types`)
4. Internal data (`@/data/*`)
5. Internal components (`@/components/*`)
6. Internal lib/utils (`@/lib/*`)

Use the `@/*` path alias (configured in `tsconfig.json`) for all internal imports.
