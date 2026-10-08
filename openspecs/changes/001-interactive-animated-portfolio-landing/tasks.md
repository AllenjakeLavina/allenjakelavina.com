# Tasks: Interactive Animated Portfolio Landing Page

**Author:** **Allen Jake Lavina** (*Full Stack Developer*)

> **Status: implemented 2026-10-08**, pending the manual browser verification noted in § 10 and the deferred hover enhancement in § 9. The checkboxes below reflect what was actually done, verified against the working tree and the checks run — not the original future-tense plan.

## 0. Prerequisites (blocking)

- [x] Portrait asset supplied: `src/assets/portrait/allen-portrait.png`. Verified by direct PNG alpha-channel inspection (not just trusting the file extension) — background is genuinely transparent (alpha 0 at all corners/edges), subject opaque. Silhouette width measured at 10 vertical positions to tune the orbit's crossing threshold against the real image (design.md § 9).
- [x] Technology list approved explicitly for the hero: React, TypeScript, Python, Node.js, FastAPI, PostgreSQL, MongoDB, GitHub (exactly 8, matching the design's desktop/tablet cap — see § 5 below).
- [x] Name/title approved for use (the real name, and the "Full Stack Developer" title already established as the user's own designation throughout this project's OpenSpec authorship). Description, CTA destinations, and social links are not yet provided — proceeding with visible placeholders is the explicitly authorized path (see § 6).

## 1. Foundation

- [x] Added the five-color palette as Tailwind v4 `@theme` tokens in `src/index.css` (design.md § 3). Removed the starter template's now-unused light/dark tokens and demo-specific rules (`#root` fixed width, `.counter`, `code`, `h1`/`h2`) since nothing in the new implementation references them.
- [x] Portrait filename confirmed as supplied: `allen-portrait.png`, used as-is, no regeneration.

## 2. Data & Types

- [x] Created `src/data/techStack.ts` — typed, with the 8 approved entries. `icon` is a Vite-resolved URL string per design.md § 17's own stub ("import path"), not inline path data — see § 15 below for how the icon assets themselves were sourced.

## 3. Navigation

- [x] Created `src/sections/NavBar.tsx` — wordmark + the five provisional links (About/Skills/Projects/Experience/Contact), plus a working keyboard-accessible mobile disclosure toggle (`aria-expanded`/`aria-controls`) per design.md § 12's "wordmark + single menu affordance."

## 4. Hero — Portrait & Stage

- [x] Created `src/sections/Hero/Portrait.tsx` — portrait rendered with no card chrome, ambient radial-gradient glow behind it, no background/effects baked into the image itself.

## 5. Hero — Orbital Technology System

- [x] Created `src/sections/Hero/TechOrbit.tsx` + `TechOrbit.css`: one shared `@keyframes` definition, 12 waypoints approximating the ellipse, negative per-item `animation-delay` for phase distribution, `z-index` crossing at the 25%/75% side points with `animation-timing-function: steps(1)` on a tight pre-jump stop (design.md § 9) — not a narrow-gap-only guess.
- [x] Implemented the `prefers-reduced-motion` static fallback in the same CSS file, using `offset-path`/`offset-distance` for even static spacing, all items at "front" depth so nothing is occluded (design.md § 14).
- [x] Implemented the responsive cap: all 8 items visible/animating from `md` up, first 4 visible on mobile (`hidden md:block` on the rest) — matches design.md § 15's revised concrete numbers exactly.

## 6. Hero — Identity Panel

- [x] Created `src/sections/Hero/IdentityPanel.tsx`. Name and title shown (see § 0). Description is an explicit visible `TODO:` placeholder, not invented copy. CTAs use generic, non-fabricated labels ("View My Work" → `#projects`, "Get In Touch" → `#contact`). **Social/contact links are omitted entirely**, not placeholder-linked, since none were provided and inventing even placeholder hrefs risked implying false destinations.

## 7. Hero — Composition

- [x] Created `src/sections/Hero/Hero.tsx` — two-column `lg:grid-cols-2` (portrait left, identity right), single-column stacked below `lg`.
- [x] Updated `src/App.tsx` to render `NavBar` + `Hero`; removed the starter's now-orphaned `App.css` and demo assets (`hero.png`, `react.svg`, `vite.svg`, `public/icons.svg`) since nothing imports them anymore.

## 8. Accessibility Pass

- [x] `aria-hidden="true"` on the orbit container; the full technology list is additionally rendered as a plain, always-visible `<ul>` in the identity panel (design.md § 13).
- [x] Verified via code review: nav links, mobile toggle, and both CTAs are native `<a>`/`<button>` elements with `focus-visible:outline` — keyboard-reachable by construction. **Not verified with an actual keyboard/screen reader in a running browser** — see § 10.
- [x] Computed real WCAG contrast ratios (not assumed) for every text/background combination in use. Caught and fixed a genuine defect: `text-steel` on the `ink` background measured 2.28:1 (fails AA's 4.5:1) for the title and tech-list text — replaced with `text-lavender/65` (5.62:1, passes AA) in both places. Final ratios: lavender on ink 12.96:1, lavender/80 on ink 8.27:1, lavender/70 on ink 6.42:1, lavender/65 on ink 5.62:1 — all pass AA, most pass AAA.
- [x] Portrait `alt="Portrait of Allen Jake Lavina"`; orbit icons `alt=""` (correctly decorative, redundant with the container's `aria-hidden`).

## 9. Hover Enhancement (secondary — deferred)

- [ ] Not implemented in this pass — deliberately deferred as the spec allows ("secondary enhancement," "may be deferred"). `src/hooks/usePrefersReducedMotion.ts` was correspondingly **not created**, exactly per the design.md § 18 / tasks.md § 9 revision (no orphaned hook).
- [ ] Per-logo hover/focus (pause, scale, name tooltip) — deferred alongside the hook above.

## 10. Testing & Verification

- [x] `pnpm lint` passes (0 errors, re-verified after the contrast fix).
- [x] `pnpm build` passes (`tsc -b && vite build`, re-verified after the contrast fix).
- [ ] **Manual browser pass NOT performed.** No browser/screenshot tool was available in this environment (searched for one; none found). What *was* done instead: started `pnpm dev` and confirmed via `curl` that the server boots cleanly and every new module (`App.tsx`, `index.css`, `techStack.ts`, `TechOrbit.css`, the portrait asset) serves HTTP 200 with no transform errors in the dev server log — this confirms the code compiles and serves, not that it renders or animates correctly. **The user should open `pnpm dev` and visually confirm** the golden path, keyboard nav, a mobile-width viewport, and `prefers-reduced-motion: reduce` emulation before considering this fully verified.
- [x] Manual contrast check — see § 8 above (performed with actual computed WCAG ratios, not estimated).
- [x] `git diff --check` — clean (exit 0; only pre-existing LF/CRLF notices, not errors).

## 11. Documentation Sync

- [x] No deviation from `design.md` required a design-doc update — the orbit mechanics, z-index crossing, responsive caps, and reduced-motion behavior were all implemented exactly as specified. One concretization worth noting, not a deviation: § 17's `icon: string` is realized as a Vite asset-URL import of a local, recolored SVG file rather than inline path data — both are literally "a string," and this was always one of the stub's own described options.

## Explicitly Deferred / Not Part of This Change

- About, Skills, Projects, Experience, Contact section content.
- Finalizing the real technology list or real bio copy (tracked as prerequisites above, not implementation tasks).
- Any animation library — only to be revisited if the CSS-only depth technique in design.md §§ 8–10 proves visually insufficient during implementation, and only with explicit approval of an amended proposal.
