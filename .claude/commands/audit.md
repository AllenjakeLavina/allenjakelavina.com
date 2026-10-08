# /audit

Read-only investigation. Use before proposing or implementing a meaningful change.

## Purpose

- Inspect the current project structure relevant to the request.
- Inspect the relevant existing implementation in detail.
- Identify existing patterns/components/utilities that should be reused instead of duplicated.
- Identify risks (breaking changes, accessibility regressions, affected files beyond the obvious ones).
- Report findings clearly.

## Do NOT

- Modify any implementation file.
- Create or edit OpenSpec documents (that's `/implement`'s job, once a change is approved) — `/audit` only informs the proposal, it doesn't write one.
- Install dependencies.

## Process

1. Restate what's being audited, in one sentence.
2. Inspect relevant files under `src/` (and `.claude/rules/architecture.md` for where things should live).
3. Check for existing components/hooks/utils/types that overlap with the request.
4. Note any risk: things that could break, accessibility concerns, dependency implications.
5. Report: findings, reuse opportunities, risks, and a recommendation for whether this needs an OpenSpec change doc (see [documentation.md](../rules/documentation.md)).

Output is a report to the user — not a code change.
