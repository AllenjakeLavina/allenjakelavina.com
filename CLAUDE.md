# CLAUDE.md

High-level source of truth for working on this repository. Detailed rules live under [.claude/rules/](.claude/rules/); detailed command workflows live under [.claude/commands/](.claude/commands/). This file tells you which rule applies when — read the linked file before acting in that area.

## What this project is

A personal portfolio / profile website for **Allen Jake Lavina**. It is a standalone project, unrelated to any other codebase (including any "UTS" project). Never import conventions, dependencies, or business logic from other projects into this one.

## Current stack (do not replace)

React + TypeScript + Vite + pnpm + ESLint, styled with **Tailwind CSS v4** (via `@tailwindcss/vite`) as the project's primary styling system. See [package.json](package.json) for exact versions and scripts.

- Do not swap out Vite, React, TypeScript, pnpm, or Tailwind CSS.
- Do not introduce a new framework, another CSS framework, a UI component library, an animation library, or a state-management library without explicit user approval and clear justification.
- Do not add dependencies speculatively. See [.claude/rules/architecture.md](.claude/rules/architecture.md#dependency-policy).

## How to work on this repo

1. Understand the request.
2. Inspect the relevant existing files before writing new ones — see [.claude/rules/architecture.md](.claude/rules/architecture.md).
3. Decide if the change needs an OpenSpec change doc — see [.claude/rules/documentation.md](.claude/rules/documentation.md).
4. Implement following [.claude/rules/coding-standards.md](.claude/rules/coding-standards.md) and, for UI work, [.claude/rules/ui-ux.md](.claude/rules/ui-ux.md).
5. Run the checks in [.claude/rules/testing.md](.claude/rules/testing.md).
6. Review the diff and report the final state per [.claude/rules/git-workflow.md](.claude/rules/git-workflow.md).

Slash-command workflows for this loop: [/audit](.claude/commands/audit.md) → [/implement](.claude/commands/implement.md) → [/verify](.claude/commands/verify.md).

## Non-negotiables (apply everywhere)

- **No fabricated content.** Never invent Allen Jake Lavina's job history, employers, clients, projects, certifications, skills, education, or contact/social links. If information is missing, use an explicit placeholder (e.g. `TODO: confirm employer name`) or ask. See [.claude/rules/documentation.md](.claude/rules/documentation.md#content-accuracy).
- **No unapproved git actions.** Never commit, push, merge, delete branches, or rewrite history unless explicitly instructed for that specific action. See [.claude/rules/git-workflow.md](.claude/rules/git-workflow.md).
- **No empty scaffolding.** Only create folders/files that are needed right now for the task at hand. Don't pre-create the full architecture because a doc mentions it.
- **No scope creep.** Don't refactor unrelated code, rename things in passing, or "improve" files outside the request.
- **Clean over clever.** Prefer small, readable components and plain CSS/TS over abstractions, frameworks, or patterns that aren't earning their keep. See [.claude/rules/coding-standards.md](.claude/rules/coding-standards.md).

## Quick reference

| Area | Rule file |
|---|---|
| Folder structure, what goes where, dependency policy | [architecture.md](.claude/rules/architecture.md) |
| Naming, components, TS style, dead code, formatting | [coding-standards.md](.claude/rules/coding-standards.md) |
| When to write OpenSpec docs, author field, content accuracy | [documentation.md](.claude/rules/documentation.md) |
| Branching, commits, what Claude may/may not do with git | [git-workflow.md](.claude/rules/git-workflow.md) |
| What checks to run and when, honest reporting of failures | [testing.md](.claude/rules/testing.md) |
| Accessibility, responsiveness, motion, Tailwind usage, UI libraries | [ui-ux.md](.claude/rules/ui-ux.md) |

## Project status

As of 2026-10-08, Tailwind CSS v4 is installed and wired into Vite (`vite.config.ts` + `@import 'tailwindcss';` in `src/index.css`), replacing nothing else in the starter template — the app itself is still the unmodified Vite + React + TypeScript starter plus a swapped-in hero image. No portfolio sections (Hero/About/Skills/Projects/Contact) exist yet, and no animation has been implemented or installed. No test framework is installed. This file and the `.claude/` rules establish governance *before* that implementation work begins — do not build portfolio UI or add animation based on this file alone; wait for an approved OpenSpec change and explicit feature requests.
