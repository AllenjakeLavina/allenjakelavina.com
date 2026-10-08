# Design: Multi-Trajectory Technology Field & Full Page Sections

**Author:** **Allen Jake Lavina** (*Full Stack Developer*)

## 1. Multi-Trajectory Field (replaces OpenSpec 001 design.md §§ 8–9)

The single shared ellipse is gone. Every field item still shares **one** `@keyframes` definition (`tech-field-orbit` in `TechField.css`) — no per-item duplication — but each item now supplies its own center offset, radius, duration, phase, scale/brightness range, and depth role via CSS custom properties set inline from `src/data/heroField.ts`. The path shape itself (12 waypoints approximating an ellipse, same trig constants as before) is universal; everything that makes one item look different from another is a custom property, not a different keyframes block.

## 2. Depth Roles (generalizing OpenSpec 001's crossing mechanism)

Three `depthMode` values, each just a different pair of `--z-a`/`--z-b` custom properties on the same shared animation:

- `crossing` — `--z-a: 5` (behind, upper half of the item's own loop), `--z-b: 15` (in front, lower half). Identical mechanism to OpenSpec 001: the flip happens at the 25%/75% waypoints using a tight 24.9%→25% (and 74.9%→75%) `steps(1)` segment, guaranteeing a hard cut.
- `back` — `--z-a` and `--z-b` both `5`. The item always renders behind the portrait; it still "breathes" (scale/brightness still vary with its own path position) but never crosses in front.
- `front` — both `15`. Always in front, same breathing motion.

Mixing all three across the 10-item field (4 crossing, 3 back, 3 front) is what gives the scene visible depth variety without every item needing the full crossing math — a field where some things are clearly behind, some clearly in front, and some dynamically swap, which reads as richer than a single rule applied uniformly.

## 3. Controlled Randomness, Not `Math.random()`

Every item's geometry (`centerX/Y`, `radiusX/Y`, `durationSeconds`, `phase`, scale/brightness range) is a **hand-authored constant** in `heroField.ts` — fixed at write time, identical on every render and every page load. This satisfies the brief's "controlled randomness... deterministic configuration" requirement directly: the field looks organic because the chosen values are deliberately varied, not because anything is computed from `Math.random()` or any other non-deterministic source.

## 4. Face Protection (how clutter near the portrait's face is avoided)

The portrait's face sits in the upper portion of the stage; items only render at `front` depth during the **lower** half of their own loop (where the shared keyframes' y-translate is positive). Concretely:

- `crossing` items only reach front-depth near the bottom of their ellipse (torso/suit height) — by construction, never near the top (face height). Near the top they're at back-depth, i.e., rendered *underneath* the portrait image, so the face is never obscured even when an item's raw coordinates pass near it.
- `front`-mode ambient items (Java, AWS) are centered well to the side (`centerX: -14cqw` / `10cqw`) with small radii, so their whole loop stays clear of the face's horizontal position.
- `back`-mode ambient items (Python, PostgreSQL, Vue.js) are allowed near the face geometrically, but since they're always behind the portrait, they're occluded there, never visible over it.

No special-case "avoid the face" logic was needed — it falls out of the depth-mode design itself.

## 5. Omitted: Per-Item Rotation

The brief's example schema included a `rotation` field (diagonal ellipses). This was deliberately not implemented: adding arbitrary per-item ellipse rotation inside the shared keyframes requires rewriting every one of the 12 waypoints as a two-term rotation-matrix `calc()` (mixing both radius axes at each stop), which is a large jump in CSS complexity for a visual effect that varying center/radius/speed already mostly achieves (breaking the "one circle" perception was the actual complaint). If the user's visual review still wants more variety after seeing this, rotation is a bounded, well-understood follow-up — not implemented here to keep the CSS maintainable per [coding-standards.md](../../../.claude/rules/coding-standards.md)'s anti-over-engineering guidance.

## 6. Expanded Technology Pool

`src/data/techStack.ts` now exports `skills: SkillItem[]` — the complete resume-supported set, organized into six categories (Frontend Development, Backend Development, Databases, Tools & Platforms, Hardware & Embedded, Networking), each item optionally carrying a local SVG `icon` where a recognizable official mark exists. Concepts with no official mark (PC Assembly & Maintenance, Desktops & Laptops, Routers, Switches, Cabling, Wi-Fi Setup) have no `icon` field and render as plain text chips in the Skills section — never a fabricated logo.

