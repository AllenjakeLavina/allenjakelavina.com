# /implement

Implement an already-approved change (typically after `/audit` and, for meaningful work, an approved OpenSpec proposal).

## Purpose

- Implement the approved change, following [architecture.md](../rules/architecture.md) and [coding-standards.md](../rules/coding-standards.md) (and [ui-ux.md](../rules/ui-ux.md) for UI work).
- Create/update the OpenSpec change docs under `openspecs/changes/<id>-<name>/` when the change is meaningful (see [documentation.md](../rules/documentation.md)) — write `tasks.md` as you go, and update `proposal.md`/`design.md` if implementation deviates from what was originally planned.
- Run the relevant checks from [testing.md](../rules/testing.md) as part of the work, not just at the end.

## Do NOT

- Commit, push, merge, or otherwise change git history — see [git-workflow.md](../rules/git-workflow.md). Implementation ends with an uncommitted, reviewable working tree.
- Touch files unrelated to the approved change.
- Fabricate portfolio content — see [documentation.md](../rules/documentation.md#content-accuracy).
- Add dependencies not already justified in the approved proposal, without flagging it.

## Process

1. Confirm what's approved (the proposal/design/tasks, or the user's direct instruction for a small change).
2. Implement the smallest clean change that satisfies it, reusing existing files/components where reasonable.
3. Keep the diff focused — no unrelated refactors.
4. Update OpenSpec docs if this is a meaningful change and reality diverged from the original plan.
5. Run `pnpm lint` and `pnpm build` (and anything else relevant from [testing.md](../rules/testing.md)); for UI changes, verify in the browser.
6. Hand off to `/verify` (or run its checks directly) before reporting completion.
