# Technical Steering — Standards & Conventions

## Stack (authoritative)
- **Framework:** Next.js (App Router).
- **Language:** TypeScript, `strict` mode. No `any` in committed code.
- **Styling:** Tailwind CSS (utility-first).
- **Animation:** Framer Motion.
- **Icons:** Lucide React.
- **Deployment target:** static/edge-friendly build (Vercel or Netlify).

## TypeScript Rules
- `strict: true` in `tsconfig.json`; also enable `noUncheckedIndexedAccess`.
- Every data entity has an explicit, exported `type`/`interface` in `types/`.
- No implicit `any`; prefer discriminated unions over loose optional flags.
- Public component props are typed interfaces named `<Component>Props`.
- Derive types from data schemas where possible; do not duplicate shapes.
- Use `as const` for literal option sets (e.g. project categories, skill levels).

## Component Conventions
- One component per file; name the file after the component (PascalCase).
- **Server Components by default.** Add `"use client"` only when a component needs state, effects, or browser APIs (modals, theme toggle, motion that depends on interaction).
- Keep components small and composable. Section components live in `components/sections/`; reusable primitives in `components/ui/`.
- No business/content data hardcoded in components — read from `data/`.
- Co-locate nothing that belongs in `types/` or `data/`.

## Tailwind Conventions
- Design tokens via Tailwind theme (colors, spacing, typography); avoid arbitrary values unless unavoidable.
- Dark mode is the **default**; implement with the `class` strategy and a light toggle.
- Compose repeated utility clusters with a `cn()` helper (clsx + tailwind-merge). No inline style objects for layout.
- Mobile-first: write base styles for small screens, layer `md:`/`lg:` up.

## Accessibility (WCAG 2.1 AA target)
- All interactive elements reachable and operable by keyboard; visible focus states (never remove outlines without a replacement).
- Modals: focus trap, `Esc` to close, restore focus to the trigger, `aria-modal` + labelled title.
- Semantic HTML first (`nav`, `main`, `section`, `button`, `a`); ARIA only to fill gaps.
- Color contrast ≥ 4.5:1 for text (≥ 3:1 for large text) in both themes.
- All images have meaningful `alt`; decorative images use empty `alt`.
- Respect `prefers-reduced-motion` — gate non-essential Framer Motion animations.
> Note: WCAG AA is the design target. Full conformance still requires manual testing with assistive tech and expert review.

## Performance Standards
- Lighthouse budgets: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95.
- Use `next/image` for all raster assets; set explicit dimensions to avoid layout shift (CLS ≈ 0).
- `next/font` for fonts; no render-blocking external font CSS.
- Minimize client JS: keep Framer Motion and interactivity in leaf client components.
- Lazy-load heavy, below-the-fold, or modal-only content.

## Quality Gates
- `npm run lint` and `tsc --noEmit` must pass clean before a task is marked complete.
- No console errors/warnings in the browser on load.
- Verify responsive behavior at 360px, 768px, and 1280px widths.