`src/data/heroField.ts` is a separate, smaller, curated subset (10 items) specifically for the hero animation, referencing its own icon imports. It does not redefine the skill set — the Skills section is the source of truth for "everything"; the hero field is a deliberately restrained "selection from it," per the brief's own framing.

## 7. Page Structure & Navigation

The former single-purpose `Hero` section is now `id="about"` (the brief's "About acts as the homepage"). `App.tsx` renders `NavBar`, then `About`(`Hero`)/`Skills`/`Projects`/`Experience`/`Contact` in document order as a normal scrollable page — no router, no new dependency, consistent with [architecture.md](../../../.claude/rules/architecture.md)'s guidance that `pages/`/`layouts/` stay empty until the site actually needs multiple routes (it still doesn't; this is one page with five anchor-addressable sections). `NavBar`'s links already pointed at `#about`/`#skills`/`#projects`/`#experience`/`#contact` from OpenSpec 001's original implementation — only the wordmark's own link needed updating from the old `#home` to `#about`. The nav bar is now `sticky` with a translucent backdrop, since it needs to stay usable while scrolling a multi-section page (not needed when the page was hero-only).

## 8. Visual/Atmosphere Revision

Addressing the "too black and empty" feedback: the page root background is now a radial gradient blending `midnight` → `navy` → `ink` (top-weighted), rather than flat `ink`. The Hero section adds its own large, very low-opacity `steel`-tinted radial accent behind the whole two-column composition (not just directly behind the portrait), giving the impression of an "environment" rather than a single glow. The portrait itself was also sized up slightly (`max-w-md/lg/xl` instead of `sm/md/lg`) for more visual weight, per the "portrait scale/composition" note.

## 9. Content Accuracy — Skills/Projects/Experience/Contact

Per [documentation.md § Content Accuracy](../../../.claude/rules/documentation.md#content-accuracy): the skill categories, project names/taglines, and experience titles/organizations/dates are used exactly as the user supplied them in this request (resume-supported, not invented). No descriptions, tech stacks, responsibilities, achievements, or contact channel were invented to fill gaps — each remaining gap is a visible `TODO:` placeholder in the rendered page, not silently omitted or guessed at.

## 10. Accessibility & Contrast

While reviewing this revision, every new text/background color combination was checked with computed WCAG contrast ratios (not assumed) against the new gradient background's lightest stop (`midnight`, the worst case). Two real defects were found and fixed: `text-steel` reintroduced in the Skills category headings (2.28:1, fails AA) and `text-lavender/50` used twice for secondary copy in Projects/Experience (3.36:1 against `midnight`, fails AA) — both replaced with `text-lavender/65` (4.66:1 against `midnight`, passes AA). The field itself remains `aria-hidden`; the hero's own accessible tech list was updated to read from `heroField` (what's actually animating) rather than the old flat tech list, since `techStack.ts` was restructured into the categorized skills pool.

## 11. Performance

Unchanged in kind from OpenSpec 001: CSS-only (`transform`/`opacity`/`filter`/`z-index`), no JavaScript animation loop, `will-change` scoped to field items only. The field item count (10 desktop/tablet, 5 mobile) is slightly larger than OpenSpec 001's 8/4, within the same order of magnitude — no meaningful performance regression expected, though this was not benchmarked live (no browser tool available).

## Acceptance Criteria

1. No single uniform ring is visually implied by the per-item configuration (verified by code review of the per-item center/radius values — not live visual testing, see [tasks.md](tasks.md)).
2. At least one item of each depth mode (`crossing`, `back`, `front`) exists in both the desktop/tablet and mobile-visible subsets.
3. The portrait's face coordinates are never reachable at front-depth by any item (verified by the geometric argument in § 4, not live testing).
4. Skills/Projects/Experience/Contact render with only resume-supplied facts, remaining gaps marked `TODO:`.
5. No new dependency in `package.json`.
6. `pnpm lint` and `pnpm build` pass.
7. All new text/background contrast combinations pass WCAG AA against the gradient's lightest stop.
