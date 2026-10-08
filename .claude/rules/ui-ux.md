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

## Responsiveness

- Design/test at common breakpoints: mobile (~375–480px), tablet (~768px), desktop (~1280px+).
- Avoid fixed pixel widths on containers that should flex; prefer relative units and CSS layout (flexbox/grid) already in use in `src/index.css`/`src/App.css`.

## Libraries

- Do not introduce a UI component library (e.g. MUI, Chakra, Ant) or CSS framework (e.g. Tailwind, Bootstrap) without explicit user approval — see [architecture.md](architecture.md#dependency-policy). Plain CSS plus the existing custom-property tokens is the default.
- Do not add an animation library unless a specific, non-trivial need can't reasonably be done with CSS transitions/animations.

## Verification

For any UI change, start the dev server (`pnpm dev`) and manually check the change in a browser: the golden path, keyboard navigation, and at least one mobile-width viewport, before reporting the work as complete. If you can't actually view it, say so explicitly rather than claiming it was checked.
