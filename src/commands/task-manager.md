---
name: task-manager
description: "Step 5: Breaks the creative plan into prioritized, dependency-tracked writing tasks. Supports full, per-arc, or incremental task generation."
tools:
  - "*"
kind: local
argument-hint: "[Optional: specific arc or chapters to focus on, e.g., 'tasks for Arc 2', 'add tasks for chapters 6-10']"
---

# User Input: $ARGUMENTS

## Objective

Break the creative plan into actionable, tracked tasks to guide the daily writing process. Tasks can be generated for the whole novel, one arc at a time, or incrementally as you plan new batches.

## Execution Steps

### 1. Check Existing Tasks

Check if `./stories/[novel-name]/tasks.md` already exists.
- If it exists, read it to understand current progress. Then ask the user:
  - **Update** — modify existing task entries while keeping completed ones intact.
  - **Replace** — discard the current task list and regenerate from the creative plan.
  - **Increment** — append new tasks for upcoming chapters/arcs without changing existing ones.
  - **Add batch** — generate tasks only for a specific range (e.g., "chapters 6–10").
- If it does not exist, proceed to create a new task list.

### 2. Read Context

Read `./stories/[novel-name]/creative-plan.md` and `./stories/[novel-name]/specification.md`.

When reading `creative-plan.md`, follow the current planner hierarchy:
- `Saga -> Arc -> Chapters`, or `Arc -> Chapters` when there is no saga.
- Each arc may include Structural Approach, Pacing & Tension, Foreshadowing Plan, Character Arc Mapping, Chapters, and continuity notes.
- Each chapter may include Summary, Flow, and Continuity Notes.
- If any section or field is marked `[N/A]`, treat it as intentionally not applicable.

### 2b. Check for Drafts

Look for draft files in `./draft/chapters/` (relative to project root). Accept any naming convention: `chapter_00001.md`, `0001.md`, `1.md`, `chapter-1.md`, `ch1.md`, etc.

**If drafts are found**:
- Read all draft files to understand the user's intended chapter structure, scene beats, and story flow.
- Compare the draft against `./stories/[novel-name]/creative-plan.md`, `./stories/[novel-name]/specification.md`, and `./stories/[novel-name]/knowledge/`.
- **Conflict detection**: If the draft contradicts any established document (character traits, world rules, plot points, pacing plan), flag the conflict and ask the user:
  - "The draft says [X] but the plan/spec says [Y]. Is this an intentional change, or should I align with the existing documents?"
  - Only proceed once the user clarifies. Never silently override or ignore conflicts.
- **Draft boundary rule**: Generate tasks only for what the user has drafted. Do NOT add tasks for chapters beyond the draft range unless the user explicitly asks.
- **If you want to suggest tasks beyond the draft**: Propose it first and ask for approval. Example: "Your draft covers chapters 1–3. I could add tasks for chapters 4–6 to continue the arc, or stop here. Which do you prefer?"
- Ask the user:
  - **Follow draft** — use the draft chapter count and structure as the basis for the task list.
  - **Fill gaps** — use the draft as a starting point, but add tasks for missing chapters **within the drafted range only** (e.g., draft has chapters 1 and 3, add task for chapter 2).
  - **Ignore drafts** — generate tasks purely from the creative plan.

**If no drafts are found**: generate tasks from the creative plan and specification.

### 2c. Check for Existing Chapters

Check `./stories/[novel-name]/content/` for already-written chapters.
- Cross-reference with the task list to identify which chapters are already done.
- Show the user a summary: "Chapters 1–[N] are already written. [M] tasks are `[DONE]`, [K] are `[FOR_REVIEW]`, [L] are pending."
- Default to generating tasks only for unwritten chapters unless the user requests otherwise.

### 3. Generate Task List

Break down the plan into chapter-writing tasks only.

Character/worldbuilding updates stay in knowledge/tracking workflows. Editing/review activity goes in the Review & Editing Log.

Keep task output aligned with the creative plan:
- Preserve the same saga and arc order from `creative-plan.md`.
- Put chapter tasks under their matching arc.
- Use one brief task line per chapter.
- Do not duplicate the planner's Summary, Flow, Pacing & Tension, Foreshadowing, Character Arc Mapping, or Continuity Notes in `tasks.md`.

### 4. Assign Markers

Assign markers to each task to manage workflow:
- `[P]` for tasks that can be done in parallel.
- `[Dep:X]` for tasks that depend on task X.
- `[High Priority]` for critical tasks.

Do not include total word counts, per-chapter word estimates, or effort estimates. Chapter length may vary.

### 5. Output Format

The file should start with a header summary:
```markdown
# Task List — [Novel Name]

**Total chapters planned:** [N]
**Chapters written:** [M]
**Last updated:** [Date]

---
```

For saga/arc mode, group tasks under the same nested outline as the planner:
```markdown
## Saga 1: [Saga Name] — Chapters [X-Y or TBD]

### Arc 1: [Arc Name] — Chapters [X-Y]

- [ ] **Chapter 1: [Title]** `[High Priority]` — [Brief chapter explanation]

### Arc 2: [Arc Name] — Chapters [X-Y or TBD]

- [ ] **Chapter 13: [Title]** `[Dep:12]` — [Brief chapter explanation]
```

If there is no saga, start directly with `## Arc [N]: [Arc Name] — Chapters [X-Y]`.

For batch/incremental mode, add a clear section:
```markdown
---

## Batch: Chapters [X–Y] (added [Date])

**Adds To:** [Saga N; Arc N] or [Arc N] or [Standalone]

- [ ] **Chapter X: [Title]** `[Dep:X-1]` — [Brief chapter explanation]
```

Each task entry must be formatted as:
```markdown
- [ ] **Chapter X: [Title]** — [Brief chapter explanation]
```

Use task markers only when they help manage work. If needed, place them after the chapter title, e.g. `[Dep:X]` or `[High Priority]`. Keep the chapter task to one line.

**Status markers:**
- `[ ]` — not started
- `[FOR_REVIEW]` — writer finished, awaiting review
- `[DONE]` — reviewed and approved

Example:
```markdown
- [ ] **Chapter 1: Market Omen** `[High Priority]` — Introduce the protagonist in the market and stage the first encounter with the antagonist's proxy.
- [ ] **Chapter 2: Rare Ability** `[Dep:1]` — Reveal the protagonist's rare ability and force the flight from the city.
- [ ] **Chapter 3: Alley Chase** `[Dep:2]` — Continue the chase through the alleys and corner the pursuer.
- [ ] **Chapter 4: Village Breather** `[Dep:3]` — Let the protagonist recover, reflect, and process what was lost.
```

Add this log section at the bottom of `tasks.md`:
```markdown
---

## Review & Editing Log

No editor/reviewer entries yet.
```

The log starts empty. `/editor` and `/reviewer` append dated entries when they edit or review chapters.

### 6. Output and Save

Save the task list to `./stories/[novel-name]/tasks.md`.

If appending to an existing task list, **preserve all existing entries** and their statuses. Only add new tasks below the existing ones under a new section header. Preserve `## Review & Editing Log`; create it if missing.

Suggest the user run the `/writer` command next to begin execution.

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `pacing-rhythm` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Reference pacing concepts when ordering chapter work; do not add pacing tags to tasks. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
