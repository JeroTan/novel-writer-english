---
name: workflow-guide
description: "Use when user asks about the novel writing process, workflow steps, or how to get started — provides the eight-step methodology for systematic novel creation"
---

# Novel Writing Workflow Guide

This skill provides the eight-step systematic workflow for novel creation. It ensures you follow a proven methodology from initial concept to completed manuscript.

## The Eight-Step Methodology

| Step | Name | Purpose | Output |
|------|------|---------|--------|
| 1 | **Constitution** | Establish creative principles | `memory/constitution.md` |
| 2 | **Specify** | Define lean story specification and knowledge map | `stories/[name]/specification.md` |
| 3 | **Clarify** | Resolve ambiguities | Updated specification |
| 4 | **Plan** | Create creative plan | `stories/[name]/creative-plan.md` |
| 5 | **Tasks** | Break down into tasks | `stories/[name]/tasks.md` |
| 6 | **Write** | AI-assisted chapter writing | `stories/[name]/content/chapter-XX.md` |
| 7 | **Edit** | One-chapter correction pass with approve/skip tracking | Updated chapter |
| 8 | **Review** | Broad QA for continuity, tracking, and final readiness | Review report |

## When to Use Each Step

### Starting a New Novel
Begin at Step 1 (Constitution) and proceed sequentially. Do not skip steps — each builds on the previous.

### Resuming an Existing Project
Check which files already exist:
- `memory/constitution.md` exists -> Step 1 complete
- `stories/[name]/specification.md` exists -> Step 2 complete
- `stories/[name]/creative-plan.md` exists -> Step 4 complete
- `stories/[name]/tasks.md` exists -> Step 5 complete
- `stories/[name]/content/` has chapters -> Step 6 in progress
- chapters need revision -> Step 7 (`/editor`)
- chapters are edited or ready for broad QA -> Step 8 (`/reviewer`)

Resume from the first incomplete step.

### Writing Additional Chapters
If the project is set up and you're writing more chapters, go to Step 6 (`/writer`). After a chapter is drafted, use Step 7 (`/editor`) for chapter-level fixes, then Step 8 (`/reviewer`) for broad QA and approval.

## Key Principles

1. **Never skip the Constitution** — it prevents creative drift over long projects
2. **Lean specifications prevent scope creep** — keep core purpose in the spec and detailed canon in `knowledge/`
3. **The pre-write checklist is mandatory** — it solves AI context degradation after 30+ chapters
4. **Editor handles chapter fixes** — use `/editor` for one chapter, line-specific suggestions, and approved edits
5. **Reviewer handles broad QA** — run `/reviewer` for project health, cross-chapter continuity, tracking accuracy, and final readiness
6. **Track everything** — use the tracking templates to maintain state across sessions

## Related Skills

- `pre-write-checklist` — Mandatory context reload before each chapter
- `setting-detector` — Auto-detects genre and loads relevant knowledge
- `consistency-checker` — Catches contradictions across chapters
- `forgotten-elements` — Finds dropped plot threads and abandoned character arcs
