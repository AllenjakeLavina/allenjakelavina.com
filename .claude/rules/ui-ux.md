# UI / UX

This is a professional personal portfolio. It should read as polished and credible, not flashy.

## Priorities, in order

1. Accessibility and semantic HTML
2. Responsive layout (mobile and desktop both matter — don't design desktop-first and bolt on mobile)
3. Readable typography and sensible spacing
4. Performance
5. Visual polish / motion

## Accessibility

- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`, `<a>`) — never a `<div onClick>` standing in for an interactive element.
- Every interactive element must be keyboard-reachable and operable (Tab, Enter/Space).
- Visible focus states are required — never remove `:focus` outlines without providing an equally visible replacement.
- Images need meaningful `alt` text (or `alt=""` only when purely decorative, as already done for logo/background images in `App.tsx`).
- Maintain sufficient color contrast in both light and dark color schemes (this project already supports `prefers-color-scheme: dark` in `src/index.css` — respect it in new styles).

## Motion

- Animations must be intentional — used to clarify state or guide attention, not added because they look impressive.
- Respect `prefers-reduced-motion`: any non-trivial animation needs a reduced-motion fallback (instant or near-instant transition).
- Avoid animating layout-triggering properties when a transform/opacity alternative exists.

## Styling (Tailwind CSS)

Tailwind CSS v4 (via `@tailwindcss/vite`) is the project's primary styling system, wired into `vite.config.ts` and imported in `src/index.css` (`@import 'tailwindcss';`). No `tailwind.config.js`/`postcss.config.js` exists or is needed — v4's Vite plugin handles content detection automatically; don't add one speculatively.

- Use Tailwind utility classes directly in markup for normal component and layout styling — this is the default, not a fallback.
- Do not introduce another CSS framework (Bootstrap, etc.) alongside Tailwind.
- Reuse an existing component or established class pattern before creating a new styling abstraction.
- Extract a component when a Tailwind-heavy block becomes genuinely hard to read, or the same markup+classes are reused in a second real place — not preemptively.
- Keep class lists readable: group related utilities (layout, then spacing, then color/typography, then state like `hover:`/`focus:`), and prefer wrapping long lists over cramming.
- A plain CSS file (in `src/index.css` or a new file under `src/styles/`) is appropriate for: global styles/tokens, complex custom animation that's awkward as utilities, third-party integration requirements, or a style that's genuinely clearer written as CSS. Don't create a CSS file just to avoid writing Tailwind classes.
- Avoid arbitrary values (`w-[137px]`, `text-[#1a2b3c]`) unless there's a clear, stated design reason — prefer the standard scale or a design token.

## Responsiveness

- Design intentionally for mobile, tablet, desktop, and large desktop — don't design desktop-first and shrink it. Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) to express per-breakpoint behavior deliberately, not reflexively on every element.
- Avoid fixed pixel widths on containers that should flex; prefer relative units and flex/grid utilities (or the existing flexbox/grid CSS in `src/index.css`/`src/App.css`).

## Libraries

- Do not add a UI component library (MUI, Chakra, Ant, etc.) just because Tailwind is installed, or for any other reason, without explicit user approval — see [architecture.md](architecture.md#dependency-policy).
- Do not add an animation library (Framer Motion, Motion, GSAP, Three.js, Lenis, etc.) without explicit user approval and a design/OpenSpec that justifies it. Prefer CSS/Tailwind transitions and animation utilities for simple effects; reach for JavaScript/`requestAnimationFrame` only when the interaction genuinely requires it (e.g. scroll-linked or pointer-driven effects CSS can't express).

## Verification

For any UI change, start the dev server (`pnpm dev`) and manually check the change in a browser: the golden path, keyboard navigation, and at least one mobile-width viewport, before reporting the work as complete. If you can't actually view it, say so explicitly rather than claiming it was checked.
