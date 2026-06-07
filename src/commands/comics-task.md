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

Comic page tasks must still track continuity. Each page line should carry a compact continuity note so page prompts are not treated as disconnected images.

## Execution Steps

### 1. Read Context

Read:
- `./stories/[novel-name]/comics-plan.md`
- existing `./stories/[novel-name]/comics-task.md` if present
- relevant `./stories/[novel-name]/comic/` prompt files if present
- relevant `./stories/[novel-name]/sheets/` prompt files if present

When reading `comics-plan.md`, capture each page's Continuity In, Transition Indicator, and Continuity Out.

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

- [ ] **Page 1** — [Brief page purpose] — Continuity: [opening state: place/time, or transition from previous chapter/scene]
- [ ] **Page 2** — [Brief page purpose] — Continuity: [continues from Page 1 | transition: Next day | transition: Elsewhere]

## Chapter 2: [Title]

### Pages

- [ ] **Page 1** — [Brief page purpose] — Continuity: [transition from previous chapter/scene if needed, otherwise opening state]
- [ ] **Page 2** — [Brief page purpose] — Continuity: [continues from Page 1 | transition label]

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

Continuity text stays brief. Use:
- `continues from Page [N]`
- `opening state: [place/time]`
- `transition: [Next day | Few years later | Elsewhere | Same night, rooftop | etc.]`
- `handoff: [unresolved action/emotion/prop for next page]`

### 4. Handoff

Suggest `/comics-chapter-pages-prompt Chapter [N]` for page prompts and sheet utility commands for missing references.
