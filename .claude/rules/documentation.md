# Documentation

## Two levels

**Small changes** (CSS tweaks, copy fixes, small bug fixes, minor refactors with no behavior change): no OpenSpec doc required. Update existing documentation (README, comments where genuinely needed) only if it's now inaccurate.

**Meaningful features / structural changes** (a new section, a new page, a new architectural pattern, a routing change, a dependency addition, anything that changes how future work should be done): requires an OpenSpec change directory under `openspecs/changes/`.

When in doubt about which bucket a change falls into, treat it as meaningful — a short proposal is cheap; an undocumented structural decision is expensive later.

## OpenSpec structure

```
openspecs/
└── changes/
    └── <id>-<short-description>/
        ├── proposal.md   — what & why, scope, affected files, risks
        ├── design.md     — how: approach, alternatives considered, decisions
        └── tasks.md       — concrete checklist of implementation steps
```

- IDs are sequential and zero-padded to 3 digits (`001`, `002`, `003`, ...). Never reuse or renumber an existing ID.
- Before assigning the next ID, check `openspecs/changes/` for the highest existing number.
- Short description is kebab-case and descriptive (`002-hero-section`, not `002-update`).

## Workflow for meaningful changes

AUDIT → PROPOSAL → DESIGN → TASKS → IMPLEMENTATION → TESTING → VERIFICATION

1. **Audit**: inspect existing code, identify affected files, identify reuse opportunities, identify risks. Use `/audit` for this.
2. **Proposal**: write `proposal.md` — intended behavior, scope, what's explicitly out of scope.
3. **Design**: write `design.md` — the approach and why, especially if there's a non-obvious choice or alternative considered.
4. **Tasks**: write `tasks.md` — a checklist breaking the work into concrete steps.
5. **Implementation**: follow [coding-standards.md](coding-standards.md) and [architecture.md](architecture.md). Use `/implement`.
6. **Testing**: run the checks in [testing.md](testing.md).
7. **Verification**: use `/verify` before reporting the change as done.

If implementation ends up deviating from the original proposal/design (a different approach was needed, scope changed), **update the OpenSpec docs to match what was actually built**. The final documents must describe reality, not the original intent, once implementation is done.

## Author field

Every OpenSpec document uses this exact author line:

```
**Author:** **Allen Jake Lavina** (*Full Stack Developer*)
```

Never attribute authorship to Claude, an AI, or anyone else.

## Content accuracy

This site represents a real person professionally. Never fabricate:

- employment history, job titles, companies, clients
- projects, certifications, achievements
- technical skills, education
- contact information, social/profile links

If content is missing when implementing a section, use an explicit, visible placeholder (e.g. `TODO: confirm job title`) or ask the user — never fill the gap with invented specifics presented as fact.
