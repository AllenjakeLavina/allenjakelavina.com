# Proposal: Interactive Animated Portfolio Landing Page

**Author:** **Allen Jake Lavina** (*Full Stack Developer*)

**Status:** Proposed — not yet approved, not yet implemented.

## 1. Problem / Motivation

The repository currently ships the unmodified Vite + React + TypeScript starter page (`src/App.tsx`) plus the project governance established in prior work (Tailwind CSS v4 wired in, but no portfolio content). There is no portfolio content, no visual identity, and no first impression for a visitor. This is the first real feature: a landing page whose hero section establishes the site's visual identity and gives it a distinctive, memorable first impression rather than a generic template look.

## 2. Feature Goals

- Establish a dark, premium, developer-focused visual identity using a fixed 5-color palette (`#000000`, `#0C1821`, `#1B2A41`, `#324A5F`, `#CCC9DC`).
- Build a hero section with the person's portrait as the visual centerpiece on the left and identity/intro content on the right.
- Ship the signature interaction: technology logos that travel along a continuous orbital path around the portrait, passing behind and in front of it to create a 3D depth illusion (not static floating icons, not simple in-place spinning).
- Add a restrained top navigation bar.
- Make the whole composition responsive (mobile → large desktop) with a deliberate, non-trivial mobile strategy.
- Respect accessibility and `prefers-reduced-motion` from the start.
- Do this using the existing stack (React + TypeScript + Tailwind CSS + native CSS/browser animation) without adding a new dependency unless proven necessary.

## 3. Non-Goals (this change)

- Not building About, Skills, Projects, Experience, or Contact section content — only navigation entries that point toward them.
- Not writing or finalizing Allen Jake Lavina's actual bio, job history, skills list, education, certifications, or social links — see [Content Accuracy](#content-accuracy-placeholders) below.
- Not finalizing the real technology list for the orbit — it ships as configurable placeholder data.
- Not installing any dependency (Tailwind is already installed from a prior change; nothing new is installed here or in the eventual implementation unless this proposal is amended and re-approved).
- Not implementing anything in this phase — this document set defines the change; implementation happens only after explicit approval (see [tasks.md](tasks.md)).

## 4. User Experience

A visitor lands on a dark, cinematic hero: a restrained nav bar at top, the person's portrait standing naturally within the composition on the left with technology logos orbiting around them (some passing behind, some in front, continuously and slowly), and identity/intro content with calls-to-action on the right. The experience reads as professional and intentional, not flashy — motion is slow, continuous, and purposeful, and degrades gracefully to a static/near-static presentation for users who prefer reduced motion or on constrained viewports.

## 5. Desktop Composition (summary)

Two-column hero: left column = portrait + orbital technology system; right column = name, title, short description, primary/secondary CTA, optional social links. Full detail in [design.md](design.md#5-desktop-composition).

## Content Accuracy (placeholders)

Per [documentation.md](../../../.claude/rules/documentation.md#content-accuracy), none of the following are known/confirmed and must ship as explicit placeholders, never invented facts:

- Name / title / short description copy
- Technology list for the orbit (the examples in this proposal — GitHub, Tailwind CSS, Python, C++, React, TypeScript, JavaScript — are illustrative only, not a confirmed skills list)
- CTA destinations and labels
- Social/contact links
- The portrait image itself (does not exist in the repository yet — see [design.md § Asset Requirements](design.md#16-asset-requirements))

## Scope

**Affected files (future implementation, not this phase):** new files under `src/sections/`, `src/data/`, `src/hooks/`, `src/types/` as detailed in [design.md § Component/Architecture](design.md#18-componentarchitecture-considerations); `src/index.css` (Tailwind `@theme` tokens for the palette); `src/App.tsx` (mounts the new hero + nav instead of starter markup). No existing files are touched by this documentation-only phase.

**Out of scope for this proposal:** anything listed under Non-Goals above.

## Risks

- **Depth illusion complexity:** achieving convincing behind/in-front layering without a 3D/animation library is the hardest technical part of this feature. Mitigated by the explicit z-index-crossing technique documented in [design.md § Depth/Layering Behavior](design.md#9-depthlayering-behavior); if that proves visually insufficient during implementation, the dependency decision gets revisited explicitly (not silently).
- **Performance on low-end/mobile devices:** many simultaneously animating elements can jank. Mitigated by the performance strategy in [design.md § Performance Considerations](design.md#15-performance-considerations) and the reduced orbit complexity on small viewports.
- **Placeholder content shipping as if real:** mitigated by the explicit placeholder marking required throughout and the acceptance criteria in [design.md § Acceptance Criteria](design.md#20-acceptance-criteria).
- **Missing portrait asset blocks visual completion:** the portrait must be supplied before the hero can be finished end-to-end; documented as a prerequisite, not faked.

## Acceptance Criteria

See [design.md § 20](design.md#20-acceptance-criteria) for the full, testable list.
