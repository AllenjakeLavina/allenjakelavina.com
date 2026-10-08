# Proposal: Multi-Trajectory Technology Field & Full Page Sections

**Author:** **Allen Jake Lavina** (*Full Stack Developer*)

**Status:** Implemented 2026-10-08, directly on explicit user instruction (this document is written retrospectively to keep the record accurate — see [documentation.md](../../../.claude/rules/documentation.md)).

## Problem / Motivation

After reviewing the OpenSpec 001 implementation, the user asked for two changes that both exceed OpenSpec 001's own stated scope:

1. The hero's technology animation read as "one obvious circle" of evenly-spaced logos — not the intended organic, spatially-distributed field.
2. The site needed its remaining sections (Skills, Projects, Experience, Contact) built out, which OpenSpec 001 explicitly listed as **non-goals**.

Per [documentation.md](../../../.claude/rules/documentation.md), a change that exceeds a prior OpenSpec's stated non-goals is meaningful and gets its own record rather than silently expanding 001.

## Feature Goals

- Replace the single shared ellipse with a multi-trajectory field: distinct per-item center, radius, speed, phase, and depth role, so the eye perceives scattered motion rather than one ring.
- Preserve the core depth illusion (logos passing behind/in front of the portrait) as a deliberate mix across the field, not a single universal rule.
- Expand the hero's technology pool to reflect the full resume, while keeping the hero itself restrained (a curated subset, not all marks at once).
- Build About (the renamed hero)/Skills/Projects/Experience/Contact as a single scrollable page with working navigation.
- Make the whole page read as less flat/empty by increasing the presence of the navy/midnight/steel palette across the page background, not just directly behind the portrait.
- Add no new dependency and keep the mechanism CSS-first, per the standing architecture policy.

## Non-Goals

- Per-item ellipse rotation (diagonal trajectories) — omitted as unneeded complexity; varying center offset, radius, speed, and phase already breaks the "one circle" perception. Documented as a straightforward future addition if requested after visual review.
- Finalizing real copy for the About description, project details, experience responsibilities, or contact channel — all remain explicit placeholders (see Content Accuracy below).
- A contact form, CMS, backend, authentication, or analytics — not requested and not added.

## Content Accuracy

The technology pool (Skills section) and the Projects/Experience entries are **directly supplied by the user in this request as resume-supported fact**, not invented — used verbatim (exact titles, organizations, and date ranges for Experience; exact names and one-line taglines for Projects). Anything not supplied (About's description, project details/links, experience responsibilities, contact channel) remains a visible `TODO:` placeholder, never invented.

## Scope

**Affected:** `src/sections/Hero/{Portrait,Hero,IdentityPanel}.tsx`, renamed `TechOrbit.{tsx,css}` → `TechField.{tsx,css}`, new `src/data/heroField.ts`, restructured `src/data/techStack.ts` (now the full categorized skills pool), new `src/sections/{Skills,Projects,Experience,Contact}.tsx`, `src/sections/NavBar.tsx` (wordmark link), `src/App.tsx` (full page composition + background), 16 new local SVG logo assets under `src/assets/tech/`.

**Superseded:** OpenSpec 001's design.md §§ 8–9 description of a single shared ellipse is superseded by this document's design — see [design.md](design.md).

## Risks

- **No live browser verification was possible** (no browser/screenshot tool available in this environment) — see [tasks.md](tasks.md) for what was actually checked vs. not.
- The chosen hero-field item count (10, 5 on mobile) and the specific per-item geometry are a first-pass, reasoned estimate, explicitly not validated by live visual testing as the user's brief asked for — flagged for the user's own visual review.
