---
name: comics-task
description: "Bonus comics workflow: converts comics-plan.md into a simple comic chapter/page checklist."
tools:
  - "*"
kind: local
argument-hint: "[Optional: comic chapter or page range]"
---

# User Input: $ARGUMENTS

## Objective

Create or update `./stories/[novel-name]/comics-task.md` from `./stories/[novel-name]/comics-plan.md`.

This task file is for comic production tracking only. Keep it short.

## Execution Steps

### 1. Read Context

Read:
- `./stories/[novel-name]/comics-plan.md`
- existing `./stories/[novel-name]/comics-task.md` if present
- relevant `./stories/[novel-name]/comic/` prompt files if present
- relevant `./stories/[novel-name]/sheets/` prompt files if present

If `comics-plan.md` does not exist, tell user to run `/comics-planner` first.

### 2. Preserve Existing Status

If `comics-task.md` exists:
- preserve `[ ]`, `[PROMPTED]`, `[REVISED]`, and `[DONE]` statuses
- preserve custom notes
- append only missing chapters/pages unless user asks to replace

### 3. Output Format

Save to `./stories/[novel-name]/comics-task.md`.

Use this structure:

```markdown
# Comics Tasks — [Novel Name]

**Created:** [YYYY-MM-DD]
**Updated:** [YYYY-MM-DD]
**Source Plan:** `./stories/[novel-name]/comics-plan.md`

---

## Chapter 1: [Title]

### Pages

- [ ] **Page 1** — [Brief page purpose]
- [ ] **Page 2** — [Brief page purpose]

## Chapter 2: [Title]

### Pages

- [ ] **Page 1** — [Brief page purpose]
- [ ] **Page 2** — [Brief page purpose]

---

## Sheet Tasks

- [ ] **Character sheet: [Name]**
- [ ] **Setting sheet: [Place]**
- [ ] **Object sheet: [Object]**
- [ ] **NPC/general sheet: [Group, monster, race, or role]**

---

## Revision Log

No comic prompt revisions yet.
```

Status markers:
- `[ ]` — not started
- `[PROMPTED]` — page or sheet prompt generated
- `[REVISED]` — prompt revised after feedback
- `[DONE]` — final prompt accepted

### 4. Handoff

Suggest `/comics-chapter-pages-prompt Chapter [N]` for page prompts and sheet utility commands for missing references.
