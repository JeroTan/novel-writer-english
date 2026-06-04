---
name: utility-command-cross-check
description: "Cross-check a project file created by a workflow command against the current command instructions and suggest revisions when the file format is stale."
tools:
  - "*"
kind: local
argument-hint: "[command name, e.g. planner | writer | utility-meta]"
---

# User Input: $ARGUMENTS

## Objective

Check whether an existing project file created by a workflow command still follows the current command instructions. Use this when the package workflow has changed and the user's novel files may need format updates.

## Execution Steps

### 1. Choose Command And Target

Ask which command to cross-check if `$ARGUMENTS` does not name one.

Accept command names with or without leading slash:
- `planner`
- `/planner`
- `writer chapter 3`
- `/utility-meta`

Normalize the command name by removing the leading slash.

If multiple novels exist under `./stories/`, ask which novel to use.

If the command creates or updates multiple files, ask which file or range to check unless the user already specified it.

### 2. Identify Current Expected Format

Use the current workflow instruction for the named command as the source of truth.

If running from the package repository, you may read:
- `src/commands/[command].md`

When the command uses templates, also read the relevant template:
- `[user_agent]/templates/**`
- `src/templates/**` if running from the package repository

If the package repository is not available, infer the expected format from the active command or skill instruction already available in the user's assistant environment.

### 3. Find Project Files Created By That Command

Use this target map:

- `/constitution` -> `./memory/constitution.md`
- `/specify` -> `./stories/[novel-name]/specification.md` and `./stories/[novel-name]/knowledge/`
- `/clarify` -> `./stories/[novel-name]/specification.md` and any updated files in `./stories/[novel-name]/knowledge/`
- `/planner` -> `./stories/[novel-name]/creative-plan.md` and `./stories/[novel-name]/tracking/`
- `/task-manager` -> `./stories/[novel-name]/tasks.md`
- `/writer` -> selected chapter file(s) in `./stories/[novel-name]/content/`
- `/editor` -> selected chapter file(s) in `./stories/[novel-name]/content/`
- `/reviewer` -> `./stories/[novel-name]/tasks.md`, `./stories/[novel-name]/knowledge/`, `./stories/[novel-name]/tracking/`, and reviewed chapter files when relevant
- `/utility-meta` -> `./stories/[novel-name]/meta.json`
- `/utility-track-init` and `/utility-track` -> files in `./stories/[novel-name]/tracking/`
- `/utility-timeline` -> `./stories/[novel-name]/tracking/timeline.json`
- `/utility-relations` -> `./stories/[novel-name]/tracking/relationships.json`

For utilities that do not create a persistent file by default, explain that there is no standard project file to cross-check and ask the user for a specific file if needed.

### 4. Compare File Format

Compare the project file against the current command's required output shape:
- Required headings and section order
- Required metadata fields
- Required status markers, pacing tags, tables, or lists
- Required JSON keys and nesting
- File naming conventions
- Required side-effect files, such as `knowledge/` or `tracking/`
- Newer workflow additions that older files may miss

Do not treat story-specific content differences as stale format. Only flag content when it conflicts with the command's structural requirements or required workflow state.

For `/planner`, specifically check whether `creative-plan.md` uses the current format:
- Definition, created date, updated date, current saga/arc position, and planning mode
- Nested `Saga -> Arc -> Chapters` hierarchy, or `Arc -> Chapters` when there is no saga
- Structural Approach
- Pacing & Tension as compact bullets that list chapter(s)
- Any required section or field may use `[N/A] — [brief reason]` if truly not applicable
- Foreshadowing Plan
- Character Arc Mapping
- Chapter headings nested under the active arc with pacing tag
- Chapter Summary, Flow, and Continuity Notes
- Batch plan sections with Adds To and Definition

For `/task-manager`, specifically check whether `tasks.md` uses the current format:
- Header has total chapters planned, chapters written, and last updated
- No estimated total words, per-chapter word estimates, or effort estimates
- Tasks preserve the planner's `Saga -> Arc -> Chapter` order, or `Arc -> Chapter` when there is no saga
- Chapter tasks are one-line task-management entries: `- [ ] **Chapter [N]: [Title]** — brief chapter explanation`
- Chapter tasks do not duplicate planner Summary, Flow, Pacing & Tension, Foreshadowing, Character Arc Mapping, or Continuity Notes
- Batch sections include `Adds To`
- Status markers are `[ ]`, `[FOR_REVIEW]`, and `[DONE]`
- Contains `## Review & Editing Log`, initially `No editor/reviewer entries yet.` or populated by `/editor` and `/reviewer`
- Does not create separate character profile, worldbuilding, review, or editing task items

### 5. Output Report

Output:

```markdown
# Command Output Cross-Check: /[command]

| File | Status | Notes |
|------|--------|-------|
| [path] | current | Matches current command format |
| [path] | revise | Missing chapter Flow and compact pacing list |

## Recommended Revisions

1. [Concrete format update]
2. [Concrete format update]
```

Status values:
- `current` — no meaningful format update needed
- `revise` — file exists but uses an older or incomplete workflow format
- `missing` — expected file or side-effect file not found

### 6. Revision Guidance

If a file is stale, suggest revising it before continuing that workflow command.

Do not overwrite automatically unless the user explicitly asks.

If the user asks to revise:
- Preserve the user's story facts, prose, decisions, and custom notes.
- Only restructure, relabel, or add missing required sections.
- Mark unknown values as `[TBD]`, `[TENTATIVE]`, or `[Needs User Input]`.
- For JSON files, preserve existing IDs and values unless a key is required by the current template.
