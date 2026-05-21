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

### 2b. Check for Drafts

Look for draft files in `./draft/chapters/` (relative to project root). Accept any naming convention: `chapter_00001.md`, `0001.md`, `1.md`, `chapter-1.md`, `ch1.md`, etc.

**If drafts are found**:
- Read all draft files to understand the user's intended chapter structure, scene beats, and story flow.
- Compare the draft against `./stories/[novel-name]/creative-plan.md`, `./stories/[novel-name]/specification.md`, and `./stories/[novel-name]/knowledge/`.
- **Conflict detection**: If the draft contradicts any established document (character traits, world rules, plot points, pacing plan), flag the conflict and ask the user:
  - "The draft says [X] but the plan/spec says [Y]. Is this an intentional change, or should I align with the existing documents?"
  - Only proceed once the user clarifies. Never silently override or ignore conflicts.
- Ask the user:
  - **Follow draft** — use the draft chapter count and structure as the basis for the task list.
  - **Fill gaps** — use the draft as a starting point, but add missing chapters where the creative plan indicates gaps.
  - **Ignore drafts** — generate tasks purely from the creative plan.

**If no drafts are found**: generate tasks from the creative plan and specification.

### 2c. Check for Existing Chapters

Check `./stories/[novel-name]/content/` for already-written chapters.
- Cross-reference with the task list to identify which chapters are already done.
- Show the user a summary: "Chapters 1–[N] are already written. [M] tasks are `[DONE]`, [K] are `[FOR_REVIEW]`, [L] are pending."
- Default to generating tasks only for unwritten chapters unless the user requests otherwise.

### 3. Generate Task List

Break down the plan into specific tasks. Types of tasks include:
- Chapter writing
- Character profile refinement
- Worldbuilding documentation
- Review/editing

### 4. Assign Markers

Assign markers to each task to manage workflow:
- `[P]` for tasks that can be done in parallel.
- `[Dep:X]` for tasks that depend on task X.
- `[High Priority]` for critical tasks.
- Include the pacing tag from the plan (e.g., `[Action]`, `[Reflection]`).

**Multi-chapter pacing arcs**: When a scene or arc spans multiple chapters, use a numbered pacing tag:
- `[Action 1]`, `[Action 2]`, `[Action 3]` — a 3-part action sequence
- `[Reflection 1]`, `[Reflection 2]` — a 2-part reflective arc
- `[Climax 1]`, `[Climax 2]` — a 2-part climax

The number tells the writer to read the previous chapter in the sequence for continuity. Use this when a single scene is too long for one chapter and needs to be split.

For character-heavy scenes, include a note on which characters' psychological depth should be showcased.

Provide an estimated word count or effort level for each task.

### 5. Output Format

The file should start with a header summary:
```markdown
# Task List — [Novel Name]

**Total chapters planned:** [N]
**Chapters written:** [M]
**Estimated total words:** [N]
**Last updated:** [Date]

---
```

For saga/arc mode, group tasks under arc headers:
```markdown
## Arc 1: The Awakening (Chapters 1–12)

- [ ] **Chapter 1** — ...
- [ ] **Chapter 2** — ...

## Arc 2: The Journey (Chapters 13–24)

- [ ] **Chapter 13** — ...
```

For batch/incremental mode, add a clear section:
```markdown
---

## Batch: Chapters [X–Y] (added [Date])

- [ ] **Chapter X** — ...
```

Each task entry must be formatted as:
```markdown
- [ ] **Chapter X** — [Brief description of what happens] `[PacingTag]` `[P]`|`[Dep:X]`|`[High Priority]` — ~[est. word count] words
```

**Status markers:**
- `[ ]` — not started
- `[FOR_REVIEW]` — writer finished, awaiting review
- `[DONE]` — reviewed and approved

Example:
```markdown
- [ ] **Chapter 1** — Introduction of the protagonist in the market; first encounter with the antagonist's proxy. `[Setup]` `[High Priority]` — ~2,500 words
- [ ] **Chapter 2** — Protagonist discovers they have a rare ability; forced to flee the city. `[Action 1]` `[Dep:1]` — ~3,000 words
- [ ] **Chapter 3** — The chase through the alleys; protagonist corners the pursuer. `[Action 2]` `[Dep:2]` — ~3,000 words
- [ ] **Chapter 4** — Breather: protagonist reaches a village and reflects on what they left behind. `[Reflection]` `[Dep:3]` — ~2,000 words
```

### 6. Output and Save

Save the task list to `./stories/[novel-name]/tasks.md`.

If appending to an existing task list, **preserve all existing entries** and their statuses. Only add new tasks below the existing ones under a new section header.

Suggest the user run the `/writer` command next to begin execution.

## Supplement Skills

These skills enhance this command's output quality. Check if they are available before proceeding:

| Skill | File | Purpose |
|-------|------|---------|
| `pacing-rhythm` | `[user_agent]/skills/writing-techniques/pacing-rhythm/SKILL.md` | Tag each task with its pacing type. |

If any skill file is not found, inform the user:
> "Supplement skills are available to enhance this command. Download them from:
> https://github.com/JeroTan/novel-writer-english.git
> I'll continue without them, but output quality will be reduced."
