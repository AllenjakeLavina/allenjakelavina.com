# Git Workflow

## Branches

- `main` is stable and production-ready. Treat it as deployable at all times.
- For meaningful work: `main` → feature branch → implementation → testing → verification → pull request → merge.
- Small, trivial changes may be reviewed directly against `main` if the user directs that.

## What Claude must NOT do automatically

Never do any of the following unless the user explicitly instructs that specific action in that specific request:

- `git commit`
- `git push`
- merging a branch or PR
- deleting a branch
- rewriting history (`rebase`, `commit --amend` on existing commits, force-push)

A prior approval does not carry forward — each commit/push/merge needs its own explicit go-ahead.

## Before finishing any meaningful task, report

- current branch
- `git status`
- changed files
- a summary of the diff (what changed and why)
- tests/checks run and their results
- build result
- known issues or follow-ups

Leave the working tree as-is for the user to review unless they've explicitly asked for it to be committed/pushed.

## Hygiene

- Don't skip hooks (`--no-verify`) or bypass signing unless explicitly asked.
- Run `git diff --check` before declaring a change verified (catches stray whitespace/conflict markers).
- If you find unfamiliar uncommitted state (files, branches) before doing something destructive, investigate rather than discard it — it may be the user's in-progress work.
