# Design: Interactive Animated Portfolio Landing Page

**Author:** **Allen Jake Lavina** (*Full Stack Developer*)

This document explains **how** the feature proposed in [proposal.md](proposal.md) will be built, in enough detail that a different developer could implement the orbital depth effect correctly without guessing.

> **Superseded in part by [openspecs/changes/002-tech-field-and-full-page-sections](../002-tech-field-and-full-page-sections/design.md).** §§ 8–9 below describe the original single shared-ellipse orbit; after visual review this was redesigned into a multi-trajectory field (distinct per-item center/radius/speed/depth-mode). The rest of this document — portrait treatment, accessibility, reduced motion, asset sourcing — still reflects the current implementation.

## 1. Current Architecture (context)

- React 19 + TypeScript + Vite, `src/App.tsx` → `src/main.tsx`, no router, single page.
- Tailwind CSS v4 via `@tailwindcss/vite`, imported with `@import 'tailwindcss';` in `src/index.css`. No `tailwind.config.js` — v4 config is CSS-first via `@theme`.
- `src/index.css` already defines light/dark CSS custom properties (`--text`, `--bg`, `--accent`, etc.) consumed by `src/App.css`. These are the *starter template's* tokens and are superseded by the palette below for the portfolio itself.
- No component/section/data/hooks/types directories exist yet (confirmed empty repo audit) — this feature creates the first ones.
- No animation library, no portrait asset, no tech-logo assets exist in the repository.

## 2. Tailwind CSS as the Styling System

