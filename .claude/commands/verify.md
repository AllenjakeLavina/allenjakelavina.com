# /verify

Final check before reporting a change as complete. Verification only — no new implementation.

## Purpose

- Inspect `git diff` (what actually changed).
- Run the available checks from [testing.md](../rules/testing.md): `pnpm lint`, `pnpm build`, and `pnpm test` *if and only if* it exists in `package.json` at the time.
- Run `git diff --check`.
- Inspect `git status`.
- Report known issues honestly — including checks that don't exist, were skipped, or failed.

## Do NOT

- Commit, push, or merge — see [git-workflow.md](../rules/git-workflow.md).
- Fix unrelated issues found along the way; report them instead and let the user decide.

## Process

1. `git status` and `git diff` — confirm the changes match what was intended, nothing unrelated slipped in.
2. Run `pnpm lint`.
3. Run `pnpm build`.
4. Check `package.json` for a `test`/`check` script before trying to run one; report clearly if none exists rather than assuming.
5. Run `git diff --check`.
6. Report: changed files, diff summary, each check's pass/fail result, build result, and any known issues or follow-ups — leave the working tree untouched for user review.
