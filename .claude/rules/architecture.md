# Architecture

## Directory responsibilities

Only create a directory when you have a file that actually belongs in it. An empty folder that mirrors this list but holds nothing is clutter, not structure.

```
src/
├── assets/      local images, fonts, and other imported binary/static assets
├── components/  small, reusable, presentational UI building blocks
├── data/        structured static content (e.g. project lists, skills, links)
├── hooks/       reusable React hooks (use* functions with no section-specific logic)
├── layouts/     reusable page shells (e.g. a layout wrapping header/footer/content)
├── lib/         framework-independent utilities and helpers (pure functions)
├── pages/       route-level components (used once React Router or similar is introduced)
├── sections/    major portfolio sections: Hero, About, Skills, Experience, Projects, Contact
├── styles/      global CSS that isn't Tailwind utilities (design tokens, resets, complex custom animation) — currently just `src/index.css`; don't add a `styles/tailwind/` or similar Tailwind-specific subfolder
├── types/       shared TypeScript types/interfaces used across more than one file
├── App.tsx
└── main.tsx
```

Rules of thumb:

- A component used by exactly one section lives next to that section (or inside it), not in `components/`. Promote it to `components/` only when a second consumer actually needs it.
- `sections/` components may compose `components/`; `components/` must never import from `sections/`.
- `lib/` must not import React. If a helper needs React, it belongs in `hooks/` instead.
- `data/` holds the actual content (arrays/objects), `types/` holds the shapes for that content. Don't duplicate a type inline if it already exists in `types/`.
- `pages/` and `layouts/` stay empty until the site actually gains routing or multiple page shells — a single-page portfolio may never need them. Don't create them preemptively.

## Before creating a new file

1. Look at the existing structure (`src/` and relevant subfolder) — don't assume.
2. Check whether an existing file can reasonably hold the change instead.
3. Check whether an existing component/util/type can be reused or extended instead of duplicated.
4. Only then create a new file, in the directory matching its responsibility above.

Don't scatter related files across unrelated folders, don't create a second component that's 90% the same as an existing one under a slightly different name, and don't add new top-level folders outside `src/` (keep the repo root clean — config files stay at root, everything else lives under `src/`, `public/`, or `openspecs/`).

## Dependency policy

Before adding any dependency:

1. Check whether the functionality can be achieved with what's already installed (React, TS, native browser APIs, CSS).
2. Check whether a small amount of hand-written code reasonably replaces the package.
3. Weigh bundle size and ongoing maintenance cost against the benefit.
4. State the justification explicitly when proposing the addition — "it's popular" is not a justification.

**Tailwind CSS (`tailwindcss`, `@tailwindcss/vite`) is already approved and installed** as the project's primary styling system — see [ui-ux.md](ui-ux.md#styling-tailwind-css) for usage rules. It does not need re-justification.

Do not install UI component libraries, animation libraries, another CSS framework, or state-management libraries without explicit user approval, even if they'd be convenient.