All layout, spacing, typography, and simple state styling (hover/focus) use Tailwind utility classes, per [ui-ux.md § Styling](../../../.claude/rules/ui-ux.md#styling-tailwind-css). The orbital motion itself is **not** expressible as static utility classes (it needs per-element keyframes and computed offsets), so it is implemented as plain CSS animations — this is exactly the case [ui-ux.md](../../../.claude/rules/ui-ux.md#styling-tailwind-css) carves out for "complex custom animation that's awkward as utilities."

## 3. Global Styles & Tailwind Coexistence

The five-color palette is registered as Tailwind v4 theme tokens using the CSS-first `@theme` directive (the current v4 convention — not a `tailwind.config.js` color extension, which is the legacy v3 approach):

```css
/* conceptual — added to src/index.css, replacing the starter's light/dark tokens */
@theme {
  --color-ink: #000000;
  --color-navy: #0C1821;
  --color-midnight: #1B2A41;
  --color-steel: #324A5F;
  --color-lavender: #CCC9DC;
}
```

This makes `bg-navy`, `text-lavender`, `border-steel`, etc. available as ordinary Tailwind utilities, so the palette is used consistently via utilities rather than scattered hex literals (per [coding-standards.md § Data, config, and magic values](../../../.claude/rules/coding-standards.md)). The portfolio is dark-only by design (the brief calls for a fixed dark/cinematic identity) — the starter's `prefers-color-scheme: dark` light/dark token pair is superseded for portfolio sections, which always render dark. The underlying custom-property mechanism stays the same; only the token *values* and *scope* change. Values beyond the five named colors (e.g., a hover tint) are derived from them (e.g., `color-mix()`, opacity) rather than introducing new unrelated hex values.

## 4. Component Styling Conventions

- Utility classes directly in JSX for layout/spacing/color/typography/simple transitions.
- `clsx`-free: no new dependency for conditional classes at this scale — template literals / ternaries are sufficient given the component count.
- The orbit's per-item CSS (keyframes, custom properties driving radius/phase/duration) lives in one small dedicated CSS file colocated with the orbit component (e.g. `TechOrbit.css`, imported only there), because Tailwind utilities cannot express `@keyframes` or per-element custom-property-driven animation — consistent with the "CSS files are appropriate for complex custom animation" rule.

## 5. Desktop Composition

Two-column grid inside the hero section (`display: grid`, two columns via Tailwind grid utilities, e.g. `grid-cols-2` above a `lg` breakpoint):

- **Left column — Portrait stage:** a roughly square/portrait-ratio stage area containing, back-to-front: an ambient background treatment (subtle radial gradient in `navy`/`midnight`, no hard card edge), the orbit system, and the portrait image centered in the stage.
- **Right column — Identity:** vertically centered stack — name (largest), title, short description paragraph, a primary CTA button + secondary CTA (text link or outline button), optional row of social/contact icons below. All copy is placeholder-marked (see [§ 17](#17-dataconfiguration-approach-for-technology-logos) and content-accuracy note in [proposal.md](proposal.md#content-accuracy-placeholders)).

Above both columns, the nav bar spans full width (see [§ 6](#6-navigation)).

## 6. Navigation

A single restrained top bar: wordmark/name on the left, a horizontal list of provisional nav links on the right (About, Skills, Projects, Experience, Contact — exactly the sections named as "potential" in the brief, no additions invented), optionally a CTA button. Low visual weight (small type, generous spacing, no heavy background) so it doesn't compete with the hero. Links point to in-page anchors (`#about`, `#skills`, etc.) that will resolve once those sections exist in later changes; linking to a *planned* section by its known name is structural scaffolding, not fabricated personal content.

## 7. Portrait Treatment

- Source: a transparent-background (alpha PNG or WebP) cutout photo, subject in a black suit and tie. **Does not exist in the repo yet** — see [§ 16](#16-asset-requirements).
- Rendered as a plain `<img>` (or `<picture>` with WebP+PNG fallback) with **no card chrome** — no background fill, no border, no boxed shadow that reads as a rectangle. It sits directly on the ambient gradient backdrop so the cutout edge is the only visible silhouette.
- A soft, large, low-opacity radial glow (`steel`/`midnight`) is placed behind the portrait (in the same stacking position as the "background" layer in § 9) to ground the figure in the scene without implying a hard edge.
- The portrait sits at a fixed z-index between the orbit's "back" and "front" states (see § 9) — it is the pivot the orbit layers around.

## 8. Orbital Technology System

**This is the signature interaction. Read this section precisely — it is not "icons floating around the portrait."**

❌ **Not this:** logos placed at static positions around the portrait, or logos that spin in place / drift randomly.

✅ **This:** each logo travels along one continuous closed elliptical path centered on the portrait. As it moves along that path, it passes through four conceptual zones each loop:

1. **Back-center** (directly behind the portrait, smallest/dimmest)
2. **Side** (beside the portrait, transitioning)
3. **Front-center** (directly in front of the portrait, largest/brightest)
4. **Side** (beside the portrait, transitioning back)

...and repeats. The logo is the same element moving continuously — it is never teleported or swapped between a "back set" and a "front set" of elements.

## 9. Depth/Layering Behavior

Conceptual stacking order, background to foreground:

```
BACKGROUND (ambient gradient / stage)
    ↓
[dynamic] logos currently in their "back" half of the orbit
    ↓
PORTRAIT (fixed z-index, the pivot)
    ↓
[dynamic] logos currently in their "front" half of the orbit
    ↓
FOREGROUND UI (nav, identity text block — separate stacking context, always on top)
```

The two "[dynamic]" rows are **not** two separate DOM layers holding different logos — they are the *same* orbit layer whose individual logo elements switch z-index at the two points where their path crosses the portrait's left/right silhouette edge. Concretely:

- All orbit items share one `.orbit` container positioned absolutely over the portrait stage, itself a sibling of the portrait `<img>` within a `position: relative` stage wrapper.
- Each logo is an absolutely-positioned child of `.orbit`, animated by one shared `@keyframes orbit` definition (so there is one CSS animation definition, not one per logo — per [coding-standards.md](../../../.claude/rules/coding-standards.md), no duplication).
- The ellipse is expressed as keyframe waypoints on `translate` (wide horizontal amplitude, short vertical amplitude — an ellipse flattened to suggest the orbit is tilted away from the viewer, reinforcing depth) combined with `scale` (smaller at back-center, larger at front-center) and `opacity`/`filter: brightness()` (slightly dimmer at back-center, full brightness at front-center) — all **continuously interpolated**, because `transform`, `opacity`, and `filter` animate smoothly.
- `z-index` is the one property that must change as a **discrete jump**, not a continuous value. This must be a *guaranteed* hard cut, not an assumed one: declare `animation-timing-function: steps(1)` on the keyframe stop immediately before each jump (e.g. the `49%` stop carries `steps(1)`, then `50%` declares the new `z-index`), so the browser holds the old integer value for the entire segment and switches in a single step. Relying on an unguarded narrow percentage gap alone (e.g. just `49%`/`50%` with no explicit `steps()`) is not sufficient — `z-index`'s animation type is `<integer>`, and CSS permits interpolating through intermediate integers across that gap, which could produce a brief visible flicker in some browsers. The jump points sit at the two path positions where the logo's horizontal translate crosses the portrait's left/right visual edge, so the z-index change happens exactly where the logo would otherwise visibly clip through the portrait — this is what sells the "passing behind / in front" illusion rather than an arbitrary jump.
- **The exact crossing threshold is not a fixed, blind geometric assumption.** The portrait is an irregular cutout silhouette (shoulders, head, arms — not a rectangle), so the horizontal position at which a logo should flip from back to front is not necessarily one constant value for every point on the path. The threshold is visually tuned against the actual supplied portrait asset once it exists (§16) — implementation adjusts the jump-point percentages by eye against the real image (and varies them per orbit height if the silhouette's width changes enough to matter), not by assuming a fixed edge in advance of having the asset.
- Each logo gets a distinct **negative `animation-delay`** (e.g. `calc(var(--i) / var(--count) * var(--duration) * -1)`) so every logo plays the *same* shared keyframes but at a different phase offset — this produces N logos evenly distributed around one orbit from a single keyframes block, per-logo offset supplied via a CSS custom property set inline (`style={{ '--i': index }}`), not N separate animations.
- `.orbit` itself does not rotate as a rigid body (that would be simple in-place spinning, explicitly rejected in the brief) — each item follows the elliptical translate path independently via its own phase-shifted animation.

## 10. Animation Behavior

- One continuous, slow, linear-timed loop per logo (`animation-timing-function: linear`, long duration — on the order of 20–40s per full revolution, to read as "premium/cinematic" rather than mechanical).
- No orbit-wide pause/restart jitter — looping is seamless (`animation-iteration-count: infinite`, keyframes start/end states identical).
- No glow trails, no particles, no excessive blur — brightness/scale changes stay subtle (sold by data in § 9, not decoration).

## 11. Hover Interaction (secondary enhancement — not required for v1 acceptance)

On pointer-capable viewports, hovering an individual logo may: pause only that logo's animation (`animation-play-state: paused` on `:hover`/`:focus-visible`), scale it up slightly, and reveal its name via an accessible tooltip (not a `title` attribute alone — a visually-rendered, ARIA-described label) that appears near the logo. This never gates access to the tech names generally — the full list is also available non-interactively (see § 13) — satisfying [ui-ux.md](../../../.claude/rules/ui-ux.md#libraries)'s "hover must never be the only way to access important information."

## 12. Responsive Behavior

Desktop (`lg`+) is the two-column reference composition in § 5. Breakpoints below that are a deliberate redesign, not a shrink:

- **Tablet (~768–1023px):** columns stack — portrait+orbit first (still prominent, slightly reduced stage size), identity block below it, centered text alignment. Orbit keeps most items but reduces radius proportionally to the smaller stage.
- **Mobile (~375–767px):** same stacked order. Orbit item **count is reduced** (e.g., show a subset of the configured list rather than all of them) and the ellipse radius shrinks further so no logo can overlap the identity text below the stage. Nav collapses to a compact bar (wordmark + a single menu affordance) rather than the full link row, to preserve usability and avoid crowding.
- Touch devices get no hover-dependent behavior (§ 11 is desktop-only enhancement; nothing essential depends on hover on any viewport, satisfying the touch-interaction requirement).
- All breakpoint behavior is expressed via Tailwind responsive prefixes (`sm:`/`md:`/`lg:`), per [ui-ux.md § Responsiveness](../../../.claude/rules/ui-ux.md#responsiveness), not ad hoc media queries, except inside the orbit's own CSS file where the keyframe/radius values themselves need breakpoint-specific custom-property overrides.

## 13. Accessibility

- The orbit and portrait stage are decorative relative to page *meaning* — the orbit container is `aria-hidden="true"`; the actual technology list is additionally rendered as a real, visible-or-visually-hidden semantic list (e.g. inside the identity column or immediately after the stage) so screen reader users get the same information non-visually and non-interactively.
- Nav links, CTAs, and any focusable element (including the hover-tooltip trigger in § 11, if implemented) are real `<a>`/`<button>` elements, keyboard-reachable with visible focus states, per [ui-ux.md § Accessibility](../../../.claude/rules/ui-ux.md#accessibility).
- Color contrast between `lavender` text and the `ink`/`navy`/`midnight` backgrounds is checked against WCAG AA for body text sizes before implementation is considered done.
- Portrait `alt` text describes the image meaningfully (not empty — it is the primary content image, unlike the starter's decorative logos).

## 14. Reduced-Motion Behavior

- A single media query, `@media (prefers-reduced-motion: reduce)`, disables the orbit's `animation` entirely (`animation: none`) and instead renders logos at fixed, evenly-spaced static positions around the portrait at their "front" scale/opacity — still visually present, just not moving. This is implemented in the same orbit CSS file, not as a separate component branch, so there is one source of truth for layout math.
- No JavaScript-driven animation loop is introduced anywhere in this feature (see § 8–10 — it's CSS-only), so there is no `requestAnimationFrame` loop that would need a separate cancellation path for reduced motion.
- Reduced motion does not hide or degrade any information — the tech list, portrait, nav, and identity content are all identical to the full-motion version.

## 15. Performance Considerations

- Orbit animations only ever touch `transform`, `opacity`, and `filter` (compositor-friendly, GPU-accelerated); `z-index` changes are free (no layout/paint cost beyond stacking).
- `will-change: transform` is applied to orbit items only (not globally) to hint compositing without over-promoting unrelated elements.
- Orbit item count has a concrete, explicit cap on concurrently *visible/animating* items, independent of how long the configured technology list (§17) grows: **8 items maximum on desktop/tablet (`md` and up), 4 items maximum on mobile**. These are implementation constraints on the orbit's rendering, not a claim about how many technologies the final approved list will contain — if §17's list has more entries than the current viewport's cap, only the first N are rendered in the animated orbit; the full list remains available via the non-visual accessible list (§13) regardless of the orbit's visual cap. The mobile reduction to 4 is deliberate for three reasons together: fewer concurrently animating elements is cheaper on constrained hardware, fewer simultaneous logos stays readable at a smaller stage size, and a sparser orbit keeps the mobile composition visually balanced rather than crowded.
- The portrait image is the likely Largest Contentful Paint element — implementation should size/compress it appropriately (modern format, explicit `width`/`height` to avoid layout shift) — this is an implementation task (§ tasks.md), not a decision needed now.
- No continuous JS animation loop exists (pure CSS), so there's no main-thread tick cost. The core orbit's reduced-motion handling (§14) is pure CSS and needs no JS at all; the only JS this feature may introduce is optional, and only if the hover-tooltip enhancement in §11 is implemented (see §18).

## 16. Asset Requirements

- **Portrait (blocking):** transparent-background PNG or WebP, subject in black suit/tie, high enough resolution for the hero stage. **Not present in the repository.** This is a hard prerequisite — implementation of the portrait/orbit visual composition cannot be completed or meaningfully reviewed without it. It will be added by the user to `src/assets/` (exact filename decided at implementation time); Claude must not generate, fetch, or fabricate a stand-in photo.
- **Technology logo icons:** simple, license-appropriate SVG marks for whatever technologies end up approved (GitHub, Tailwind CSS, Python, C++, React, TypeScript, JavaScript are the brief's *illustrative* examples only). These are small vector marks, not photos — sourced as plain SVG files added under `src/assets/tech/` at implementation time once the real list is approved. No icon package dependency is assumed; if a suitable icon set would meaningfully reduce bespoke SVG sourcing, that is a dependency decision to raise explicitly at implementation time (per [architecture.md § Dependency policy](../../../.claude/rules/architecture.md#dependency-policy)), not a default.

## 17. Data/Configuration Approach for Technology Logos

The tech list is a typed, swappable data module — never hardcoded into the orbit component — so it can change without touching layout/animation code:

```ts
// conceptual shape — src/data/techStack.ts (created at implementation time)
export interface TechStackItem {
  id: string          // stable key, e.g. "react"
  name: string        // accessible label, e.g. "React"
  icon: string         // import path / component for the SVG mark
}

// NOTE: placeholder list only — not confirmed as Allen Jake Lavina's actual
// skill set. Must be reviewed/approved before being presented as fact.
export const techStack: TechStackItem[] = [ /* ... */ ]
```

`name` doubles as the accessible label used in both the hover tooltip (§ 11) and the non-visual list (§ 13). The list's order and length directly drive the per-item phase offset (`--i`) described in § 9, so adding/removing an entry re-distributes the orbit automatically rather than requiring manual position edits.

## 18. Component/Architecture Considerations

Applying [architecture.md](../../../.claude/rules/architecture.md) directly — components used by exactly one section stay colocated with that section, promoted to `components/` only on a genuine second consumer:

```
src/
├── sections/
│   ├── NavBar.tsx                 — top navigation (single current consumer: the page itself)
│   └── Hero/
│       ├── Hero.tsx               — two-column layout, composes the pieces below
│       ├── Portrait.tsx           — portrait image + ambient glow (Hero-only)
│       ├── TechOrbit.tsx          — orbit layer, maps over techStack
│       ├── TechOrbit.css          — shared @keyframes + reduced-motion override (see § 9, § 14)
│       └── IdentityPanel.tsx      — name/title/description/CTAs (Hero-only)
├── data/
│   └── techStack.ts               — § 17
├── hooks/
│   └── usePrefersReducedMotion.ts — created only if/when the hover-tooltip enhancement (§ 11) is implemented in the same pass; it has no other consumer, since the core orbit's reduced-motion handling (§ 14) is pure CSS and needs no JS. Do not create this hook ahead of § 11 — an unused hook is dead code per [coding-standards.md](../../../.claude/rules/coding-standards.md).
├── types/
│   └── techStack.ts               — only if `TechStackItem` ends up needed outside data/techStack.ts; otherwise keep the type colocated there per coding-standards.md
```

`NavBar` is kept at `sections/` top level rather than `layouts/`, because [architecture.md](../../../.claude/rules/architecture.md) explicitly says `layouts/` stays empty until the site has multiple page shells — this is still a single page. If a second page/layout need ever arises, promoting `NavBar` is a later, separate decision. No new top-level folders are introduced; `App.tsx` is updated only to render `NavBar` + `Hero` in place of the starter markup.

## 19. Testing Strategy

No test framework is installed ([testing.md](../../../.claude/rules/testing.md) confirms this is current and intentional — not assumed). For this feature:

- `pnpm lint` and `pnpm build` must pass (existing scripts).
- Manual browser verification via `pnpm dev`, per [ui-ux.md § Verification](../../../.claude/rules/ui-ux.md#verification): golden path, keyboard navigation (tab through nav/CTAs), at least one mobile-width viewport, and an explicit check with `prefers-reduced-motion: reduce` emulated in DevTools.
- Manual contrast check for `lavender`-on-dark text combinations.
- If, during implementation, orbit phase/position math grows into non-trivial pure functions worth regression-testing in isolation, adding Vitest is a dependency decision to raise explicitly at that time (per [architecture.md § Dependency policy](../../../.claude/rules/architecture.md#dependency-policy)) — not assumed here.

## 20. Acceptance Criteria

1. Nav bar, portrait stage, and identity panel render in the two-column desktop composition described in § 5.
2. The portrait renders with no rectangular card chrome — transparent background, ambient glow backdrop.
3. Technology logos animate continuously along an elliptical path and visibly cross from behind the portrait to in front of it (and back) within a single loop — verified by inspecting that z-index changes at the documented path positions, not by two static logo sets.
4. No orbit item merely spins in place or floats with no path.
5. With `prefers-reduced-motion: reduce` active, the orbit shows a static arrangement with zero animation, and no content is lost.
6. All technology names are available to screen readers independent of hover.
7. Layout adapts deliberately at tablet and mobile per § 12 — no logo overlaps/clips identity text at any tested breakpoint, nav remains usable.
8. All copy (name, title, description, CTAs, social links) and the technology list are visibly placeholder/configurable, not presented as confirmed fact.
9. No new dependency appears in `package.json` beyond what was already approved (Tailwind).
10. `pnpm lint` and `pnpm build` pass with no new errors.
11. The portrait asset prerequisite (§ 16) is either satisfied before this is marked done, or the implementation explicitly stops at that blocker and reports it rather than faking a placeholder photo.
