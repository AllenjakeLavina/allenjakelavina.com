# OpenSpecs

Documentation for meaningful features and structural changes to this project. See [.claude/rules/documentation.md](../.claude/rules/documentation.md) for the full policy on when an OpenSpec doc is required and the AUDIT → PROPOSAL → DESIGN → TASKS → IMPLEMENTATION → TESTING → VERIFICATION workflow.

## Structure

```
openspecs/
└── changes/
    └── <id>-<short-description>/
        ├── proposal.md
        ├── design.md
        └── tasks.md
```

- `changes/` is created on demand, starting with the first meaningful change (`001-...`). It does not exist yet in this repository — don't create it empty.
- IDs are sequential, zero-padded to 3 digits, and never reused.
- Every document uses the author line: `**Author:** **Allen Jake Lavina** (*Full Stack Developer*)`.
