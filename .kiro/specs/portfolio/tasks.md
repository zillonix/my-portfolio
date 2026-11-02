# Tasks — Portfolio Website

Atomic, phased implementation plan. Each item is independently verifiable. Check off only after `npm run lint` and `tsc --noEmit` pass (per `tech.md`).

## Phase 0 — Workspace Scaffold
- [x] 0.1 Initialize Next.js (App Router) + TypeScript project at workspace root.
- [x] 0.2 Install dependencies: `tailwindcss`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`.
- [x] 0.3 Configure Tailwind (`darkMode: "class"`, content globs, theme tokens) + `globals.css` with CSS variables.
- [x] 0.4 Set `tsconfig.json` to `strict: true`, `noUncheckedIndexedAccess`, and `@/*` path alias.
- [x] 0.5 Create directory skeleton: `app/`, `components/sections/`, `components/ui/`, `data/`, `types/`, `lib/`, `public/{cv,images,icons}`.
- [x] 0.6 Add `lib/utils.ts` with `cn()` (clsx + tailwind-merge).
- [x] 0.7 Verify dev server boots and lint/typecheck pass on the empty scaffold.

## Phase 1 — Data Layer & Types
- [x] 1.1 Define all contracts in `types/index.ts` (`Project`, `ExperienceItem`, `SkillGroup`, `Certification`, `CaseStudy`, `Profile`, supporting unions).
- [x] 1.2 `data/profile.ts` — name, headline, location, email, phone, LinkedIn, GitHub, cvPath, summary.
- [x] 1.3 `data/projects.ts` — COIA, Medical Diagnosis Expert System, UPTM Bizz, OGN Cloud Portfolio (titles, stacks, highlights, repo links).
- [x] 1.4 `data/experience.ts` — UKMShape IT internship + operations roles (Taco Bell, Bungkus Kaw Kaw, Chacha Mommy Rich Empire).
- [x] 1.5 `data/skills.ts` — grouped: Full-Stack Web, IT & Networking, AI & Logic.
- [x] 1.6 `data/certifications.ts` — CCNA, UKM Kursus Transformasi Digital.
- [x] 1.7 `data/caseStudies.ts` — Uber breach ethics, Shopee UX redesign.
- [ ] 1.8 (MCP) Verify each project repo link resolves via GitHub MCP and periods are accurate. _(Deferred: requires GITHUB_PERSONAL_ACCESS_TOKEN for the GitHub MCP server. Links transcribed directly from the profile brief.)_

## Phase 2 — UI Primitives
- [x] 2.1 `components/ui/Button.tsx` — link/button variants, focus-visible styles.
- [x] 2.2 `components/ui/Badge.tsx` — tech/skill tag.
- [x] 2.3 `components/ui/SectionHeading.tsx` — consistent title + optional eyebrow.
- [x] 2.4 `components/ui/ThemeToggle.tsx` — client; localStorage persistence + no-flash.
- [x] 2.5 `components/ui/Modal.tsx` — client; focus trap, Esc/overlay close, focus restore, AnimatePresence.
- [x] 2.6 `components/ui/ProjectCard.tsx` — presentational card.

## Phase 3 — Layout & Theme Shell
- [x] 3.1 `app/layout.tsx` — `next/font`, metadata/SEO, pre-hydration theme script, header (nav + ThemeToggle), footer.
- [x] 3.2 Skip-to-content link + landmark regions.
- [ ] 3.3 Verify dark default + light toggle with no flash; contrast check both themes. _(Implemented: no-flash script + class strategy. Visual/contrast check needs a browser run.)_

## Phase 4 — Section Components
- [x] 4.1 `Hero.tsx` — headline, CTAs (Projects, Download CV), socials, staggered entrance.
- [x] 4.2 `About.tsx` — narrative + education, value pillars.
- [x] 4.3 `Projects.tsx` — grid of cards + modal open state wiring.
- [x] 4.4 `ExperienceTimeline.tsx` — animated vertical timeline.
- [x] 4.5 `Skills.tsx` — grouped clusters with levels.
- [x] 4.6 `Certifications.tsx` — cert list.
- [x] 4.7 `Contact.tsx` — contact links + CV download.
- [x] 4.8 `app/page.tsx` — compose all sections in IA order.

## Phase 5 — Interactive Case Study & Project Modals
- [x] 5.1 Project detail modal — description, highlights, stack, links.
- [x] 5.2 `CaseStudies.tsx` — research cards opening detail modals (Uber, Shopee).
- [x] 5.3 Single-active-id pattern; Esc/overlay close; focus restore verified.
- [x] 5.4 Gate modal animations behind `prefers-reduced-motion`.

## Phase 6 — Assets & Content Integrity
- [ ] 6.1 Add CV PDF to `public/cv/` and reference via `profile.cvPath`. _(Path wired; drop the PDF per public/cv/README.md.)_
- [ ] 6.2 Add project/profile images to `public/images/`; wire with `next/image`. _(Optional; current UI is text/icon-based and needs no images to ship.)_
- [ ] 6.3 (MCP) Filesystem MCP check: no `data` path references a missing asset. _(Deferred with MCP; only outstanding reference is the CV PDF above.)_

## Phase 7 — Accessibility & Performance Validation
- [ ] 7.1 Keyboard-only pass: nav, cards, modals, toggle all operable; visible focus everywhere. _(Built for it; needs a browser run to confirm.)_
- [ ] 7.2 Screen-reader smoke test of landmarks, headings, modal semantics.
- [ ] 7.3 Responsive check at 360 / 768 / 1280 px.
- [x] 7.4 `next build` production build clean; no console errors. _(Build passed: TSC + ESLint clean, static prerender, 162 kB First Load JS.)_
- [ ] 7.5 Lighthouse budgets met (Perf ≥ 95, A11y 100, BP ≥ 95, SEO ≥ 95). _(Run after deploy/local serve.)_

## Phase 8 — Deployment Validation
- [ ] 8.1 Configure deploy (Vercel/Netlify); set any build env.
- [ ] 8.2 Deploy preview; verify all repo links, CV download, and images in production.
- [ ] 8.3 Final smoke test on the live URL (mobile + desktop).
