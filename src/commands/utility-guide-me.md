---
name: utility-guide-me
description: "Main orchestrator guide for AI-assisted novel writing. Walks you through the eight-step methodology from concept to completed manuscript. Also provides manual drafting guidance when asked."
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
3. Does `./stories/[name]/creative-plan.md` exist? If not, recommend **Step 4: Plan** after checking if Clarify is needed — tell the user `/clarify` or `/planner`.
4. **Check for drafts**: Look in `./draft/chapters/`. If drafts exist but `tasks.md` has no tasks, recommend `/task-manager` to generate tasks from the drafts. If tasks exist but no chapters are written, recommend `/writer` — mention that it will detect and expand the drafts.
5. If chapters are being written or edited, guide them to **Step 6: Write**, **Step 7: Edit**, or **Step 8: Review** — tell the user `/writer`, `/editor Chapter [N]`, or `/reviewer`.
6. If chapters are marked `[FOR_REVIEW]`, recommend `/editor` first for one-chapter fixes when needed, then `/reviewer` for broad QA and `[DONE]` approval.
7. If all chapters from `tasks.md` are marked `[DONE]` and the novel is complete (or user says so), guide them to `/reviewer` for final analysis, then optionally `/utility-meta` for metadata.
8. If written chapters exist and the user wants manga, manhwa, manhua, webtoon, comic pages, image prompts, or visual reference sheets, recommend the bonus comics prompt workflow starting with `/comics-planner`.

### 2. Present Workflow Overview

Present the user with a clear overview:

| Step | Command | What It Does |
|------|---------|--------------|
| 1 | `/constitution` | Define creative principles and non-negotiables |
| 2 | `/specify` | Build the lean story specification and knowledge map |
| 3 | `/clarify` | Resolve ambiguities in the specification |
| 4 | `/planner` | Create chapter structure and pacing plan |
| 5 | `/task-manager` | Break the plan into tracked writing tasks |
| 6 | `/writer` | Write chapters with the pre-write checklist. Also detects and expands drafts from `./draft/chapters/` |
| 7 | `/editor` | Check one chapter, suggest line-level fixes, track approve/skip statuses, and apply approved edits after confirmation |
| 8 | `/reviewer` | Run broad QA on written content, tracking, knowledge, and final readiness |

**Bonus Comics Prompt Workflow** — use after novel chapters exist or when adapting prose into comic/image prompts:

| Command | What It Does |
|---------|--------------|
| `/comics-planner` | Adapt novel chapters into comic chapters and page-level visual beats |
| `/comics-task` | Create comic page and sheet checklist tasks |
| `/comics-chapter-pages-prompt` | Generate clean AI image prompt files for chapter pages |
| `/comics-revise-prompt` | Revise page or sheet prompts after feedback |
| `/utility-character-sheets-prompt` | Generate character reference sheet prompts |
| `/utility-settings-sheets-prompt` | Generate setting/place reference sheet prompts |
| `/utility-object-sheets-prompt` | Generate object/prop/weapon/artifact reference sheet prompts |
| `/utility-npc-sheets-prompt` | Generate NPC/race/monster/bestiary/general archetype reference sheet prompts |

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
| `/utility-command-cross-check` | Compare a project file created by a command against the current workflow format |

To move to a step, the user types `/command-name` in the chat. For example: `/constitution Help me set up my novel's principles.`

**Drafting workflow**: If the user has written their own drafts, they can place them in `./draft/chapters/` and the workflow will integrate them:
- `/planner` reads drafts to build the chapter structure
- `/task-manager` generates tasks from the draft files
- `/writer` expands drafts into full prose using the `@#@ FILL @#@`, `@#@ DESCRIBE @#@`, and `@#@ FLASHBACK @#@` tags
- `/editor` checks the finished chapter and applies approved corrections after confirmation
- `/reviewer` handles broad QA and marks approved chapters `[DONE]`

### 3. Manual Drafting Guidance

If the user asks how to write drafts manually or where to place them, provide this guidance:

**Where to put drafts:**
- Place draft files in `./draft/chapters/` (relative to project root)
- The `/writer` command scans this folder before writing and uses drafts as structural guidance
- Accepted naming: `chapter_00001.md` (preferred), `0001.md`, `1.md`, `01.md`, `chapter-1.md`, `chapter 1.md`, `ch1.md`, or `[1-5].md` (range files)

**How `/writer` processes drafts:**
- Drafts are used as outlines — `specification.md`, `creative-plan.md`, `knowledge/`, and `tracking/` take priority
- If a draft conflicts with core documents, core documents win
- After saving, `/writer` tells the user which scenes were changed from the draft and why

**Special draft tags you can use in your drafts:**
- `@#@ FILL @#@ [Description] @#@ END FILL @#@` — `/writer` replaces this with fully written prose
- `@#@ DESCRIBE @#@ [Description] @#@ END DESCRIBE @#@` — rewrites with light-novel style sensory intensity
- `@#@ FLASHBACK @#@ [Description] @#@ END FLASHBACK @#@` — writes a full flashback sequence

**Where finished chapters go:**
- `/writer` saves completed chapters to `./stories/[novel-name]/content/chapter_[N].md` (zero-padded to 5 digits, e.g. `chapter_00001.md`)
- `/editor` edits only the target chapter after all suggestions are `approve` or `skip` and the user confirms
- Chapter format: `# Chapter [N]: [Title]` followed by body, then a mini summary separator
- Task status is tracked in `./stories/[novel-name]/tasks.md` as `[ ]` -> `[FOR_REVIEW]` -> `[DONE]`

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `workflow-guide` | `[user_agent]/skills/quality-assurance/workflow-guide/SKILL.md` | Reference the eight-step methodology. |
| `getting-started` | `[user_agent]/skills/quality-assurance/getting-started/SKILL.md` | Help the user if they are stuck. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
