# Tasks: Multi-Trajectory Technology Field & Full Page Sections

**Author:** **Allen Jake Lavina** (*Full Stack Developer*)

> **Status: implemented 2026-10-08.** Written retrospectively — the user's request directly authorized implementation in the same message, so there was no separate pre-approval phase. Checkboxes reflect what was actually done and verified.

## 1. Technology Field Redesign

- [x] Renamed `TechOrbit.{tsx,css}` → `TechField.{tsx,css}` to reflect the new multi-trajectory behavior.
- [x] Rewrote `TechField.css`: one shared `@keyframes`, per-item center/radius/duration/phase/scale/brightness driven by custom properties, `--z-a`/`--z-b` depth-mode pairing (crossing/back/front), `steps(1)` crossing preserved for `crossing`-mode items.
- [x] Created `src/data/heroField.ts`: 10 hand-authored, fixed (non-random) field items with distinct geometry, speed, phase, and depth mode.
- [x] Updated reduced-motion fallback to use each item's own center/radius via `offset-path` (not one shared ring).
- [x] Mobile cap: 5 of 10 items marked `visibleOnMobile`, covering all three depth modes.

## 2. Expanded Technology Pool

- [x] Fetched 16 additional real logo marks (HTML5, CSS3, AngularJS, Svelte, Vue.js, Flutter, Java, PHP, C#, MySQL, AWS, Render, Vercel, Arduino, Raspberry Pi, Git) from simple-icons (CC0), recolored to the `lavender` token, saved to `src/assets/tech/` — same process as OpenSpec 001's original 8, no new dependency.
- [x] Restructured `src/data/techStack.ts` into `skills: SkillItem[]`, categorized, with `icon` omitted for the 6 concepts with no recognizable mark (not fabricated).

## 3. Full Page Sections

- [x] Renamed the hero section to `id="about"`; updated `NavBar`'s wordmark link from the stale `#home` to `#about`.
- [x] Created `src/sections/Skills.tsx` — all 6 categories, icon where available, text-only chip otherwise.
- [x] Created `src/sections/Projects.tsx` — ServiceLink and WisewaysVA, exact names/taglines as supplied, `TODO:` placeholder for description/stack/links.
- [x] Created `src/sections/Experience.tsx` — both internships, exact titles/organizations/dates as supplied, no invented responsibilities.
- [x] Created `src/sections/Contact.tsx` — no address/phone, `TODO:` placeholder for a real contact channel (none was supplied).
- [x] Updated `src/App.tsx` to compose all five sections in order; nav bar made `sticky` for usability on the now-scrollable page.

## 4. Visual/Atmosphere Revision

- [x] Page background changed from flat `bg-ink` to a `midnight → navy → ink` radial gradient.
- [x] Added a large, low-opacity `steel`-tinted atmospheric accent behind the whole Hero composition (not just the portrait).
- [x] Increased portrait max-width one step up at each breakpoint for more visual presence.

## 5. Accessibility & Verification

- [x] Computed real WCAG contrast ratios against the new gradient's lightest stop (`midnight`), not assumed. Found and fixed two regressions: `text-steel` reintroduced in Skills category headings, and `text-lavender/50` in Projects/Experience secondary text — both corrected to `text-lavender/65`.
- [x] `pnpm lint` passes.
- [x] `pnpm build` passes.
- [x] No `pnpm test` script exists ([testing.md](../../../.claude/rules/testing.md) — confirmed current, not assumed).
- [x] `git diff --check` — clean.
- [ ] **Manual browser verification NOT performed** — no browser/screenshot tool is available in this environment (searched for one, none found). What was done instead: started `pnpm dev` and confirmed every new/changed module serves HTTP 200 with no transform errors — this confirms the code compiles and serves, not that the field visually reads as "scattered, not a circle," that depth crossings look convincing, or that the page scrolls/looks right. **The user should open `pnpm dev` and visually confirm** the field distribution, depth illusion, face clearance, scroll behavior across all five sections, mobile behavior, and reduced-motion behavior before treating this as fully verified. The specific field-item count and per-item geometry chosen here are a reasoned first pass, explicitly not tuned by live visual testing as the brief asked for — expect to adjust after seeing it rendered.
- [x] Confirmed no new dependency: `package.json`/`pnpm-lock.yaml` diff unchanged from the prior approved Tailwind-installation phase.
- [x] Confirmed no fabricated content: all Skills/Projects/Experience facts trace directly to what the user supplied in this request; every gap is a visible `TODO:`.

## Explicitly Deferred

- Per-item ellipse rotation (diagonal trajectories) — see design.md § 5 for why.
- Hover enhancement and `usePrefersReducedMotion.ts` — still deferred from OpenSpec 001, unaffected by this change.
- Finalizing About's description, Projects' details/links, Experience's responsibilities, and a real Contact channel — all remain `TODO:` pending user-supplied content.
