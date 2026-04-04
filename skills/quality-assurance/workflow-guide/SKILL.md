---
name: workflow-guide
description: "Use when user asks about the novel writing process, workflow steps, or how to get started — provides the seven-step methodology for systematic novel creation"
---

# Novel Writing Workflow Guide

This skill provides the seven-step systematic workflow for novel creation. It ensures you follow a proven methodology from initial concept to completed manuscript.

## The Seven-Step Methodology

| Step | Name | Purpose | Output |
|------|------|---------|--------|
| 1 | **Constitution** | Establish creative principles | `memory/constitution.md` |
| 2 | **Specify** | Define story specifications | `stories/[name]/specification.md` |
| 3 | **Clarify** | Resolve ambiguities | Updated specification |
| 4 | **Plan** | Create creative plan | `stories/[name]/creative-plan.md` |
| 5 | **Tasks** | Break down into tasks | `stories/[name]/tasks.md` |
| 6 | **Write** | AI-assisted chapter writing | `stories/[name]/content/chapter-XX.md` |
| 7 | **Analyze** | Quality verification | Analysis report |

## When to Use Each Step

### Starting a New Novel
Begin at Step 1 (Constitution) and proceed sequentially. Do not skip steps — each builds on the previous.

### Resuming an Existing Project
Check which files already exist:
- `memory/constitution.md` exists → Step 1 complete
- `stories/[name]/specification.md` exists → Step 2 complete
- `stories/[name]/creative-plan.md` exists → Step 4 complete
- `stories/[name]/tasks.md` exists → Step 5 complete
- `stories/[name]/content/` has chapters → Step 6 in progress

Resume from the first incomplete step.

### Writing Additional Chapters
If the project is set up and you're writing more chapters, go directly to Step 6 (Write). The pre-write checklist skill will automatically ensure all context is loaded before each chapter.

## Key Principles

1. **Never skip the Constitution** — it prevents creative drift over long projects
2. **Specifications prevent scope creep** — treat your story like a product
3. **The pre-write checklist is mandatory** — it solves AI context degradation after 30+ chapters
4. **Regular analysis catches problems early** — run Step 7 every 5-10 chapters
5. **Track everything** — use the tracking templates to maintain state across sessions

## Related Skills

- `pre-write-checklist` — Mandatory context reload before each chapter
- `setting-detector` — Auto-detects genre and loads relevant knowledge
- `consistency-checker` — Catches contradictions across chapters
- `forgotten-elements` — Finds dropped plot threads and abandoned character arcs
