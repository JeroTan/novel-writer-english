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

Check if `./stories/[novel-name]/tasks.md` or `./stories/[novel-name]/tasks/` already exists.
- If `tasks/` exists, read `./stories/[novel-name]/tasks/_main.md` first, then only the shard(s) relevant to the requested saga, arc, batch, or chapter range.
- If only `tasks.md` exists, read it and check whether it is becoming a god file.
- If tasks exist, ask the user:
  - **Update** — modify existing task entries while keeping completed ones intact.
  - **Replace** — discard the current task list and regenerate from the creative plan.
  - **Increment** — append new tasks for upcoming chapters/arcs without changing existing ones.
  - **Add batch** — generate tasks only for a specific range (e.g., "chapters 6–10").
  - **Split existing tasks** — convert a large single file into `tasks/` shards before continuing.
- If it does not exist, proceed to create a new task list.

### 2. Read Context

Read `./stories/[novel-name]/creative-plan.md` and `./stories/[novel-name]/specification.md`. If `creative-plan/` or `specification/` exists, read `_main.md` first and then only the shard(s) relevant to the requested saga, arc, batch, or chapter range.

When reading `creative-plan.md`, follow the current planner hierarchy:
- `Saga -> Arc -> Chapters`, or `Arc -> Chapters` when there is no saga.
- Each arc may include Structural Approach, Pacing & Tension, Foreshadowing Plan, Character Arc Mapping, Chapters, and continuity notes.
- Each chapter may include Summary, Flow, and Continuity Notes.
- If any section or field is marked `[N/A]`, treat it as intentionally not applicable.

### 2b. Check for Drafts

Look for draft files in `./draft/chapters/` (relative to project root). Accept any naming convention: `chapter_00001.md`, `0001.md`, `1.md`, `chapter-1.md`, `ch1.md`, etc.

**If drafts are found**:
- Read all draft files to understand the user's intended chapter structure, scene beats, and story flow.
- Compare the draft against `./stories/[novel-name]/creative-plan.md` or split plan shard(s), `./stories/[novel-name]/specification.md` or split specification shard(s), and `./stories/[novel-name]/knowledge/`.
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

Search `./stories/[novel-name]/content/` recursively for already-written chapters; preserve saga, arc, and custom grouping paths.
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

### 5b. Anti-God-File Split Mode

Before saving or updating, check projected file size.

If `tasks.md` would exceed about 500 lines, or if the task list is too large to update safely:
- Create `./stories/[novel-name]/tasks/`.
- Keep `./stories/[novel-name]/tasks.md` as a short index/dashboard, not the full task ledger.
- Create `./stories/[novel-name]/tasks/_main.md` as the task table of contents and current progress summary.
- Store saga, arc, batch, or chapter-range tasks in focused shard files.
- Store long review/editing history in `./stories/[novel-name]/tasks/review-editing-log.md` when needed.

Recommended shard names:
- `saga_0001.md`
- `saga_0001_arc_0001.md`
- `arc_0001.md`
- `ch_00001-00005.md`
- `batch_0001_ch_00006-00010.md`
- `review-editing-log.md`

`tasks.md` should look like:

```markdown
# Task Dashboard — [Novel Name]

**Updated:** [YYYY-MM-DD]

This task list is split to avoid a god file.

Read first: `./tasks/_main.md`

## Current Progress
- Total chapters planned: [N]
- Chapters written: [M]
- Last updated: [Date]

## Shards
- `./tasks/_main.md` — progress summary and shard map
- `./tasks/saga_0001_arc_0001.md` — [chapter range]
- `./tasks/review-editing-log.md` — editor/reviewer history
```

Split-mode rules:
- Keep every active file or shard below about 500 lines.
- `tasks.md` should act only as a map/dashboard once split mode exists.
- `_main.md` should act as progress summary and shard map, not a second full task ledger.
- Keep shard files focused; prefer one saga, one arc, one batch, or one chapter range per shard.
- When updating task status, edit only `_main.md` plus the shard containing that chapter.
- `/writer`, `/editor`, and `/reviewer` must update the relevant task shard, not only `tasks.md`.
- If a shard exceeds about 500 lines, split it again and update `_main.md`.

### 6. Output and Save

Save the task list to `./stories/[novel-name]/tasks.md` for compact lists. In split mode, save the index to `tasks.md`, the progress map to `./stories/[novel-name]/tasks/_main.md`, and detailed task entries to the relevant shard file(s).

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
