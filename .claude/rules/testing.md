# Testing & Verification

## Current reality

As of this writing, [package.json](../../package.json) defines these scripts only:

- `pnpm dev` — dev server
- `pnpm build` — `tsc -b && vite build` (type-check + production build)
- `pnpm lint` — ESLint
- `pnpm preview` — preview a production build

There is **no `pnpm check` and no `pnpm test` script, and no test framework is installed.** Do not assume these exist — inspect `package.json` and confirm before running or referencing a script. If this changes (e.g. Vitest is added later), update this file to match.

## What to run before declaring a change done

For any meaningful change:

1. `pnpm lint`
2. `pnpm build` (this also runs the TypeScript compiler, so it's the type-check step too)
3. `git diff --check` (catches stray whitespace / leftover conflict markers)

For a small/targeted change, running the most relevant of the above is enough — e.g. a CSS-only tweak doesn't need a full build if `pnpm lint` and a visual check cover it, but say so explicitly in your report.

If a UI change is involved, also run the dev server and exercise the change in a browser (see [ui-ux.md](ui-ux.md)) — passing lint/build/type-check verifies the code compiles, not that the feature looks or works right.

## When a check fails

- Investigate the actual cause before reporting.
- Determine whether the failure is caused by your change or pre-existing (check against `main`/`git stash` if unsure).
- Report honestly: which checks passed, which failed, and why — never claim a change is "fully verified" when a relevant check was skipped or failing.

## Adding a test framework

If/when automated tests become necessary, propose the addition explicitly (see [architecture.md](architecture.md#dependency-policy) for the dependency-justification process) rather than silently installing one. Vitest + React Testing Library is the natural fit for this stack if that becomes necessary, but don't install it preemptively.
