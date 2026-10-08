# Coding Standards

## Goal

Clean + understandable + maintainable. Not complex + over-abstracted. If you're reaching for a pattern (context, generic wrapper, factory, config-driven abstraction) and can't point to the concrete second use case it serves today, write the plain version instead.

## TypeScript

- TypeScript-first: no `.js`/`.jsx` files in `src/`, no new untyped code.
- Avoid `any`; prefer precise types or `unknown` with narrowing.
- Shared shapes used by more than one file go in `src/types/`; a type used by only one file can stay local to it.
- Props interfaces are named `<Component>Props`.

## Components

- Small and focused: a component should do one thing (render one piece of UI). If a component mixes data-fetching, layout, and presentation, split it.
- Meaningful names: `ProjectCard`, not `Card2` or `MyComponent`.
- Extract a shared component only when at least two real call sites need the same behavior — not in anticipation of a third.
- No giant monolithic components. If a section file grows to handle many unrelated sub-concerns, split by responsibility (e.g. a `Projects` section composing a `ProjectCard` component and a `useProjects` hook), not by arbitrary line count.

## Data, config, and magic values

- Hardcoded strings/numbers that mean something (breakpoints, social links, email addresses, repeated class names) belong in a constant or `src/data/`, not scattered inline.
- Static portfolio content (project list, skills, experience entries) lives in `src/data/` as typed data, not hardcoded inside JSX.

## Hygiene

- No dead code: don't leave unused components, functions, exports, or variables "just in case."
- No commented-out code. If it's not needed, delete it (git history keeps it, if ever needed).
- No unnecessary inline `style={{ ... }}` — use CSS classes/modules unless the value is genuinely dynamic/runtime-computed.
- No unrelated formatting churn in a diff — don't reformat files you didn't otherwise need to touch.

## HTML & CSS

- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<button>`, `<a>`) over generic `<div>`/`<span>` with click handlers.
- Use Tailwind utility classes for normal component/layout styling — it's the project's primary styling system. See [ui-ux.md](ui-ux.md#styling-tailwind-css) for the detailed Tailwind conventions (when to extract a component, when a plain CSS file is still appropriate, arbitrary-value policy).
- Prefer the CSS custom properties (tokens) already defined in `src/index.css` over new one-off hex values when writing plain CSS.

## Formatting

- Follow the existing ESLint configuration ([eslint.config.js](../../eslint.config.js)); run `pnpm lint` before considering a change done.
- Match the formatting conventions already present in the file you're editing (quote style, semicolons, indentation) rather than introducing a new style mid-file.
