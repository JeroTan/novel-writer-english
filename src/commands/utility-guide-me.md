---
name: utility-guide-me
description: "Main orchestrator guide for AI-assisted novel writing. Walks you through the eight-step methodology from concept to completed manuscript."
tools:
  - "*"
kind: local
argument-hint: "[describe where you are or what you need help with]"
---

# User Input: $ARGUMENTS

## Objective

Assess the user's current project state and guide them to the next appropriate step in the novel writing workflow.

## Execution Steps

### 1. Assess Project State

Check which documents exist and determine where the user is in the workflow:
1. Does `./memory/constitution.md` exist? If not, recommend **Step 1: Constitution** — tell the user to type `/constitution`.
2. Does `./stories/[name]/specification.md` exist? If not, recommend **Step 2: Specify** — tell the user to type `/specify`.
3. Does `./stories/[name]/creative-plan.md` exist? If not, recommend **Step 4: Plan** (after checking if Clarify is needed) — tell the user `/clarify` or `/planner`.
4. If chapters are being written, guide them to **Step 6: Write** or **Step 7: Review** — tell the user `/writer` or `/reviewer`.
5. If all chapters from tasks.md are marked `[DONE]` and the novel is complete (or user says so), guide them to `/reviewer` for final analysis, then optionally `/utility-meta` for metadata.

### 2. Present Workflow Overview

Present the user with a clear overview:

| Step | Command | What It Does |
|------|---------|--------------|
| 1 | `/constitution` | Define creative principles and non-negotiables |
| 2 | `/specify` | Build the story specification (logline → full spec) |
| 3 | `/clarify` | Resolve ambiguities in the specification |
| 4 | `/planner` | Create chapter structure and pacing plan |
| 5 | `/task-manager` | Break the plan into tracked writing tasks |
| 6 | `/writer` | Write chapters with the pre-write checklist |
| 7 | `/reviewer` | Run quality analysis on written content |

**Utility Commands** — use anytime as needed:

| Command | What It Does |
|---------|--------------|
| `/utility-guide-me` | Return to this guide and assess your current progress |
| `/utility-meta` | Record novel metadata for platform upload (bucket, database, web novel viewer) |
| `/utility-checklist` | Quick QA checklist (Pre-Write, Post-Write, General Story modes) |
| `/utility-expert` | Activate expert persona (Editor, Sensitivity Reader, Logic Checker, etc.) |
| `/utility-track-init` | Initialize the JSON tracking system for a new novel |
| `/utility-track` | Update or query the tracking system (character state, plot, relationships) |
| `/utility-timeline` | Manage story timeline and verify chronological consistency |
| `/utility-relations` | Manage and analyze character relationships |
| `/utility-authentic-voice` | Rewrite a passage to remove AI cliches and enforce authentic voice |
| `/utility-authenticity-audit` | Audit text for AI-generated stylistic patterns |

To move to a step, the user types `/command-name` in the chat. For example: `/constitution Help me set up my novel's principles.`

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `workflow-guide` | `[user_agent]/skills/quality-assurance/workflow-guide/SKILL.md` | Reference the 8-step methodology. |
| `getting-started` | `[user_agent]/skills/quality-assurance/getting-started/SKILL.md` | Help the user if they are stuck. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
